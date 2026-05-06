from pymongo import MongoClient

# MongoDB Connection
client = MongoClient("mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority&appName=Cluster0")
db = client["nexusshield"]
nudges_col = db["nudges"]

# Sample Data Structure (Aap is list ko expand karengi)
all_nudges = [
    # LEVEL 1 - Passwords
    {"category": "Passwords", "level": 1, "message": "Strong passwords use @, #, and numbers. Try changing yours today!"},
    {"category": "Passwords", "level": 1, "message": "Never share your password with anyone, even if they claim to be from support."},
    
    # LEVEL 2 - Phishing
    {"category": "Phishing", "level": 2, "message": "Check the sender's email address carefully before clicking any links."},
    
    # LEVEL 3 - Advanced
    {"category": "Network Security", "level": 3, "message": "Ensure your home router is using WPA3 encryption for maximum security."}
    
    # Yahan aap apne saare 900 nudges ki list paste karengi
]

# Insert into MongoDB
if nudges_col.count_documents({}) == 0:
    nudges_col.insert_many(all_nudges)
    print("✅ 900 Nudges uploaded successfully!")
else:
    print("⚠️ Nudges already exist in database.")