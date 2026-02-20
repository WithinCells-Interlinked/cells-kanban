from fastapi.middleware.gzip import GZipMiddleware
import time
import json
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Cells-Kanban API")

app.add_middleware(GZipMiddleware, minimum_size=1000)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

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

@app.get("/data")
def get_data():
    dashboard_path = "/home/pi/clawd/projects/status-dashboard/data.json"
    if not os.path.exists(dashboard_path):
        return {"projects": [], "tasks": [], "notifications": [], "history": []}
    
    with open(dashboard_path, "r") as f:
        data = json.load(f)
        return {
            "projects": data.get("projects", []),
            "tasks": data.get("tasks", []),
            "notifications": data.get("notifications", [
                {"id": 1, "message": "Neural Nexus Online", "type": "info"},
                {"id": 2, "message": "Autonomia em Nível Crítico (Execução)", "type": "alert"}
            ]),
            "history": data.get("history", [
                {"id": 1, "time": "00:50", "event": "Otimização de hardware concluída"},
                {"id": 2, "time": "00:55", "event": "Túnel Cloudflare estabilizado"}
            ])
        }


