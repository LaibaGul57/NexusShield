import random
import numpy as np
from datetime import datetime, timedelta
from bson import ObjectId

class ThompsonNudgeEngine:
    def __init__(self, db):
        self.db = db
        # Decay Factor: Purane stats ko kitna "fade" karna hai (0.95 means 5% decay per action)
        self.decay_factor = 0.95
        
        self.arms = {
            "length": ["short", "medium", "long"],
            "tone": ["friendly", "warning", "motivational"],
            "complexity": ["simple", "moderate", "technical"],
            "type": ["tip", "education", "alert"],
            "personalization": ["general", "personalized"]
        }

    # ---------------------------------------------------------
    # LOGIC: TRACK ACTIVE TIME (Mark as Read par call hoga)
    # ---------------------------------------------------------
    async def track_active_time(self, user_id):
        current_hour = datetime.utcnow().hour
        await self.db.thompson_stats.update_one(
            {"userId": str(user_id)},
            {"$set": {
                "preferred_hour": current_hour, 
                "last_active_time": datetime.utcnow()
            }}
        )

    async def is_user_in_active_window(self, user_id):
        
        stats = self.db.thompson_stats.find_one({"userId": str(user_id)})
        if not stats or "preferred_hour" not in stats:
            return True 
        
        current_hour = datetime.utcnow().hour
        pref_hour = stats["preferred_hour"]
        
        if abs(current_hour - pref_hour) <= 1:
            return True
        return False

    # ---------------------------------------------------------
    # LOGIC: INITIALIZE THOMPSON STATS
    # ---------------------------------------------------------
    async def get_user_stats(self, user_id):
        stats = self.db.thompson_stats.find_one({"userId": str(user_id)})
        if not stats:
            stats = {"userId": str(user_id), "dimensions": {}}
            for dim, options in self.arms.items():
                stats["dimensions"][dim] = {opt: {"alpha": 1, "beta": 1} for opt in options}
            self.db.thompson_stats.insert_one(stats)
        return stats

    # ---------------------------------------------------------
    # LOGIC: SELECT BEST COMBO (Thompson Sampling)
    # ---------------------------------------------------------
    def select_best_combo(self, stats):
        selected_combo = {}
        for dim, options in stats["dimensions"].items():
            best_sample = -1
            best_arm = None
            for arm_name, values in options.items():
                sample = np.random.beta(values["alpha"], values["beta"])
                if sample > best_sample:
                    best_sample = sample
                    best_arm = arm_name
            selected_combo[dim] = best_arm
        return selected_combo

    # ---------------------------------------------------------
    # LOGIC: ADAPT BEHAVIOR (WITH DECAY FACTOR)
    # ---------------------------------------------------------
    async def update_user_behavior(self, user_id, combo, action):
        """
        THIS WAS THAT LOGIC: Fixed Day/Week ki bajaye Exponential Decay use karna.
        Har action par purane alpha/beta ko 0.95 se multiply karke "fade" karna.
        """
        # Current stats mangwao update ke liye
        stats = await self.get_user_stats(user_id)
        dimensions = stats["dimensions"]
        
        success = 1 if action == "mark_as_read" else 0

        # Sab dimensions ke liye decay apply karo
        for dim in dimensions:
            for arm_name in dimensions[dim]:
                # Purane stats ko fade karna (Logic: Decay Factor)
                dimensions[dim][arm_name]["alpha"] *= self.decay_factor
                dimensions[dim][arm_name]["beta"] *= self.decay_factor
            
            # Jo combo select hua tha, usme naya success/failure add karo
            selected_arm = combo[dim]
            if success:
                dimensions[dim][selected_arm]["alpha"] += 1
            else:
                dimensions[dim][selected_arm]["beta"] += 1

        # Database update
        await self.db.thompson_stats.update_one(
            {"userId": str(user_id)},
            {"$set": {
                "dimensions": dimensions,
                "last_action_time": datetime.utcnow()
            }}
        )
        
        if success:
            await self.track_active_time(user_id)

    # ---------------------------------------------------------
    # LOGIC: LEVEL-BASED FREQUENCY
    # ---------------------------------------------------------
    async def get_dynamic_frequency(self, user_id, level):
        config = {1: {"max": 4, "min": 2}, 2: {"max": 6, "min": 4}, 3: {"max": 8, "min": 6}}
        user_config = config.get(level, config[1])

        recent_dismissals = self.db.nudge_history.count_documents({
            "userId": str(user_id),
            "action": "dismiss",
            "timestamp": {"$gt": datetime.utcnow() - timedelta(days=1)}
        })

        return max(user_config["min"], user_config["max"] - recent_dismissals)

    # ---------------------------------------------------------
    # LOGIC: GENERATE FINAL NUDGE
    # ---------------------------------------------------------
    async def can_send_nudge(self, user_id):
       last_nudge = self.db.nudge_history.find_one(
    {"userId": str(user_id)}, sort=[("timestamp", -1)])
       if last_nudge:
            if datetime.utcnow() < last_nudge["timestamp"] + timedelta(hours=2):
                return False
       return True

    async def generate_final_nudge(self, user_id, nudge_engine):
        #user_survey = await self.db.survey_collection.find_one({"userId": str(user_id)})
        user_survey = self.db["surveys"].find_one({"userId": str(user_id)})
        level = user_survey.get("level", 1) if user_survey else 1

        if not await self.can_send_nudge(user_id) or not await self.is_user_in_active_window(user_id):
            return None

        stats = await self.get_user_stats(user_id)
        combo = self.select_best_combo(stats)
        all_nudges = await nudge_engine.get_user_nudges(user_id)
        
        return {
            "userId": user_id,
            "combo_metadata": combo,
            "nudge_content": all_nudges,
            "frequency": await self.get_dynamic_frequency(user_id, level),
            "timestamp": datetime.utcnow()
        }