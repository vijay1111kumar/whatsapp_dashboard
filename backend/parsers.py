import os
import json
from pathlib import Path

LOANS_DIR = "../../whatsapp"

def parse_info_file():
    loans = []
    for loan_id in os.listdir(LOANS_DIR):
        info_path = Path(f"{LOANS_DIR}/{loan_id}/.info")
        if not info_path.exists():
            continue
        
        with open(info_path, "r") as f:
            data = dict(line.strip().split("=") for line in f.readlines())
        
        loans.append({
            "loan_id": loan_id,
            "total": int(data.get("total_messages", 0)),
            "success": int(data.get("success_messages", 0)),
            "fail": int(data.get("fail_messages", 0)),
            "last_sent_message": get_last_sent_message(loan_id)
        })
    return loans

def get_last_sent_message(loan_id):
    message_files = sorted(Path(f"{LOANS_DIR}/{loan_id}").glob("message_*.json"), key=os.path.getmtime)
    if not message_files:
        return None
    with open(message_files[-1], "r") as f:
        msg_data = json.load(f)
        return msg_data.get("msg", "")

def parse_message_files(loan_id):
    loan_path = Path(f"{LOANS_DIR}/{loan_id}")
    if not loan_path.exists():
        return []
    
    messages = []
    for msg_file in sorted(loan_path.glob("message_*.json"), key=os.path.getmtime):
        with open(msg_file, "r") as f:
            msg_data = json.load(f)
            messages.append({
                "phone_no": msg_data["to"],
                "message_name": msg_data.get("name", "Unknown"),
                "message_type": msg_data["type"],
                "timestamp": os.path.getmtime(msg_file),
                "status": "sent" if msg_data.get("status") == "sent" else "failed"
            })
    return messages
