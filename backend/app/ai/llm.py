import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "gemini-1.5-flash"

def ask_llm(prompt: str):
    print("Using model:", MODEL)

    model = genai.GenerativeModel(MODEL)
    response = model.generate_content(prompt)

    print(response)

    return response.text