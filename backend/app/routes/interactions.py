from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)

@router.get("/")
def get_interactions(db: Session = Depends(get_db)):
    return db.query(models.Interaction).all()

@router.post("/")
def create_interaction(
    interaction: schemas.InteractionCreate,
    db: Session = Depends(get_db)
):
    new_interaction = models.Interaction(**interaction.model_dump())

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction

@router.put("/{interaction_id}")
def update_interaction(
    interaction_id: int,
    interaction: schemas.InteractionUpdate,
    db: Session = Depends(get_db)
):
    existing_interaction = db.query(models.Interaction).filter(
        models.Interaction.id == interaction_id
    ).first()

    if not existing_interaction:
        raise HTTPException(status_code=404, detail="Interaction not found")

    update_data = interaction.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(existing_interaction, key, value)

    db.commit()
    db.refresh(existing_interaction)

    return existing_interaction