# from pymongo import MongoClient
# from pymongo.errors import ConnectionFailure

# # MongoDB connection URI
# MONGO_URI = "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority&appName=Cluster0"

# try:
#     # Create a MongoClient
#     client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    
#     # Test connection
#     client.admin.command('ping')
#     print("✅ MongoDB connected successfully")

#     # Select your database
#     db = client["nexusshield"]

#     # Example: select collection
#     users_collection = db["users"]

#     # Example: insert a document
#     example_user = {
#         "name": "John Doe",
#         "email": "john@example.com",
#         "password": "password123"
#     }
#     inserted = users_collection.insert_one(example_user)
#     print("Inserted user ID:", inserted.inserted_id)

# except ConnectionFailure as e:
#     print("❌ MongoDB connection error:", e)
# from pymongo import MongoClient
# from pymongo.errors import ConnectionFailure

# MONGO_URI = "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority&appName=Cluster0"

# try:
#     client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
#     client.admin.command('ping')
#     print("✅ MongoDB connected successfully")
#     db = client["nexusshield"]
# except ConnectionFailure as e:
#     print("❌ MongoDB connection error:", e)
#     db = None
# from pymongo import MongoClient
# import os

# # MongoDB connection URI (replace with your own)
# MONGO_URI = os.getenv("MONGO_URI") or "mongodb+srv://<username>:<password>@cluster0.begtxob.mongodb.net/mydatabase?retryWrites=true&w=majority"

# try:
#     client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)  # 5s timeout
#     client.admin.command("ping")  # Test connection
#     db = client.get_database()    # Uses the DB in URI
#     print("✅ MongoDB connected")
# except Exception as e:
#     print("❌ MongoDB connection error:", e)
#     db = None

# from pymongo import MongoClient
# from pymongo.errors import ConnectionFailure
# import certifi

# MONGO_URI = "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority"

# try:
#     client = MongoClient(
#         MONGO_URI,
#         serverSelectionTimeoutMS=5000,  # 5 seconds
#         tls=True,
#         tlsCAFile=certifi.where()       # Use correct SSL certificate
#     )
    
#     client.admin.command('ping')  # Test connection
#     print("✅ MongoDB connected successfully")
    
#     db = client["nexusshield"]  # Select your DB

# except ConnectionFailure as e:
#     print("❌ MongoDB connection error:", e)
#     db = None
from pymongo import MongoClient

try:
    # Use your MongoDB Atlas URI
    # client = MongoClient(
    #     "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/nexusshield?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"
    #   ssl=True
    # )
client = MongoClient(
    "mongodb+srv://nexus_user1:4PAiHn%219B%25D.uDM@cluster0.begtxob.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&tlsInsecure=true"
)


    # Connect to your specific database
    db = client["nexusshield"]
    users_collection = db["users"]
    print("✅ MongoDB connected successfully")

except Exception as e:
    print(f"❌ MongoDB connection error: {e}")
    db = None
    users_collection = None