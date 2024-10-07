# # app/database.py
# import os
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from dotenv import load_dotenv

# load_dotenv()
# DATABASE_URL = os.getenv("DATABASE_URL")

# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL environment variable is not set.")

# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
# Base = declarative_base()

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
# app/database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Check for DATABASE_URL (local development) or AZURE_POSTGRESQL_CONNECTIONSTRING (Azure)
DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("AZURE_POSTGRESQL_CONNECTIONSTRING")

if not DATABASE_URL:
    raise ValueError("Database connection string environment variable is not set.")

# Azure's connection string may need adjustment
if "AZURE_POSTGRESQL_CONNECTIONSTRING" in os.environ:
    # Azure's connection strings often need ?sslmode=require appended for SQLAlchemy
    if "?sslmode=require" not in DATABASE_URL:
        DATABASE_URL += "?sslmode=require"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()