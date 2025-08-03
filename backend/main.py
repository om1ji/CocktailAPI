from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routes import router
from dotenv import load_dotenv
from os import getenv

load_dotenv()

app = FastAPI(title="Cocktail API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[x for x in getenv("ORIGINS").split(",")],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 