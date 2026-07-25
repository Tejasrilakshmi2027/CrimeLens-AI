"""
Test dashboard API without authentication
"""
import requests
import json

try:
    response = requests.get("http://localhost:8000/api/dashboard/summary")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Dashboard API response: {json.dumps(data, indent=2)}")
    else:
        print(f"❌ Dashboard API failed: {response.status_code} - {response.text}")
except Exception as e:
    print(f"❌ Error: {e}")
