from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cells-Kanban API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "service": "Cells-Kanban Backend"}

@app.get("/tasks")
def get_tasks():
    # Placeholder for fetching tasks from Supabase later
    return []
