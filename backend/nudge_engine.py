import random
from bson import ObjectId

class DynamicNudgeEngine:
    def __init__(self, db):
        self.db = db
        self.knowledge_base = {
            "Password Security": {
                "actions": ["using a password manager", "enabling 2FA", "setting unique passwords"],
                "risks": ["credential stuffing", "brute-force attacks"]
            },
            "Device Security": {
                "actions": ["locking your screen", "setting a complex PIN"],
                "risks": ["physical data access", "data misuse"]
            },
            "Phishing": {
                "actions": ["verifying sender email", "not clicking unknown links"],
                "risks": ["identity theft", "fraudulent links"]
            }
            # ... baqi categories bhi isi format mein rakhein
        }

    async def get_user_nudges(self, user_id):
        try:
            # 1. 🟢 Await hata diya kyunki db sync hai. Collection 'surveys' use ki.
            survey = self.db["surveys"].find_one(
                {"userId": str(user_id)}, 
                sort=[("timestamp", -1)] 
            )

            # 2. 🟢 Default return ko bhi dictionary format mein rakha
            if not survey or not survey.get("weak_categories"):
                return [{
                    "category": "General", 
                    "nudge": "Keep practicing good cyber hygiene! You're doing great."
                }]

            weak_cats = survey["weak_categories"]
            user_level = survey.get("level", 1)
            generated_nudges = []

            for cat in weak_cats:
                if cat in self.knowledge_base:
                    action = random.choice(self.knowledge_base[cat]["actions"])
                    risk = random.choice(self.knowledge_base[cat]["risks"])
                    
                    if user_level == 1:
                        msg = f"Tip for {cat}: Try {action} to stay safe from {risk}."
                    elif user_level == 2:
                        msg = f"Improve your {cat}: By {action}, you can effectively block {risk}."
                    else:
                        msg = f"Security Optimization: {action} is critical to mitigate {risk} in {cat}."
                    
                    generated_nudges.append({
                        "category": cat,
                        "nudge": msg
                    })

            # Agar koi match na mile tab bhi safe return
            if not generated_nudges:
                 return [{"category": "General", "nudge": "Stay safe and keep your software updated!"}]

            return generated_nudges

        except Exception as e:
            print(f"❌ Nudge Engine Error: {str(e)}")
            return [{"category": "General", "nudge": "Stay safe and keep your software updated!"}]