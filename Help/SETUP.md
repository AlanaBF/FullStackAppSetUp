# Full Stack Project Setup Guide

This document provides a step-by-step guide to create the structure and base for developing a full-stack application using FastAPI for the backend and React for the frontend.

## Steps to Build the Full Stack Application

### Backend with FastAPI

1. **Install FastAPI and Uvicorn**:

```bash
   pip install fastapi uvicorn
```

2. **Set Up FastAPI Routes**: Define your routes in main.py and any necessary submodules:

`main.py`

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str

@app.post("/items/")
async def create_item(item: Item):
    return item
```

3. **Run FastAPI**: Run your backend with:

```bash
uvicorn app.main:app --reload
```

FastAPI will be available at [http://localhost:8000](http://localhost:8000).

4. **CORS Configuration**: To allow your React frontend to communicate with FastAPI, configure CORS:

```python
# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Frontend Setup

1. Initialize a New Vite Project

```bash
# Navigate into the frontend directory
cd frontend
# Create a new Vite project
npm create vite@latest
```

- Proceed with the following options:
  - Project name: `testapp`
  - Framework: `React`
  - Variant: `TypeScript`

```bash
# Navigate into the new project folder
cd testapp
# Install dependencies
npm install
# Start the development server
npm run dev
```

> **Note:** Clear any unnecessary boilerplate code from the src folder to start fresh.

2. **Develop the Frontend**:

Create components and services to interact with the FastAPI backend.

3. **Run React**: To start the frontend, navigate to the `frontend/` folder and run:

```bash
npm run dev
```

This will serve your React app at [http://localhost:5173](http://localhost:5173), and your React app will be able to make requests to FastAPI at [http://localhost:8000](http://localhost:8000).

## Additional Notes

- Ensure the `requirements.txt` file in the backend contains all necessary dependencies (`fastapi`, `uvicorn`, etc.).
- If using a `.env` file for environment variables (e.g., `DATABASE_URL`, `SECRET_KEY`), make sure it is not pushed to version control.
- Redeploy the frontend and backend whenever you make significant changes to ensure everything is up-to-date.

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/)
