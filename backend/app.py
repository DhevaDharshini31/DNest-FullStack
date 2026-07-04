from vton import run_tryon
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os
import uuid

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create folders if they don't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("outputs", exist_ok=True)
os.makedirs("models", exist_ok=True)


@app.get("/")
async def home():
    return {"message": "AI Backend Running"}


@app.post("/tryon")
async def tryon(
    person: UploadFile = File(...),
    cloth: UploadFile = File(...)
):
    # Unique filenames
    person_name = f"{uuid.uuid4()}_{person.filename}"
    cloth_name = f"{uuid.uuid4()}_{cloth.filename}"

    person_path = os.path.join("uploads", person_name)
    cloth_path = os.path.join("uploads", cloth_name)

    # Save uploaded person image
    with open(person_path, "wb") as buffer:
        shutil.copyfileobj(person.file, buffer)

    # Save uploaded cloth image
    with open(cloth_path, "wb") as buffer:
        shutil.copyfileobj(cloth.file, buffer)

    try:
        output_image = run_tryon(person_path, cloth_path)
        return FileResponse(output_image)

    except Exception as e:
        print("========== ERROR ==========")
        print(e)
        print("===========================")
        raise e