# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

from collections import defaultdict
import os

from dotenv import load_dotenv, find_dotenv
from fastapi import Body, FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse, FileResponse
from app.controllers.dag import create_from_json, generate_python_file
import srsly
import uvicorn

from app.models import (
    DagStructure
)

# fix cors issue
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:5000",
]

app = FastAPI(
    title="api",
    version="1.0",
    description="Backend for DAG generator",

)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

example_request = srsly.read_json("app/data/example_request.json")


@app.get("/", include_in_schema=False)
def docs_redirect():
    return RedirectResponse(f"/docs")


@app.post("/generate-dag")
async def generate(structure: DagStructure):
    object = create_from_json(structure.structure)
    saved_file = generate_python_file(object)
    # send back the saved file as a file
    return FileResponse(saved_file, media_type='text/python')
