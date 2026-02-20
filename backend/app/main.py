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

import json
import os

@app.get("/tasks")
def get_tasks():
    dashboard_path = "/home/pi/clawd/projects/status-dashboard/data.json"
    if not os.path.exists(dashboard_path):
        return []
    
    with open(dashboard_path, "r") as f:
        data = json.load(f)
        return data.get("tasks", [])

