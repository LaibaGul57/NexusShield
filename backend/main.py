# from fastapi import FastAPI, Request, HTTPException, Query
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from pymongo import MongoClient
# from datetime import datetime
# from pydantic import BaseModel
# import uvicorn
# import firebase_admin
# from firebase_admin import credentials, messaging
# from bson import ObjectId
# import numpy as np  
# from collections import defaultdict
# from ai_model import predict_url
# from flashcard import get_topic_data, save_user_quiz_score, HARDCODED_TOPICS
# from routes.all_routes import router as all_routes_router
# from nudge_logic import get_initial_nudge_stats, select_best_category, is_it_time_to_send
# import requests
# from apscheduler.schedulers.background import BackgroundScheduler
# import asyncio
# from bson import ObjectId

# cred = credentials.Certificate("firebase-key.json")
# if not firebase_admin._apps:
#     firebase_admin.initialize_app(cred)

# # --- Phir aapka Function ---
# def send_fcm_nudge(token, title, body, category, user_id):
#     # Sirf Data bhejni hai taake Notifee trigger ho
#     message = messaging.Message(
#         data={
#             "title": title,          # Frontend yahan se title uthayega
#             "body": body,            # Frontend yahan se body uthayega
#             "userId": str(user_id),
#             "category": category,
#             "action_type": "nudge_response"
#         },
#         token=token,
#     )
    
#     try:
#         response = messaging.send(message)
#         print(f"🚀 FCM Nudge Sent ({category}):", response)
#         return True
#     except Exception as e:
#         print(f"❌ FCM Error details: {e}")
#         return False
# app = FastAPI()
# # ✅ Routers
# app.include_router(all_routes_router, prefix="/api")
# class UpdateProfileModel(BaseModel):
#     name: str
#     email: str
# # ✅ MongoDB Connection
# try:
#     client = MongoClient(
#         "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority&appName=Cluster0"
#     )
#     db = client["nexusshield"]
#     users_collection = db["users"]
#     quiz_scores_collection = db["quizscores"]
#     progress_collection = db["progress"]
    
#     db_cyber = client["cyber_training"]
#     topics_collection = db_cyber["topics"]
#     messages_collection = db["messages"]
    
#     survey_collection = db["surveys"]
#     print("✅ MongoDB connected successfully!")
# except Exception as e:
#     print("❌ MongoDB connection failed:", e)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # -----------------------------------------------------------
# # ✅ db of model
# # -----------------------------------------------------------
# @app.get("/test-db")
# def test_connection():
#     try:
#         # Ye line check karti hai ke Atlas ne respond kiya ya nahi
#         client.admin.command('ping')
#         return {"status": "success", "message": "connected sucessfulyy."}
#     except Exception as e:
#         return {"status": "error", "message": f"Connection Fail: {str(e)}"}
# # -----------------------------------------------------------
# # ✅ URL PREDICTION (LINK CHECKER)
# # -----------------------------------------------------------

# class URLRequest(BaseModel):
#     url: str  # ✅ "text" ki jagah "url" use karo
# class Stat(BaseModel):
#     name: str  # Example: "Mon", "Tue"
#     value: int
# @app.post("/predict")
# def predict_url_endpoint(data: URLRequest):
#     try:
#         # 1. Sab se pehle link check karo (AI Model
#         result = predict_url(data.url)

#         # 2. Statistics Update (Alag se try block mein taake error na aaye)
#         try:
#             today_name = datetime.now().strftime("%a") 
#             db["stats"].update_one(
#                 {"name": today_name},
#                 {
#                     "$inc": {"value": 1},
#                     "$setOnInsert": {"__v": 0}
#                 },
#                 upsert=True
#             )
#             print(f"📊 Stats updated for {today_name}")
#         except Exception as stats_err:
#             print(f"⚠️ Stats Update Error (Silent): {stats_err}")

#         # 3. YAHAN HAI ASAL CHEEZ: Result return karna
#         # Ye line 'try' ke andar lekin 'stats' ke bahar honi chahiye
#         return result

#     except Exception as e:
#         print(f"❌ Main Error: {e}")
#         return {
#             "label": "❌ ERROR",
#             "probability": 0.5,
#             "error": str(e)
#         }
# # -----------------------------------------------------------
# # ✅ TRAINING & PROGRESS ROUTES
# # -----------------------------------------------------------

# @app.get("/topics/{level}")
# async def get_level_topics(level: int):
#     topics = HARDCODED_TOPICS.get(level, [])
#     if not topics:
#         return JSONResponse({"topics": [], "message": "Level not found"}, status_code=404)
#     return {"topics": topics}

# @app.get("/get-content")
# async def get_content(topic: str, level: int):
#     clean_topic = topic.strip()
#     try:
#         content = get_topic_data(clean_topic, level)
#         if content:
#             return content
#         return JSONResponse(status_code=404, content={"error": "Not found"})
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

# @app.get("/api/progress/{user_id}")
# async def get_user_progress(user_id: str):
#     try:
#         progress_data = db["progress"].find_one({"user_id": user_id}, {"_id": 0})
#         if progress_data:
#             return progress_data
#         return {"lessonsCompleted": 0, "quizzesAttempted": 0, "quizScore": 0, "nudgesReceived": 0}
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

# @app.post("/api/save-quiz-result")
# async def save_quiz_result(request: Request):
#     try:
#         data = await request.json()
#         user_id, score_val, total_val = data.get("user_id"), data.get("score"), data.get("total")
#         db["quizscores"].insert_one({"range": f"{score_val}/{total_val}", "score": score_val, "__v": 0}) 
#         db["progress"].update_one(
#             {"user_id": user_id},
#             {"$inc": {"lessonsCompleted": 1, "quizzesAttempted": 1}, "$set": {"quizScore": score_val}},
#             upsert=True 
#         )
#         return {"status": "success"}
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

# # -----------------------------------------------------------
# # ✅ AUTHENTICATION
# # -----------------------------------------------------------

# # @app.post("/signup")
# # async def signup(request: Request):
# #     data = await request.json()
# #     email = data.get("email")
# #     if users_collection.find_one({"email": email}):
# #         return JSONResponse({"message": "User already exists"}, status_code=400)
# #     users_collection.insert_one({
# #         "name": data.get("name"), "email": email, "password": data.get("password"),
# #         "fcm_token": data.get("fcm_token"),
# #         "role": data.get("role"), "createdAt": datetime.utcnow(),
# #         "surveyDone": False,
# #     })
# #     return JSONResponse({"message": "User registered successfully"}, status_code=200)
# @app.post("/signup")
# async def signup(request: Request):
#     data = await request.json()
#     email = data.get("email")
    
#     if users_collection.find_one({"email": email}):
#         return JSONResponse({"message": "User already exists"}, status_code=400)
    
#     # ✅ 1. Insert karne ke baad result ko variable mein rakhein
#     result = users_collection.insert_one({
#         "name": data.get("name"), 
#         "email": email, 
#         "password": data.get("password"),
#         "fcm_token": data.get("fcm_token"),
#         "role": data.get("role"), 
#         "createdAt": datetime.utcnow(),
#         "surveyDone": False,
#     })

#     # ✅ 2. Response mein 'user_id' lazmi bhejein (string mein convert kar ke)
#     return {
#         "message": "User registered successfully",
#         "user_id": str(result.inserted_id) # 👈 Ye line miss thi!
#     }

# @app.post("/login")
# async def login(request: Request):
#     try:
#         data = await request.json()
#         email = data.get("email")
#         password = data.get("password")
#         fcm_token = data.get("fcm_token")
        
#         user = users_collection.find_one({"email": email, "password": password})
        
#         if not user:
#             return JSONResponse({"message": "Invalid credentials"}, status_code=401)
        
#         if fcm_token:
#             users_collection.update_one(
#                 {"_id": user["_id"]},
#                 {"$set": {"fcm_token": fcm_token}}
#             )
#             print(f"✅ FCM Token updated for {email}")

#         # --- CRITICAL FIX FOR NUDGE ENGINE ERROR ---
#         # Agar aapka Nudge Engine background mein level check karta hai,
#         # toh check karein ke level string hai ya nahi.
#         user_level = user.get("level", "Beginner")
        
    
#         level_map = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}
#         # Agar database mein "Intermediate" hai toh ye 2 return karega
#         numeric_level = level_map.get(user_level, 1) 

#         print(f"User Level: {user_level} (Numeric: {numeric_level})")

#         return {
#             "message": "Login successful", 
#             "user": {
#                 "name": user.get("name"), 
#                 "email": user.get("email"),
#                 "user_id": str(user.get("_id")),
#                 "surveyDone": user.get("surveyDone", False),
#                 "level": user_level, # Frontend ko string bhej rahe hain
#                 "level_num": numeric_level # Backup ke liye number bhi bhej rahe hain
#             }
#         }
#     except Exception as e:
#         print(f"❌ Login Crash Error: {str(e)}")
#         return JSONResponse({"message": "Server error during login", "error": str(e)}, status_code=500)
# # -----------------------------------------------------------
# # ✅ profile screeen
# # -----------------------------------------------------------
# @app.get("/api/user/{user_id}")
# async def get_user_profile(user_id: str):
#     user = users_collection.find_one({"_id": ObjectId(user_id)})
#     if user:
#         return {
#             "name": user.get("name"),
#             "email": user.get("email")
#         }
#     raise HTTPException(status_code=404, detail="User not found")

# # 2. User ka data update karne ke liye (Save button par)
# @app.put("/api/update-profile/{user_id}")
# async def update_profile(user_id: str, profile_data: UpdateProfileModel):
#     result = users_collection.update_one(
#         {"_id": ObjectId(user_id)},
#         {"$set": {
#             "name": profile_data.name, 
#             "email": profile_data.email
#         }}
#     )
    
#     if result.matched_count > 0:
#         return {
#             "status": "success", 
#             "message": f"Profile updated! New name: {profile_data.name}"
#         }
#     return {"status": "error", "message": "Update failed"}
# @app.post("/api/report-content")
# async def report_content(data: dict):
#     try:
#         messages_collection.insert_one(data)
#         return {"status": "success", "message": "Report saved!"}
#     except Exception as e:
#         return {"status": "error", "message": str(e)}
# # -----------------------------------------------------------
# # ✅ SAVE SURVEY RESULTS & CALCULATE LEVEL
# # -----------------------------------------------------------
# CATEGORY_MAP = {
#     "T1": "Password Security", "T2": "Device Security", "T3": "Physical Security",
#     "T4": "Network Security", "T5": "Password Security", "T6": "Password Security",
#     "T7": "Software Updates", "T8": "Malware Protection", "S1": "App Security",
#     "S2": "Phishing", "S3": "Web Security", "S4": "Phishing",
#     "S5": "Phishing", "S6": "Device Security"
# }

# @app.post("/survey")
# async def save_survey(request: Request):
#     try:
#         data = await request.json()
#         user_id = data.get("userId")
#         answers = data.get("answers", []) 

#         # --- 1. Fair Statistical Logic ---
#         total_score = sum(a["score"] for a in answers)
#         grouped_data = defaultdict(list)
        
#         # Row format: ["T1 : Password Security : 5", "S2 : Phishing : 4"]
#         descriptive_results = []

#         for a in answers:
#             q_id = a["questionId"]
#             score = a["score"]
#             cat_name = CATEGORY_MAP.get(q_id, "General")
            
#             descriptive_results.append(f"{q_id} : {cat_name} : {score}")
#             grouped_data[cat_name].append(score)

#         # Category Averages (Simple Mean - No Penalty)
#         category_scores = {
#             cat: round(np.mean(scores), 2) 
#             for cat, scores in grouped_data.items()
#         }

#         # --- 2. Relative Threshold (Insaaf Logic) ---
#         # values = list(category_scores.values())
#         # weak_cats = []
#         # if values:
#         #     # User ka apna overall average behavior
#         #     user_mean = np.mean(values)
#         #     user_std = np.std(values)
            
#         #     # Threshold: User ke apne average se 0.5 niche wale points "Weak" honge
#         #     # Iska matlab user ka muqabla uski apni performance se hai
#         #     threshold = user_mean - 0.5 * user_std
            
#         #     for cat, avg in category_scores.items():
#         #         # Agar score threshold se niche ho YA bohot hi kam ho (e.g. < 2.5)
#         #         if avg < threshold or avg < 2.5:
#         #             weak_cats.append(cat)
#     # --- 2. Fixed Threshold Logic (3.0 Comparison) ---
#         weak_cats = []
        
#         # Ab har category ke average ko seedha 3.0 se check karein
#         for cat, avg in category_scores.items():
#             if avg < 3.0:
#                 weak_cats.append(cat)
#         # --- 3. Level Calculation ---
#         # --- 2. Level Calculation (Numeric Save) ---
#         percentage = round((total_score / 70) * 100, 2)
        
#         # Strings ke bajaye Numbers use kar rahe hain
#         if percentage >= 75:
#             user_level = 3  # Advanced
#         elif percentage >= 45:
#             user_level = 2  # Intermediate
#         else:
#             user_level = 1  # Beginner

#         # --- 3. Database Structure Update ---
#         formatted_survey = {
#             "userId": str(user_id),
#             "descriptive_results": descriptive_results,
#             "category_scores": category_scores,
#             "weak_categories": weak_cats,
#             "total_score": total_score,
#             "percentage": percentage,
#             "level": user_level,  # Ab ye 1, 2, ya 3 save hoga
#             "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
#         } 

#         survey_collection.insert_one(formatted_survey)
        
#         # User profile update
#         users_collection.update_one(
#             {"_id": ObjectId(user_id) if len(user_id) == 24 else user_id},
#             {"$set": {
#                 "surveyDone": True, 
#                 "level": user_level,
#                 "cyber_hygiene_score": percentage
#             }}
#         )

#         return {
#             "status": "success",
#             "level": user_level,
#             "percentage": percentage,
#             "weak_points": weak_cats,
#             "results": descriptive_results
#         }

#     except Exception as e:
#         print(f"DEBUG ERROR: {str(e)}")
#         return JSONResponse(status_code=500, content={"error": str(e)})
# # -----------------------------------------------------------
# # ✅ REAL-TIME AI NUDGE ENGINE (Thompson Sampling)
# # -----------------------------------------------------------
# @app.get("/api/get-nudge/{user_id}")
# async def get_nudge(user_id: str):
#     try:
#         # 1. User fetch karein
#         user = users_collection.find_one({"_id": ObjectId(user_id)})
#         if not user:
#             return {"status": "error", "message": "User not found"}

#         # 2. Stats initialization (if missing)
#         current_stats = user.get("nudge_stats")
#         if current_stats is None:
#             current_stats = get_initial_nudge_stats()
#             users_collection.update_one(
#                 {"_id": ObjectId(user_id)},
#                 {"$set": {"nudge_stats": current_stats}}
#             )

#         # 3. AI Category Selection (Adaptive Behavior)
#         best_cat = select_best_category(current_stats)
#         user_level = int(user.get("level", 1)) # Force Integer for matching
#         sent_ids = user.get("sent_nudges", []) # History track karne ke liye

#         # 4. RANDOM & UNIQUE NUDGE SELECTION (The Fix)
#         pipeline = [
#             {"$match": {
#                 "category": str(best_cat),
#                 "level": user_level,
#                 "_id": {"$nin": [ObjectId(i) for i in sent_ids if i]} # Repeat avoid logic
#             }},
#             {"$sample": {"size": 1}} # Pick a random message
#         ]
        
#         random_nudge_list = list(db["nudges"].aggregate(pipeline))

#         # FALLBACK: Agar saare unique messages bheje ja chuke hain
#         if not random_nudge_list:
#             print(f"🔄 Resetting history for {user_id} in {best_cat}")
#             users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"sent_nudges": []}})
#             # Dobara try karein bina history constraint ke
#             random_nudge_list = list(db["nudges"].aggregate([
#                 {"$match": {"category": str(best_cat), "level": user_level}},
#                 {"$sample": {"size": 1}}
#             ]))

#         if not random_nudge_list:
#             return {"status": "error", "message": f"No content for {best_cat} Level {user_level}"}

#         random_nudge = random_nudge_list[0]
#         n_id = str(random_nudge["_id"])

#         # 5. Notification send
#         notification_sent = send_fcm_nudge(
#             token=user.get("fcm_token"),
#             title=f"🛡️ Nexus Shield: {best_cat}", 
#             body=random_nudge["message"],
#             category=best_cat,    
#             user_id=user_id       
#         )

#         # 6. Database Updates (Timestamp + History + Count)
#         if notification_sent:
#             users_collection.update_one(
#                 {"_id": ObjectId(user_id)},
#                 {
#                     "$set": {
#                         "last_nudge_sent_at": datetime.utcnow()
#                     },
#                     "$push": {
#                         "sent_nudges": n_id # ID save karegi taake repetition na ho
#                     }
#                 }
#             )
#             print(f"✅ History updated: Nudge saved for user {user_id}")
    
#         return {
#             "status": "success",
#             "category": best_cat,
#             "level": user_level,
#             "message": random_nudge["message"],
#             "notification_sent": notification_sent,
#             "is_random": True
#         }

#     except Exception as e:
#         print(f"❌ Nudge Engine Error: {e}")
#         return {"status": "error", "message": str(e)}

# #----------------------------------------------
# #-------get interaction-------

# @app.post("/api/nudge-interaction")
# async def nudge_interaction(request: Request):
#     try:
#         data = await request.json()
#         user_id = data.get("userId")
#         category = data.get("category")
#         action = data.get("action") 

#         if not user_id or not category:
#             return {"status": "error", "message": "Missing userId or category"}

#         # 1. Purana data fetch karein
#         user = users_collection.find_one({"_id": ObjectId(user_id)})
#         if not user:
#             return {"status": "error", "message": "User not found"}

#         # 2. Stats calculation
#         t_success = user.get("total_success", 0) + (1 if action == "read" else 0)
#         t_failure = user.get("total_failure", 0) + (1 if action == "dismiss" else 0)
#         total_attempts = t_success + t_failure
#         new_success_rate = t_success / total_attempts if total_attempts > 0 else 0.0

#         # 3. LEVEL UP LOGIC (Using Numeric Level 1, 2, 3)
#         current_level = user.get("level", 1)  # Default level 1
#         new_level = current_level

#         # Beginner to Intermediate
#         if new_success_rate >= 0.70 and current_level == 1:
#             new_level = 2
#             print(f"🎊 Level Up! {user_id} is now Level 2 (Intermediate)")
        
#         # Intermediate to Advanced
#         elif new_success_rate >= 0.85 and current_level == 2:
#             new_level = 3
#             print(f"🎊 Level Up! {user_id} is now Level 3 (Advanced)")

#         # 4. MongoDB Update (Ensuring everything is synced)
#         field = f"nudge_stats.{category}.alpha" if action == "read" else f"nudge_stats.{category}.beta"
        
#         update_query = {
#             "$inc": {
#                 field: 1,
#                 "total_success": 1 if action == "read" else 0,
#                 "total_failure": 1 if action == "dismiss" else 0,
#                 "total_interactions": 1
#             },
#             "$set": {
#                 "success_rate": new_success_rate,
#                 "level": new_level,             # Numeric level for DB consistency
#                 "user_level": "Intermediate" if new_level == 2 else ("Advanced" if new_level == 3 else "Beginner"),
#                 "last_active": datetime.utcnow()
#             }
#         }

#         users_collection.update_one({"_id": ObjectId(user_id)}, update_query)
        
#         return {
#             "status": "success", 
#             "current_success_rate": new_success_rate,
#             "new_level": new_level
#         }

#     except Exception as e:
#         print(f"❌ Backend Error in Interaction: {e}")
#         return {"status": "error", "message": str(e)}
# # -----------------------------------------------------------
# # ✅ CLEAN TEST ROUTE (No Hardcoded Messages)
# # -----------------------------------------------------------
# @app.get("/test-real-logic/{user_id}")
# async def test_real_logic(user_id: str):
#     # Ye wahi upar wala real logic chalaye ga testing ke liye
#     return await get_nudge(user_id)
# # ✅ AUTOMATED NUDGE FUNCTION (Ye har user ke liye check karega)
# # ✅ Ye naya aur sahi tareeqa hai
# async def auto_check_nudges():
#     print("⏰ Checking for pending nudges...")
#     # Sirf un users ko uthao jin ka FCM token hai
#     users = users_collection.find({"fcm_token": {"$exists": True}})
    
#     for user in users:
#         user_id = str(user["_id"])
#         # ✅ Intelligent Check: Frequency aur Time ke mutabiq
#         if is_it_time_to_send(user): 
#             print(f"🎯 Time to nudge user: {user.get('email')}")
#             # Direct function call (Tez aur professional)
#             await get_nudge(user_id)

# # --- Ye Function se bahar hona chahiye ---
# scheduler = BackgroundScheduler()
# scheduler.add_job(lambda: asyncio.run(auto_check_nudges()), 'interval', minutes=2)
# scheduler.start()

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, Request, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from datetime import datetime
from pydantic import BaseModel
import uvicorn
import firebase_admin
from firebase_admin import credentials, messaging
from bson import ObjectId
import numpy as np  
from collections import defaultdict
from ai_model import predict_url
from flashcard import get_topic_data, save_user_quiz_score, HARDCODED_TOPICS
from routes.all_routes import router as all_routes_router
import requests
from apscheduler.schedulers.background import BackgroundScheduler
import asyncio
from bson import ObjectId
from nudge_engine import DynamicNudgeEngine
from thompson_engine import ThompsonNudgeEngine

cred = credentials.Certificate("firebase-key.json")
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# --- Phir aapka Function ---
def send_fcm_nudge(token, title, body, category, user_id):
    # Sirf Data bhejni hai taake Notifee trigger ho
    message = messaging.Message(
        data={
            "title": title,          # Frontend yahan se title uthayega
            "body": body,            # Frontend yahan se body uthayega
            "userId": str(user_id),
            "category": category,
            "action_type": "nudge_response"
        },
        token=token,
    )
    
    try:
        response = messaging.send(message)
        print(f"🚀 FCM Nudge Sent ({category}):", response)
        return True
    except Exception as e:
        print(f"❌ FCM Error details: {e}")
        return False
app = FastAPI()
# ✅ Routers
app.include_router(all_routes_router, prefix="/api")
class UpdateProfileModel(BaseModel):
    name: str
    email: str
# ✅ MongoDB Connection
try:
    client = MongoClient(
        "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority&appName=Cluster0"
    )
    db = client["nexusshield"]
    users_collection = db["users"]
    quiz_scores_collection = db["quizscores"]
    progress_collection = db["progress"]
    
    db_cyber = client["cyber_training"]
    topics_collection = db_cyber["topics"]
    messages_collection = db["messages"]
    nudge_gen = DynamicNudgeEngine(db)
    thompson_gen = ThompsonNudgeEngine(db)
    survey_collection = db["surveys"]
    print("✅ MongoDB connected successfully!")
except Exception as e:
    print("❌ MongoDB connection failed:", e)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------------------------------------
# ✅ db of model
# -----------------------------------------------------------
@app.get("/test-db")
def test_connection():
    try:
        # Ye line check karti hai ke Atlas ne respond kiya ya nahi
        client.admin.command('ping')
        return {"status": "success", "message": "connected sucessfulyy."}
    except Exception as e:
        return {"status": "error", "message": f"Connection Fail: {str(e)}"}
# -----------------------------------------------------------
# ✅ URL PREDICTION (LINK CHECKER)
# -----------------------------------------------------------

class URLRequest(BaseModel):
    url: str  # ✅ "text" ki jagah "url" use karo
class Stat(BaseModel):
    name: str  # Example: "Mon", "Tue"
    value: int
@app.post("/predict")
def predict_url_endpoint(data: URLRequest):
    try:
        # 1. Sab se pehle link check karo (AI Model
        result = predict_url(data.url)

        # 2. Statistics Update (Alag se try block mein taake error na aaye)
        try:
            today_name = datetime.now().strftime("%a") 
            db["stats"].update_one(
                {"name": today_name},
                {
                    "$inc": {"value": 1},
                    "$setOnInsert": {"__v": 0}
                },
                upsert=True
            )
            print(f"📊 Stats updated for {today_name}")
        except Exception as stats_err:
            print(f"⚠️ Stats Update Error (Silent): {stats_err}")

        # 3. YAHAN HAI ASAL CHEEZ: Result return karna
        # Ye line 'try' ke andar lekin 'stats' ke bahar honi chahiye
        return result

    except Exception as e:
        print(f"❌ Main Error: {e}")
        return {
            "label": "❌ ERROR",
            "probability": 0.5,
            "error": str(e)
        }
# -----------------------------------------------------------
# ✅ TRAINING & PROGRESS ROUTES
# -----------------------------------------------------------

@app.get("/topics/{level}")
async def get_level_topics(level: int):
    topics = HARDCODED_TOPICS.get(level, [])
    if not topics:
        return JSONResponse({"topics": [], "message": "Level not found"}, status_code=404)
    return {"topics": topics}

@app.get("/get-content")
async def get_content(topic: str, level: int):
    clean_topic = topic.strip()
    try:
        content = get_topic_data(clean_topic, level)
        if content:
            return content
        return JSONResponse(status_code=404, content={"error": "Not found"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/api/progress/{user_id}")
async def get_user_progress(user_id: str):
    try:
        progress_data = db["progress"].find_one({"user_id": user_id}, {"_id": 0})
        if progress_data:
            return progress_data
        return {"lessonsCompleted": 0, "quizzesAttempted": 0, "quizScore": 0, "nudgesReceived": 0}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/api/save-quiz-result")
async def save_quiz_result(request: Request):
    try:
        data = await request.json()
        user_id, score_val, total_val = data.get("user_id"), data.get("score"), data.get("total")
        db["quizscores"].insert_one({"range": f"{score_val}/{total_val}", "score": score_val, "__v": 0}) 
        db["progress"].update_one(
            {"user_id": user_id},
            {"$inc": {"lessonsCompleted": 1, "quizzesAttempted": 1}, "$set": {"quizScore": score_val}},
            upsert=True 
        )
        return {"status": "success"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# -----------------------------------------------------------
# ✅ AUTHENTICATION
# -----------------------------------------------------------

# @app.post("/signup")
# async def signup(request: Request):
#     data = await request.json()
#     email = data.get("email")
#     if users_collection.find_one({"email": email}):
#         return JSONResponse({"message": "User already exists"}, status_code=400)
#     users_collection.insert_one({
#         "name": data.get("name"), "email": email, "password": data.get("password"),
#         "fcm_token": data.get("fcm_token"),
#         "role": data.get("role"), "createdAt": datetime.utcnow(),
#         "surveyDone": False,
#     })
#     return JSONResponse({"message": "User registered successfully"}, status_code=200)
@app.post("/signup")
async def signup(request: Request):
    data = await request.json()
    email = data.get("email")
    
    if users_collection.find_one({"email": email}):
        return JSONResponse({"message": "User already exists"}, status_code=400)
    
    # ✅ 1. Insert karne ke baad result ko variable mein rakhein
    result = users_collection.insert_one({
        "name": data.get("name"), 
        "email": email, 
        "password": data.get("password"),
        "fcm_token": data.get("fcm_token"),
        "role": data.get("role"), 
        "createdAt": datetime.utcnow(),
        "surveyDone": False,
    })

    # ✅ 2. Response mein 'user_id' lazmi bhejein (string mein convert kar ke)
    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id) # 👈 Ye line miss thi!
    }

@app.post("/login")
async def login(request: Request):
    try:
        data = await request.json()
        email = data.get("email")
        password = data.get("password")
        fcm_token = data.get("fcm_token")
        
        user = users_collection.find_one({"email": email, "password": password})
        
        if not user:
            return JSONResponse({"message": "Invalid credentials"}, status_code=401)
        
        if fcm_token:
            users_collection.update_one(
                {"_id": user["_id"]},
                {"$set": {"fcm_token": fcm_token}}
            )
            print(f"✅ FCM Token updated for {email}")

        # --- CRITICAL FIX FOR NUDGE ENGINE ERROR ---
        # Agar aapka Nudge Engine background mein level check karta hai,
        # toh check karein ke level string hai ya nahi.
        user_level = user.get("level", "Beginner")
        
    
        level_map = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}
        # Agar database mein "Intermediate" hai toh ye 2 return karega
        numeric_level = level_map.get(user_level, 1) 

        print(f"User Level: {user_level} (Numeric: {numeric_level})")

        return {
            "message": "Login successful", 
            "user": {
                "name": user.get("name"), 
                "email": user.get("email"),
                "user_id": str(user.get("_id")),
                "surveyDone": user.get("surveyDone", False),
                "level": user_level, # Frontend ko string bhej rahe hain
                "level_num": numeric_level # Backup ke liye number bhi bhej rahe hain
            }
        }
    except Exception as e:
        print(f"❌ Login Crash Error: {str(e)}")
        return JSONResponse({"message": "Server error during login", "error": str(e)}, status_code=500)
# -----------------------------------------------------------
# ✅ profile screeen
# -----------------------------------------------------------
@app.get("/api/user/{user_id}")
async def get_user_profile(user_id: str):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        return {
            "name": user.get("name"),
            "email": user.get("email")
        }
    raise HTTPException(status_code=404, detail="User not found")

# 2. User ka data update karne ke liye (Save button par)
@app.put("/api/update-profile/{user_id}")
async def update_profile(user_id: str, profile_data: UpdateProfileModel):
    result = users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {
            "name": profile_data.name, 
            "email": profile_data.email
        }}
    )
    
    if result.matched_count > 0:
        return {
            "status": "success", 
            "message": f"Profile updated! New name: {profile_data.name}"
        }
    return {"status": "error", "message": "Update failed"}
@app.post("/api/report-content")
async def report_content(data: dict):
    try:
        messages_collection.insert_one(data)
        return {"status": "success", "message": "Report saved!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
# -----------------------------------------------------------
# ✅ SAVE SURVEY RESULTS & CALCULATE LEVEL
# -----------------------------------------------------------
CATEGORY_MAP = {
    "T1": "Password Security", "T2": "Device Security", "T3": "Physical Security",
    "T4": "Network Security", "T5": "Password Security", "T6": "Password Security",
    "T7": "Software Updates", "T8": "Malware Protection", "S1": "App Security",
    "S2": "Phishing", "S3": "Web Security", "S4": "Phishing",
    "S5": "Phishing", "S6": "Device Security"
}

@app.post("/survey")
async def save_survey(request: Request):
    try:
        data = await request.json()
        user_id = data.get("userId")
        answers = data.get("answers", []) 

        # --- 1. Fair Statistical Logic ---
        total_score = sum(a["score"] for a in answers)
        grouped_data = defaultdict(list)
        
        # Row format: ["T1 : Password Security : 5", "S2 : Phishing : 4"]
        descriptive_results = []

        for a in answers:
            q_id = a["questionId"]
            score = a["score"]
            cat_name = CATEGORY_MAP.get(q_id, "General")
            
            descriptive_results.append(f"{q_id} : {cat_name} : {score}")
            grouped_data[cat_name].append(score)

        # Category Averages (Simple Mean - No Penalty)
        category_scores = {
            cat: round(np.mean(scores), 2) 
            for cat, scores in grouped_data.items()
        }

        # --- 2. Relative Threshold (Insaaf Logic) ---
        # values = list(category_scores.values())
        # weak_cats = []
        # if values:
        #     # User ka apna overall average behavior
        #     user_mean = np.mean(values)
        #     user_std = np.std(values)
            
        #     # Threshold: User ke apne average se 0.5 niche wale points "Weak" honge
        #     # Iska matlab user ka muqabla uski apni performance se hai
        #     threshold = user_mean - 0.5 * user_std
            
        #     for cat, avg in category_scores.items():
        #         # Agar score threshold se niche ho YA bohot hi kam ho (e.g. < 2.5)
        #         if avg < threshold or avg < 2.5:
        #             weak_cats.append(cat)
    # --- 2. Fixed Threshold Logic (3.0 Comparison) ---
        weak_cats = []
        
        # Ab har category ke average ko seedha 3.0 se check karein
        for cat, avg in category_scores.items():
            if avg < 3.0:
                weak_cats.append(cat)
        # --- 3. Level Calculation ---
        # --- 2. Level Calculation (Numeric Save) ---
        percentage = round((total_score / 70) * 100, 2)
        
        # Strings ke bajaye Numbers use kar rahe hain
        if percentage >= 75:
            user_level = 3  # Advanced
        elif percentage >= 45:
            user_level = 2  # Intermediate
        else:
            user_level = 1  # Beginner

        # --- 3. Database Structure Update ---
        formatted_survey = {
            "userId": str(user_id),
            "descriptive_results": descriptive_results,
            "category_scores": category_scores,
            "weak_categories": weak_cats,
            "total_score": total_score,
            "percentage": percentage,
            "level": user_level,  # Ab ye 1, 2, ya 3 save hoga
            "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        } 

        survey_collection.insert_one(formatted_survey)
        
        # User profile update
        users_collection.update_one(
            {"_id": ObjectId(user_id) if len(user_id) == 24 else user_id},
            {"$set": {
                "surveyDone": True, 
                "level": user_level,
                "cyber_hygiene_score": percentage
            }}
        )

        return {
            "status": "success",
            "level": user_level,
            "percentage": percentage,
            "weak_points": weak_cats,
            "results": descriptive_results
        }

    except Exception as e:
        print(f"DEBUG ERROR: {str(e)}")
        return JSONResponse(status_code=500, content={"error": str(e)})
# -----------------------------------------------------------
# ✅ REAL-TIME AI NUDGE ENGINE (Thompson Sampling)
# -----------------------------------------------------------
@app.get("/api/get-nudge/{user_id}")
async def get_nudge(user_id: str):
    try:
        # 1. 🟢 Ye Engine Async hai, is par await LAZMI hai
        # Thompson logic results calculate karke layega
        final_data = await thompson_gen.generate_final_nudge(user_id, nudge_gen)

        if not final_data:
            return {"status": "wait", "message": "Not the right time or gap for a nudge."}

        # 2. 🟡 Ye Database Sync hai, is par await NAHI lagana
        # Agar yahan await lagaya toh "NoneType" ya "Not awaitable" error ayega
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        
        if not user or not user.get("fcm_token"):
             return {"status": "error", "message": "No FCM token found for user"}

        # 3. Notification bhejnah (Sync function)
        nudge_to_send = final_data["nudge_content"][0] 
        
        notification_sent = send_fcm_nudge(
            token=user.get("fcm_token"),
            title=f"🛡️ Security Alert: {nudge_to_send['category']}",
            body=nudge_to_send['nudge'],
            category=nudge_to_send['category'],
            user_id=user_id
        )

        # 4. 🟡 History save karna (Sync call, No await)
        if notification_sent:
            db.nudge_history.insert_one({
                "userId": user_id,
                "category": nudge_to_send['category'],
                "nudge": nudge_to_send['nudge'],
                "combo": final_data["combo_metadata"],
                "timestamp": datetime.utcnow(),
                "action": "sent"
            })

        return {
            "status": "success",
            "nudge": nudge_to_send['nudge']
        }

    except Exception as e:
        # Traceback print karein taake exact line pata chale agar phir error aaye
        import traceback
        traceback.print_exc()
        print(f"❌ Nudge Engine Error: {e}")
        return {"status": "error", "message": str(e)}
#----------------------------------------------
#-------get interaction-------
@app.post("/api/nudge-interaction")
async def nudge_interaction(request: Request):
    try:
        data = await request.json()
        user_id = data.get("userId")
        action = data.get("action") 
        
        # 1. MongoDB se sync tareeqe se data fetch karna
        last_nudge = db.nudge_history.find_one(
            {"userId": user_id}, sort=[("timestamp", -1)]
        )
        
        if last_nudge and "combo" in last_nudge:
            # 2. Thompson logic update karna
            # Note: Agar update_user_behavior async hai to await laga rehne dein
            await thompson_gen.update_user_behavior(user_id, last_nudge["combo"], action)
            
            # 3. History update karna (await ke baghair)
            db.nudge_history.update_one(
                {"_id": last_nudge["_id"]},
                {"$set": {"action": action}}
            )

        return {"status": "success", "message": "Behavior adapted with decay logic"}

    except Exception as e:
        print(f"❌ Interaction Error: {e}")
        return {"status": "error", "message": str(e)}
# -----------------------------------------------------------
# ✅ AUTOMATED NUDGE FUNCTION (Decay & Thompson Integration)
# -----------------------------------------------------------
async def auto_check_nudges():
    print("⏰ Thompson Engine: Checking for pending nudges...")
    # Find sync hai, isliye simple list ya cursor use karein
    users = users_collection.find({"fcm_token": {"$exists": True}})
    
    for user in users:
        try:
            user_id = str(user["_id"])
            # Ye await theek hai kyunki get_nudge khud 'async def' hai
            await get_nudge(user_id)
        except Exception as e:
            print(f"⚠️ Error processing user: {e}")
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)