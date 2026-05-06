
# from fastapi import APIRouter
# from database import db

# router = APIRouter()

# @router.post("/signup")
# async def signup(user: dict):
#     name = user["name"]
#     email = user["email"]
#     password = user["password"]

#     if db.users.find_one({"email": email}):
#         return {"message": "Email already registered"}

#     db.users.insert_one({"name": name, "email": email, "password": password})
#     return {"message": "User registered successfully"}

# @router.post("/login")
# async def login(user: dict):
#     email = user["email"]
#     password = user["password"]

#     existing_user = db.users.find_one({"email": email, "password": password})
#     if not existing_user:
#         return {"message": "Invalid email or password"}

#     return {
#         "message": "Login successful",
#         "user": {"name": existing_user["name"], "email": existing_user["email"]},
#     }

from fastapi import APIRouter
from database import db

router = APIRouter()

# ✅ Signup endpoint
@router.post("/signup")
async def signup(user: dict):
    name = user["name"]
    email = user["email"]
    password = user["password"]

    if db.users.find_one({"email": email}):
        return {"message": "Email already registered"}

    db.users.insert_one({"name": name, "email": email, "password": password})
    return {"message": "User registered successfully"}


# ✅ Login endpoint
@router.post("/login")
async def login(user: dict):
    email = user["email"]
    password = user["password"]

    existing_user = db.users.find_one({"email": email, "password": password})
    if not existing_user:
        return {"message": "Invalid email or password"}

    return {
        "message": "Login successful",
        "user": {"name": existing_user["name"], "email": existing_user["email"]},
    }


# ✅ Google login endpoint (add this at the end)
@router.post("/google-login")
async def google_login(user: dict):
    name = user.get("name")
    email = user.get("email")
    users_collection = db["users"]

    existing = users_collection.find_one({"email": email})
    if not existing:
        users_collection.insert_one({
            "name": name,
            "email": email,
            "auth_provider": "google"
        })

    return {
        "message": "Google login successful",
        "user": {"name": name, "email": email}
    }
