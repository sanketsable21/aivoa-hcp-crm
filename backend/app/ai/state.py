from typing import TypedDict


class AgentState(TypedDict):
    user_input: str

    extracted_data: dict

    summary: str

    recommendation: str

    saved: bool