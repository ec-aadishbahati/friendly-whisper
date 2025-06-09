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
        },
        "thousandeyes_observability": {
            "api_latency_ms": 45,
            "ehr_api_availability": 99.8,
            "webex_voice_jitter": 2.1,
            "ai_inference_latency": 89,
            "network_path_visualization": "optimal"
        },
        "appdynamics_observability": {
            "application_health_score": 94,
            "ai_processing_time_ms": 156,
            "microservices_performance": 92,
            "database_response_time": 23,
            "transaction_trace_count": 1247
        },
        "securex_integration": {
            "threat_investigation_score": 98,
            "security_incidents_today": 0,
            "automated_response_actions": 3,
            "threat_intelligence_feeds": 12,
            "soc_integration_status": "active"
        },
        "identity_intelligence": {
            "continuous_risk_score": 85,
            "identity_posture_rating": "good",
            "anomalous_behavior_detected": 1,
            "risk_based_policies_active": 15,
            "identity_verification_confidence": 96
        },
        "cyber_vision": {
            "medical_device_risk_score": 78,
            "ot_network_visibility": 94,
            "device_vulnerability_count": 2,
            "asset_discovery_accuracy": 97,
            "industrial_protocol_monitoring": "active"
        },
        "ucs_edge_ai": {
            "ai_inference_latency_ms": 67,
            "edge_processing_load": 73,
            "model_accuracy_score": 94,
            "local_compute_utilization": 68,
            "edge_to_cloud_sync": "optimal"
        },
        "meraki_environmental": {
            "room_temperature_f": 72.4,
            "humidity_percent": 45,
            "air_quality_index": 89,
            "occupancy_count": 3,
            "environmental_alerts": 0
        },
        "meraki_computer_vision": {
            "fall_detection_confidence": 94,
            "hand_hygiene_compliance": 91,
            "ppe_compliance_rate": 87,
            "patient_movement_tracking": "stable",
            "cv_model_accuracy": 93
        },
        "compliance_reporting": {
            "hipaa_compliance_score": 98,
            "audit_readiness_status": "compliant",
            "policy_violations_today": 0,
            "automated_reports_generated": 5,
            "compliance_trend": "improving"
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

@app.get("/vision-analytics/{room_id}")
async def get_vision_analytics(room_id: str):
    return {
        "fall_detection": {
            "risk_level": "low",
            "confidence": 0.92,
            "last_incident": "None in past 24 hours",
            "camera_feeds": ["Camera-01", "Camera-02"]
        },
        "bed_exit_monitoring": {
            "status": "patient_in_bed",
            "alerts_today": 0,
            "last_movement": "2 hours ago"
        },
        "hand_hygiene_compliance": {
            "compliance_rate": 94,
            "violations_today": 2,
            "staff_compliance": [
                {"staff_id": "nurse_001", "compliance": 98},
                {"staff_id": "nurse_002", "compliance": 89}
            ]
        }
    }

@app.get("/nlp-analytics/{room_id}")
async def get_nlp_analytics(room_id: str):
    return {
        "clinical_documentation": {
            "auto_generated_notes": 12,
            "transcription_accuracy": 94,
            "time_saved_minutes": 45
        },
        "medication_screening": {
            "interactions_detected": 1,
            "alerts_generated": 3,
            "safety_score": 96
        },
        "voice_commands_processed": 28,
        "medical_terminology_accuracy": 91
    }

@app.get("/staff-analytics/{unit_id}")
async def get_staff_analytics(unit_id: str):
    return {
        "workload_prediction": {
            "current_capacity": 85,
            "predicted_demand": 92,
            "staffing_recommendation": "Add 1 nurse for evening shift",
            "efficiency_score": 78
        },
        "burnout_indicators": {
            "stress_level": "moderate",
            "workload_score": 7.2,
            "break_compliance": 78,
            "overtime_hours": 12
        },
        "skill_matching": {
            "optimal_assignments": 6,
            "efficiency_improvement": 15,
            "training_recommendations": ["ICU certification", "Pediatric care"]
        }
    }

@app.get("/family-portal/{patient_id}")
async def get_family_portal(patient_id: str):
    return {
        "family_contacts": [
            {
                "name": "Jennifer Johnson",
                "relationship": "Daughter",
                "phone": "+1-555-0123",
                "preferred_contact_method": "text",
                "update_frequency": "twice_daily"
            }
        ],
        "communication_log": [
            {
                "timestamp": "2024-01-15T14:30:00Z",
                "type": "automated_update",
                "content": "Patient vitals stable, responding well to treatment",
                "delivery_method": "SMS",
                "read_status": "delivered"
            }
        ],
        "emotional_analysis": {
            "family_sentiment": "concerned_but_optimistic",
            "key_concerns": ["recovery_timeline", "visiting_hours"],
            "recommended_communication_tone": "reassuring_with_details"
        },
        "scheduled_updates": [
            {"time": "08:00", "type": "morning_report"},
            {"time": "20:00", "type": "evening_summary"}
        ]
    }

@app.post("/send-family-update")
async def send_family_update(update_data: dict):
    return {
        "status": "sent",
        "delivery_confirmation": True,
        "delivery_time": "2024-01-15T15:45:00Z",
        "method": "SMS"
    }

if __name__ == "__main__":
    print("Starting Friendly Whisper Backend Server...")
    print("API Documentation: http://localhost:8000/docs")
    uvicorn.run("backend_server:app", host="0.0.0.0", port=8000, reload=True)
