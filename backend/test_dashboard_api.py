"""
Test dashboard API with authentication
"""
import requests
import json

# First login to get token
login_data = {
    "username": "officer1",
    "password": "password123"
}

try:
    response = requests.post("http://localhost:8000/api/login", json=login_data)
    if response.status_code == 200:
        token = response.json()["access_token"]
        print(f"✅ Login successful, token: {token[:20]}...")
        
        # Now test dashboard summary with token
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get("http://localhost:8000/api/dashboard/summary", headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Dashboard summary: {json.dumps(data, indent=2)}")
        else:
            print(f"❌ Dashboard API failed: {response.status_code} - {response.text}")
    else:
        print(f"❌ Login failed: {response.status_code} - {response.text}")
except Exception as e:
    print(f"❌ Error: {e}")
