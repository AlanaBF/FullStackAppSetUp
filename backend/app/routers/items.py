# app/routers/items.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models, crud
from ..database import get_db
from ..auth import get_current_user

router = APIRouter(
    prefix="/items",
    tags=["items"],
)


@router.get("/list/{list_id}", response_model=List[schemas.ItemResponse])
def read_items(list_id: int, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    return crud.get_items_by_list(db, list_id=list_id, user_id=current_user.id)

@router.post("/list/{list_id}", response_model=schemas.ItemResponse)
def create_item(list_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    return crud.create_item(db=db, item=item, list_id=list_id, user_id=current_user.id)

@router.get("/", response_model=List[schemas.ItemResponse])
def read_items(db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    return crud.get_items(db, user_id=current_user.id)

@router.post("/", response_model=schemas.ItemResponse)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    return crud.create_item(db=db, item=item, user_id=current_user.id)

@router.put("/{item_id}", response_model=schemas.ItemResponse)
def update_item(item_id: int, item_update: schemas.ItemUpdate, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    db_item = crud.get_item(db=db, item_id=item_id, user_id=current_user.id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.update_item(db=db, item=db_item, item_update=item_update)

@router.delete("/{item_id}", response_model=schemas.ItemResponse)
def delete_item(item_id: int, db: Session = Depends(get_db), current_user: models.UserDB = Depends(get_current_user)):
    db_item = crud.get_item(db=db, item_id=item_id, user_id=current_user.id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.delete_item(db=db, item=db_item)
