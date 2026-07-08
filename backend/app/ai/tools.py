import json
from app.ai.groq_client import ask_groq


def extract_hcp_details(user_input: str) -> dict:
    prompt = f"""
You are extracting CRM data for an HCP interaction.

Return ONLY valid JSON.
Do not add markdown.
Do not add explanation.

Required JSON format:
{{
  "hcp_name": "",
  "specialty": "",
  "organization": "",
  "interaction_type": "",
  "topics_discussed": "",
  "materials_shared": "",
  "samples_distributed": "",
  "hcp_sentiment": "",
  "outcomes": "",
  "follow_up_actions": ""
}}

Text:
{user_input}
"""

    response = ask_groq(prompt)

    try:
        start = response.find("{")
        end = response.rfind("}") + 1
        json_text = response[start:end]
        return json.loads(json_text)
    except Exception:
        return {
            "hcp_name": "",
            "specialty": "",
            "organization": "",
            "interaction_type": "Meeting",
            "topics_discussed": user_input,
            "materials_shared": "",
            "samples_distributed": "",
            "hcp_sentiment": "",
            "outcomes": "",
            "follow_up_actions": ""
        }


def summarize_interaction(user_input: str) -> str:
    prompt = f"""
Summarize this HCP interaction in 2-3 professional CRM lines:

{user_input}
"""
    return ask_groq(prompt)


def recommend_followup(user_input: str) -> str:
    prompt = f"""
Based on this HCP interaction, suggest 3 sales follow-up actions.

Interaction:
{user_input}
"""
    return ask_groq(prompt)


def log_interaction_tool(data: dict) -> dict:
    return {
        "tool": "Log Interaction",
        "status": "ready_to_save",
        "data": data
    }


def edit_interaction_tool(interaction_id: int, updated_data: dict) -> dict:
    return {
        "tool": "Edit Interaction",
        "interaction_id": interaction_id,
        "updated_data": updated_data,
        "status": "ready_to_update"
    }