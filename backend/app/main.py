# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import users, items, auth, lists

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "https://full-stack-app-set-up.vercel.app/",  # Replace with your Vercel frontend URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)
app.include_router(items.router)
app.include_router(auth.router)
app.include_router(lists.router) 
