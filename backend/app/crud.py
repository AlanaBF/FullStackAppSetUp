# app/crud.py

from sqlalchemy.orm import Session
from . import models, schemas, utils

# User CRUD operations
def get_user_by_username(db: Session, username: str):
    return db.query(models.UserDB).filter(models.UserDB.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = utils.get_password_hash(user.password)
    db_user = models.UserDB(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Item CRUD operations
def create_item(db: Session, item: schemas.ItemCreate, user_id: int):
    db_item = models.ItemDB(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_items(db: Session, user_id: int):
    return db.query(models.ItemDB).filter(models.ItemDB.owner_id == user_id).all()

# **Add this function to get a single item**
def get_item(db: Session, item_id: int, user_id: int):
    return db.query(models.ItemDB).filter(
        models.ItemDB.id == item_id,
        models.ItemDB.owner_id == user_id
    ).first()

# **Add this function to update an item**
def update_item(db: Session, item: models.ItemDB, item_update: schemas.ItemUpdate):
    for key, value in item_update.dict(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

# **Add this function to delete an item**
def delete_item(db: Session, item: models.ItemDB):
    db.delete(item)
    db.commit()
    return item
