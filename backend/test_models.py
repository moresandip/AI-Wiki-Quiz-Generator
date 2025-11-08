import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

try:
    models = genai.list_models()
    available_models = []
    for model in models:
        try:
            if 'generateContent' in model.supported_generation_methods:
                available_models.append(model.name)
        except:
            pass
    print("Available models for generateContent:")
    for model in available_models:
        print(model)
except Exception as e:
    print(f"Error listing models: {e}")
