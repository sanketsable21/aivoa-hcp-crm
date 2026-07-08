from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String(100), nullable=False)
    specialty = Column(String(100), nullable=True)
    organization = Column(String(150), nullable=True)

    interaction_type = Column(String(50), nullable=True)
    interaction_date = Column(String(50), nullable=True)
    interaction_time = Column(String(50), nullable=True)

    attendees = Column(Text, nullable=True)
    topics_discussed = Column(Text, nullable=True)
    materials_shared = Column(Text, nullable=True)
    samples_distributed = Column(Text, nullable=True)

    hcp_sentiment = Column(String(50), nullable=True)
    outcomes = Column(Text, nullable=True)
    follow_up_actions = Column(Text, nullable=True)

    ai_summary = Column(Text, nullable=True)
    ai_suggested_followups = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)