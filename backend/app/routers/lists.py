# app/routers/lists.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models, crud
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(
    prefix="/lists",
    tags=["lists"],
)

@router.get("/", response_model=List[schemas.ListResponse])
def get_lists(db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    return crud.get_lists(db, user_id=current_user.id)

@router.post("/", response_model=schemas.ListResponse)
def create_list(list: schemas.ListCreate, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    return crud.create_list(db=db, list=list, user_id=current_user.id)

@router.get("/{list_id}", response_model=schemas.ListResponse)
def get_list(list_id: int, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    db_list = crud.get_list_by_id(db=db, list_id=list_id, user_id=current_user.id)
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    return db_list

@router.delete("/{list_id}", response_model=schemas.ListResponse)
def delete_list(list_id: int, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    db_list = crud.get_list_by_id(db=db, list_id=list_id, user_id=current_user.id)
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    return crud.delete_list(db=db, list=db_list)