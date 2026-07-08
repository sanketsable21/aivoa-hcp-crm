from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.ai.agent import run_hcp_agent
from app.database import get_db
from app import models

router = APIRouter(
    prefix="/ai",
    tags=["AI Agent"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat-log")
def chat_log(request: ChatRequest, db: Session = Depends(get_db)):
    result = run_hcp_agent(request.message)

    data = result["extracted_data"]

    interaction = models.Interaction(
        hcp_name=data.get("hcp_name", ""),
        specialty=data.get("specialty", ""),
        organization=data.get("organization", ""),
        interaction_type=data.get("interaction_type", ""),
        attendees=data.get("attendees", ""),
        topics_discussed=data.get("topics_discussed", ""),
        materials_shared=data.get("materials_shared", ""),
        samples_distributed=data.get("samples_distributed", ""),
        hcp_sentiment=data.get("hcp_sentiment", ""),
        outcomes=data.get("outcomes", ""),
        follow_up_actions=data.get("follow_up_actions", ""),
        ai_summary=data.get("ai_summary", ""),
        ai_suggested_followups=data.get("ai_suggested_followups", "")
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return {
        "message": "Interaction logged successfully",
        "interaction": interaction,
        "agent_output": result
    }