import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL = "gemini-flash-latest"

def ask_llm(prompt: str):
    print("Using model:", MODEL)

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
    )

    print(response)

    return response.text