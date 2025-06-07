# Friendly Whisper Backend Server

This backend server provides the API endpoints required for the AI analytics functionality in the Friendly Whisper healthcare application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the server:
```bash
python backend_server.py
```

The server will start on `http://localhost:8000` with automatic reload enabled.

## API Endpoints

- `GET /` - Health check
- `GET /rooms` - Get list of hospital rooms
- `POST /trigger-context` - Get patient context data
- `GET /ai-analytics/{room_id}` - Get AI analytics data for a specific room

## API Documentation

Once the server is running, visit `http://localhost:8000/docs` for interactive API documentation.

## Usage with Frontend

1. Start the backend server: `python backend_server.py`
2. Start the frontend: `npm run dev`
3. Navigate to `http://localhost:5174/friendly-whisper-cisco/`
4. Select a room and click "Enter Room" to trigger the AI analytics

The AI Analytics tab will now display real-time data including:
- Risk Assessment (sepsis, fall risk, deterioration probability)
- Predictive Insights (discharge estimates, readmission risk)
- Cisco Network Analytics (WiFi strength, device connectivity)
- DNA Spaces Insights (location accuracy, staff proximity)
- ISE Security Metrics (authentication rates, policy compliance)
- Webex Voice Analytics (clarity, latency, noise cancellation)
- IoT Sensor Fusion (connected devices, data quality)
