#!/usr/bin/env python3
"""
Mock backend server for Friendly Whisper AI Analytics
Provides the API endpoints expected by the frontend application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from typing import Dict, Any

app = FastAPI(title="Friendly Whisper Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROOMS_DATA = {
    "rooms": [
        {"id": "room-101", "name": "Room 101 - ICU", "type": "ICU"},
        {"id": "room-102", "name": "Room 102 - General", "type": "General"},
        {"id": "room-201", "name": "Room 201 - Emergency", "type": "Emergency"},
        {"id": "room-301", "name": "Room 301 - Surgery", "type": "Surgery"}
    ]
}

PATIENT_CONTEXT = {
    "room_id": "room-101",
    "patient_name": "Sarah Johnson",
    "age": 67,
    "conditions": ["Acute Myocardial Infarction", "Hypertension", "Type 2 Diabetes"],
    "allergies": ["Penicillin", "Shellfish"],
    "recent_notes": "Patient responded well to cardiac intervention. Vitals stable but requires continued monitoring. Family has been notified of condition.",
    "family_updates": "Daughter called at 2:30 PM. Updated on current status and treatment plan. Requesting to visit during evening hours.",
    "ai_summary": "67-year-old female with acute MI, currently stable post-intervention. Risk factors include diabetes and hypertension. Recommend continued cardiac monitoring and medication compliance.",
    "risk_score": 7.2,
    "predictive_alerts": [
        {
            "type": "medication",
            "message": "Due for cardiac medication in 30 minutes",
            "priority": "high",
            "timestamp": "2024-01-15T14:30:00Z"
        },
        {
            "type": "vitals",
            "message": "Blood pressure trending upward",
            "priority": "medium",
            "timestamp": "2024-01-15T14:15:00Z"
        }
    ]
}

def get_ai_analytics_data(room_id: str) -> Dict[str, Any]:
    return {
        "room_id": room_id,
        "risk_assessment": {
            "sepsis_risk": 23,
            "fall_risk": 45,
            "deterioration_probability": 18,
            "early_warning_score": 7
        },
        "predictive_insights": {
            "estimated_discharge": "3-4 days",
            "readmission_risk": 15,
            "care_escalation_probability": 12
        },
        "cisco_network_analytics": {
            "wifi_signal_strength": 87,
            "staff_movement_patterns": 24,
            "device_connectivity_score": 94,
            "network_latency_ms": 12
        },
        "dna_spaces_insights": {
            "location_accuracy": 96,
            "staff_proximity_alerts": 3,
            "room_occupancy_optimization": 78,
            "contact_tracing_events": 7
        },
        "ise_security_metrics": {
            "device_authentication_rate": 99,
            "policy_compliance_score": 92,
            "threat_detection_events": 0,
            "access_control_violations": 1
        },
        "webex_voice_analytics": {
            "voice_clarity_score": 89,
            "audio_delivery_latency": 45,
            "noise_cancellation_effectiveness": 84,
            "whisper_mode_accuracy": 91
        },
        "iot_sensor_fusion": {
            "connected_medical_devices": 12,
            "sensor_data_quality": 95,
            "predictive_maintenance_alerts": 2,
            "bandwidth_optimization": 88
        }
    }

@app.get("/")
async def root():
    return {"message": "Friendly Whisper Backend API", "status": "running"}

@app.get("/rooms")
async def get_rooms():
    return ROOMS_DATA

@app.post("/trigger-context")
async def trigger_context(request: dict):
    return PATIENT_CONTEXT

@app.get("/ai-analytics/{room_id}")
async def get_ai_analytics(room_id: str):
    return get_ai_analytics_data(room_id)

if __name__ == "__main__":
    print("Starting Friendly Whisper Backend Server...")
    print("API Documentation: http://localhost:8000/docs")
    uvicorn.run("backend_server:app", host="0.0.0.0", port=8000, reload=True)
