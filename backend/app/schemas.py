# # app/schemas.py
# from pydantic import BaseModel, EmailStr
# from typing import Optional, List

# # User schemas
# class UserBase(BaseModel):
#     username: str
#     email: EmailStr

# class UserCreate(UserBase):
#     password: str

# class UserResponse(UserBase):
#     id: int

#     class Config:
#         orm_mode = True

# # Item schemas
# class ItemBase(BaseModel):
#     name: str
#     description: str
#     completed: Optional[bool] = False

# class ItemCreate(ItemBase):
#     pass

# class ItemUpdate(ItemBase):
#     pass

# class ItemResponse(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         orm_mode = True

# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

# List schemas
class ListBase(BaseModel):
    name: str  # The name of the list (e.g., Shopping List, Work List, etc.)

class ListCreate(ListBase):
    pass

class ListResponse(ListBase):
    id: int
    items: List["ItemResponse"] = []  # Include items in the list
    owner_id: int

    class Config:
        orm_mode = True

# Item schemas (updated)
class ItemBase(BaseModel):
    name: str
    completed: Optional[bool] = False

class ItemCreate(ItemBase):
    pass

class ItemUpdate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: int
    list_id: int  # Include the list ID
    owner_id: int

    class Config:
        orm_mode = True