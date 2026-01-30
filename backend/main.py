from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .facebook import fetch_facebook_comments


app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/facebook")
async def analyze_facebook(data: dict):
    link = data.get("link")
    filter_type = data.get("filter")

    if not link:
        return {"error": "Facebook link required"}

    result = fetch_facebook_comments(link, filter_type)
    return result
