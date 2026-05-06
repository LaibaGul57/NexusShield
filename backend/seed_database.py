from pymongo import MongoClient
from datetime import datetime

# ✅ MongoDB Connection String
MONGO_URL = "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority&appName=Cluster0"

def seed_nudges():
    try:
        client = MongoClient(MONGO_URL)
        db = client["nexusshield"]
        nudges_col = db["nudges"]

        # ✅ 20 Categories
        categories = [
            "Passwords", "Phishing", "Public WiFi", "Two-Factor Auth", "Software Updates",
            "Social Media Privacy", "Mobile Security", "Data Backup", "Email Security", "Web Browsing",
            "Physical Security", "IoT Devices", "Cloud Storage", "Identity Theft", "Malware Awareness",
            "Encryption", "Online Shopping", "App Permissions", "Network Security", "Device Disposal"
        ]

        # ✅ Real Professional Cybersecurity Tips
        cyber_messages = [
            "Use a mix of uppercase, lowercase, numbers, and symbols for security.",
            "Avoid using personal information like birthdays in your settings.",
            "Always use a dedicated password manager to store keys safely.",
            "Check for spelling errors in any urgent incoming emails.",
            "Verify suspicious activities via a secondary trusted channel.",
            "Never share your credentials with anyone, even support teams.",
            "Enable multi-layer protection (2FA) on all your primary accounts.",
            "Keep your system updated to patch the latest security vulnerabilities.",
            "Review your privacy settings at least once every month.",
            "Encrypt your sensitive data before uploading it to the cloud.",
            "Always lock your computer when stepping away from your desk.",
            "Be cautious of USB drives found in public places.",
            "Disable bluetooth and GPS when they are not in use.",
            "Use biometric locks (fingerprint/face) for better mobile safety.",
            "Regularly back up your important files to an external drive."
        ]

        all_nudges = []

        print("🔄 Generating 900 Real Nudges...")

        for cat in categories:
            for level in [1, 2, 3]:
                for i in range(1, 16):
                    msg_index = i % len(cyber_messages)
                    base_msg = cyber_messages[msg_index]
                    
                    # ✅ Clean Message: Koi extra text nahi
                    all_nudges.append({
                        "category": cat,
                        "level": level,
                        "message": base_msg, 
                        "created_at": datetime.utcnow()
                    })

        # ✅ Ye block 'for' loop se ek step piche (Out of the loop)
        print("🗑️ Cleaning old data...")
        nudges_col.delete_many({}) 
        
        print("📤 Uploading to Atlas...")
        nudges_col.insert_many(all_nudges)

        print(f"✅ SUCCESS! {len(all_nudges)} nudges uploaded successfully.")
        client.close()

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    seed_nudges()