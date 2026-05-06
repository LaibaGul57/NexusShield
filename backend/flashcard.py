import requests
import json
from pymongo import MongoClient
from datetime import datetime

# --- 1. MongoDB Atlas Connection ---
try:
    # Aapka connection string
    client = MongoClient("mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority")
    db = client["nexusshield"]
    
    # Atlas mein collection ka naam 'topics_content' hai
    content_collection = db["topics_content"]
    progress_collection = db["progress"]
    
    print("✅ MongoDB Connected! (Flashcard Mode)")
    print("✅ Progress Collection Ready!")
except Exception as e:
    print(f"❌ MongoDB Failed: {e}")

# --- 2. Groq Configuration ---
GROQ_API_KEY = "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" 
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

# Saare Levels aur unke Topics
# --- Updated Topics List (8 Topics per Level) ---
HARDCODED_TOPICS = {
    1: [
        "Phishing Awareness", "Password Security", "Public WiFi Risks", 
        "Social Engineering", "Two-Factor Authentication", "Safe Browsing", 
        "Mobile App Permissions", "Physical Security"
    ],
    2: [
        "SQL Injection", "Cross-Site Scripting (XSS)", "Man-in-the-Middle", 
        "Network Firewalls", "VPN Technology", "Encryption Basics", 
        "Brute Force Attacks", "Malware Types"
    ],
    3: [
        "Zero-Day Vulnerabilities", "Ransomware Defense", "Cloud Security", 
        "Incident Response", "Penetration Testing", "Ethical Hacking", 
        "Digital Forensics", "Dark Web Monitoring"
    ]
}

def get_topic_data(topic_from_frontend, level):
    """AI ya DB se single topic ka data lata hai (4 Flashcards, 3 Quizzes)"""
    try:
        # 1. Pehle Atlas mein check karo ('title' field use kar rahe hain)
        # Regex se case-insensitive search hogi taake spelling mismatch na ho
        query = {
            "title": {"$regex": f"^{topic_from_frontend.strip()}$", "$options": "i"},
            "level": int(level) 
        }
        
        print(f"🔍 Searching Atlas with query: {query}")
        existing_data = content_collection.find_one(query)

        if existing_data:
            print(f"✅ Data found in Atlas: {existing_data.get('title')}")
            print(f"   Flashcards: {len(existing_data.get('flashcards', []))}")
            print(f"   Quizzes: {len(existing_data.get('quizzes', []))}")
            existing_data["_id"] = str(existing_data["_id"])
            return existing_data

        # 2. Agar DB mein nahi hai toh Groq se mangwao
        print(f"⚡ Generating NEW content for: {topic_from_frontend}...")
        
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        prompt = (
            f"Generate a professional JSON for cybersecurity topic '{topic_from_frontend}' level {level}. "
            f"Requirements: EXACTLY 4 flashcards and EXACTLY 3 quizzes. "
            f"Structure: {{"
            f'"title": "{topic_from_frontend}", "level": {level}, '
            f'"flashcards": [{{"question": "...", "answer": "..."}}], '
            f'"quizzes": [{{"question": "...", "options": ["A", "B", "C", "D"], "correct_answer": "..."}}]}}'
            f"Return ONLY raw JSON."
        )

        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.6,
            "response_format": {"type": "json_object"}
        }

        response = requests.post(GROQ_URL, headers=headers, json=payload)
        result = response.json()

        if "choices" not in result:
            print(f"❌ Groq Error: {result}")
            return None

        raw_content = result['choices'][0]['message']['content']
        data = json.loads(raw_content)

        # Validate data structure
        if "flashcards" not in data or not isinstance(data["flashcards"], list):
            data["flashcards"] = []
        if "quizzes" not in data or not isinstance(data["quizzes"], list):
            data["quizzes"] = []
        
        print(f"   Generated {len(data['flashcards'])} flashcards and {len(data['quizzes'])} quizzes")

        # 3. Database mein save karo
        data["createdAt"] = datetime.utcnow()
        inserted_res = content_collection.insert_one(data.copy())
        
        data["_id"] = str(inserted_res.inserted_id)
        return data

    except Exception as e:
        print(f"🔥 Error for {topic_from_frontend}: {str(e)}")
        return None

def seed_all_topics():
    """Ye function saare topics ka data Atlas mein bhar dega"""
    count = 0
    print("🚀 Starting Seeding Process...")
    print("=" * 50)
    
    for level, topics in HARDCODED_TOPICS.items():
        print(f"\n📚 Level {level} Topics:")
        for topic in topics:
            print(f"   📖 Processing: {topic}")
            result = get_topic_data(topic, level)
            if result and len(result.get("flashcards", [])) > 0:
                print(f"   ✅ Successfully Seeded: {topic}")
                count += 1
            else:
                print(f"   ❌ Failed to seed: {topic}")
    
    print("=" * 50)
    return f"Successfully seeded {count} topics!"

def save_user_quiz_score(user_id, topic_title, score):
    """User ka progress save karne ke liye"""
    try:
        progress_collection.update_one(
            {"user_id": user_id, "topic": topic_title},
            {"$set": {"score": score, "updatedAt": datetime.utcnow()}},
            upsert=True
        )
        print(f"✅ Progress saved for user {user_id} on {topic_title}")
        return True
    except Exception as e:
        print(f"❌ Error saving progress: {e}")
        return False
