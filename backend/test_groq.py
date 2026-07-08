from app.ai.groq_client import ask_groq

result = ask_groq(
    "Summarize this HCP interaction: Met Dr Sharma and discussed Product X. He showed positive interest."
)

print(result)