import tensorflow as tf
import pickle
import os
import math
from collections import Counter
from tensorflow.keras.preprocessing.sequence import pad_sequences

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MAX_LEN = 200

# Load model and tokenizer
model_path = os.path.join(BASE_DIR, "model", "cnn_url_phishing_final.keras")
tokenizer_path = os.path.join(BASE_DIR, "model", "tokenizer.pkl")

print(f"📂 Loading model from: {model_path}")
print(f"📂 Folder exists: {os.path.exists(model_path)}")

try:
    model = tf.keras.models.load_model(model_path)
    print("🔥🔥🔥 MODEL LOADED SUCCESSFULLY! 🔥🔥🔥")
    
    with open(tokenizer_path, "rb") as f:
        tokenizer = pickle.load(f)
    print("✅ Tokenizer loaded successfully!")
    
except Exception as e:
    print(f"❌ Model load failed: {e}")
    model = None
    tokenizer = None

# Helper functions
def url_entropy(url):
    counts = Counter(url)
    total = len(url)
    return -sum((c / total) * math.log2(c / total) for c in counts.values())

def calibrated_prob(p, T=4.0):
    if p <= 0 or p >= 1:
        return p
    return 1 / (1 + math.exp(-math.log(p / (1 - p)) / T))

def predict_url(url: str):
    """Predict if URL is phishing or legitimate"""
    
    if model is None or tokenizer is None:
        return {
            "label": "⚠️ MODEL NOT LOADED",
            "probability": 0.5,
            "error": "Model not loaded"
        }
    
    try:
        seq = tokenizer.texts_to_sequences([url])
        padded = pad_sequences(seq, maxlen=MAX_LEN)
        
        raw_prob = model.predict(padded, verbose=0)[0][0]
        prob = calibrated_prob(raw_prob, T=4.0)
        ent = url_entropy(url)
        
        if prob <= 0.20:
            label = "✅ SAFE"
        elif prob >= 0.90 and ent > 4.0:
            label = "🚨 PHISHING (Unsafe)"
        else:
            label = "⚠️ POTENTIALLY UNSAFE – PROCEED WITH CAUTION"
        
        return {
            "label": label,
            "probability": float(prob)
        }
        
    except Exception as e:
        return {
            "label": "❌ ERROR",
            "probability": 0.5,
            "error": str(e)
        }