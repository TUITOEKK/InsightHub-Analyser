import os
import requests
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN = os.getenv("FB_ACCESS_TOKEN")

def extract_post_id(url: str):
    # Simple version (you can improve later)
    return url.split("/")[-1]

def fetch_facebook_comments(link, filter_type):
    post_id = extract_post_id(link)

    graph_url = f"https://graph.facebook.com/v19.0/{post_id}/comments"
    params = {
        "access_token": ACCESS_TOKEN,
        "limit": 100
    }

    res = requests.get(graph_url, params=params)
    data = res.json()

    if "error" in data:
        return {"error": data["error"]["message"]}

    comments = [c["message"] for c in data.get("data", []) if "message" in c]

    return {
        "total_comments": len(comments),
        "sample": comments[:5],
        "filter": filter_type
    }
