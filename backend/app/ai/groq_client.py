import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def ask_groq(prompt: str):
    response = client.chat.completions.create(
    model=os.getenv("GROQ_MODEL"),
        messages=[
            {
                "role": "system",
                "content": "You are an AI assistant for a life science CRM used by medical representatives."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content