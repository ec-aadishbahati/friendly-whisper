import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { MapPin, User, Clock, AlertTriangle, Wifi, Shield, Database, Headphones, Activity, Network, Zap, CheckCircle, Server, Router, Lock, Eye, Cloud, ArrowRight, Settings, Radio, Brain, TrendingUp, BarChart3, Target, Volume2, Cpu, Users } from 'lucide-react'
import './App.css'

interface PatientContext {
  room_id: string
  patient_name: string
  age: number
  conditions: string[]
  allergies: string[]
  recent_notes: string
  family_updates: string
  family_contacts: Array<{
    name: string
    relationship: string
    phone: string
    preferred_contact_method: string
    update_frequency: string
  }>
  communication_log: Array<{
    timestamp: string
    type: string
    content: string
    delivery_method: string
    read_status: string
  }>
  ai_summary: string
  risk_score: number
  predictive_alerts: Array<{
    type: string
    priority: string
    message: string
    confidence: number
  }>
  ai_recommendations: Array<{
    category: string
    action: string
    priority: string
    evidence: string
  }>
  sentiment_analysis: {
    family_communication_sentiment: string
    confidence: number
    key_concerns: string[]
  }
  vital_trends: Array<{
    metric: string
    trend: string
    current_value: string
    change: string
  }>
}

interface Room {
  id: string
  name: string
  unit: string
}



interface Room {
  id: string
  name: string
  unit: string
}

function App() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [patientContext, setPatientContext] = useState<PatientContext | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [staffId] = useState('nurse_001')
  const [networkFlow, setNetworkFlow] = useState<string[]>([])
  const [activeStep, setActiveStep] = useState(0)
  const [showTechnicalView, setShowTechnicalView] = useState(false)
  const [aiAnalytics, setAiAnalytics] = useState<any>(null)
  const [showAIFeatures, setShowAIFeatures] = useState(false)
  const [visionAnalytics, setVisionAnalytics] = useState<any>(null)
  const [nlpAnalytics, setNlpAnalytics] = useState<any>(null)
  const [staffAnalytics, setStaffAnalytics] = useState<any>(null)
  const [familyPortal, setFamilyPortal] = useState<any>(null)


  const API_BASE_URL = 'http://localhost:8000'

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`)
      const data = await response.json()
      setRooms(data.rooms)
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
    }
  }

  const simulateNetworkFlow = () => {
    const steps = [
      'DNA Spaces detects staff badge entering room',
      'ISE authenticates staff identity and permissions',
      'EHR system queried for patient medical records',
      'AI processes patient data and generates summary',
      'Webex Voice API delivers context to staff headset'
    ]
    
    setNetworkFlow([])
    setActiveStep(0)
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        setNetworkFlow(prev => [...prev, step])
        setActiveStep(index + 1)
      }, index * 800)
    })
  }

  const triggerContextWhisper = async () => {
    if (!selectedRoom) return

    setIsLoading(true)
    setShowTechnicalView(true)
    simulateNetworkFlow()
    
    try {
      const response = await fetch(`${API_BASE_URL}/trigger-context`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: selectedRoom,
          staff_id: staffId,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get patient context')
      }

      const context = await response.json()
      
      const analyticsResponse = await fetch(`${API_BASE_URL}/ai-analytics/${selectedRoom}`)
      const analytics = await analyticsResponse.json()
      setAiAnalytics(analytics)
      
      const visionResponse = await fetch(`${API_BASE_URL}/vision-analytics/${selectedRoom}`)
      const visionData = await visionResponse.json()
      setVisionAnalytics(visionData)
      
      const nlpResponse = await fetch(`${API_BASE_URL}/nlp-analytics/${selectedRoom}`)
      const nlpData = await nlpResponse.json()
      setNlpAnalytics(nlpData)
      
      const staffResponse = await fetch(`${API_BASE_URL}/staff-analytics/icu-unit`)
      const staffData = await staffResponse.json()
      setStaffAnalytics(staffData)
      
      const familyResponse = await fetch(`${API_BASE_URL}/family-portal/${selectedRoom}`)
      const familyData = await familyResponse.json()
      setFamilyPortal(familyData)
      
      setTimeout(() => {
        setPatientContext(context)
        setShowAIFeatures(true)
        playVoiceSummary(context.ai_summary)
      }, 4000)
      
    } catch (error) {
      console.error('Failed to trigger context:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 4000)
    }
  }

  const playVoiceSummary = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onend = () => {
        setIsPlaying(false)
      }
      
      speechSynthesis.speak(utterance)
    }
  }

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }



  const CiscoNetworkDiagram = () => (
    <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 p-6 rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-4 text-center">Cisco Network Infrastructure</h3>
      
      {/* Network Nodes */}
      <div className="grid grid-cols-3 gap-8 items-center">
        {/* DNA Spaces */}
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-500 ${
            activeStep >= 1 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'
          }`}>
            <Wifi className="w-8 h-8" />
          </div>
          <p className="text-sm font-medium">DNA Spaces</p>
          <p className="text-xs text-gray-300">Location Services</p>
        </div>

        {/* ISE */}
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-500 ${
            activeStep >= 2 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'
          }`}>
            <Shield className="w-8 h-8" />
          </div>
          <p className="text-sm font-medium">ISE</p>
          <p className="text-xs text-gray-300">Identity Services</p>
        </div>

        {/* Webex Voice */}
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center transition-all duration-500 ${
            activeStep >= 5 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'
          }`}>
            <Headphones className="w-8 h-8" />
          </div>
          <p className="text-sm font-medium">Webex Voice</p>
          <p className="text-xs text-gray-300">Audio Delivery</p>
        </div>
      </div>

      {/* Data Flow Lines */}
      <div className="mt-8 space-y-2">
        {networkFlow.map((step, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-green-300">{step}</span>
          </div>
        ))}
      </div>

      {/* EHR Integration */}
      <div className="absolute top-6 right-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
          activeStep >= 3 ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-gray-600'
        }`}>
          <Database className="w-6 h-6" />
        </div>
        <p className="text-xs text-center mt-1">EHR</p>
      </div>

      {/* AI Processing */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
          activeStep >= 4 ? 'bg-purple-500 shadow-lg shadow-purple-500/50' : 'bg-gray-600'
        }`}>
          <Zap className="w-6 h-6" />
        </div>
        <p className="text-xs text-center mt-1">AI Engine</p>
      </div>
    </div>
  )

  const DetailedNetworkTopology = () => (
    <div className="space-y-8">
      {/* Hospital Network Infrastructure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Hospital Network Topology
          </CardTitle>
          <CardDescription>Complete end-to-end Cisco infrastructure powering Friendly Whisper</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-lg">
            {/* Core Network Layer */}
            <div className="text-center mb-8">
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Core Network Layer</h4>
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                    <Server className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium">Catalyst 9600</p>
                  <p className="text-xs text-gray-600">Core Switch</p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                    <Router className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium">ISR 4000</p>
                  <p className="text-xs text-gray-600">Edge Router</p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                    <Cloud className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium">Meraki Cloud</p>
                  <p className="text-xs text-gray-600">Management</p>
                </div>
              </div>
            </div>

            {/* Access Layer */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-lg mb-4 text-gray-800 text-center">Access Layer - Patient Rooms</h4>
              <div className="grid grid-cols-4 gap-4">
                {['ICU', 'General Ward', 'Cardiac Unit', 'Respiratory'].map((unit) => (
                  <div key={unit} className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-2 mx-auto">
                        <Wifi className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium">{unit}</p>
                      <p className="text-xs text-gray-600">Catalyst 9130</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Radio className="w-3 h-3 text-blue-500" />
                        <span>Wi-Fi 6E</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Eye className="w-3 h-3 text-green-500" />
                        <span>RTLS Tracking</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Lock className="w-3 h-3 text-red-500" />
                        <span>802.1X Auth</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Real-Time Data Flow Architecture
          </CardTitle>
          <CardDescription>Step-by-step data processing through Cisco infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Step 1: Location Detection */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 mb-2">Location Detection & Triggering</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">DNA Spaces RTLS</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Wi-Fi triangulation</li>
                      <li>• Badge proximity detection</li>
                      <li>• Room entry/exit events</li>
                      <li>• Sub-meter accuracy</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Catalyst 9130 AP</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Wi-Fi 6E connectivity</li>
                      <li>• BLE beacon scanning</li>
                      <li>• RSSI measurements</li>
                      <li>• Real-time telemetry</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">API Integration</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• REST API calls</li>
                      <li>• WebSocket streams</li>
                      <li>• JSON data format</li>
                      <li>• Sub-second latency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Identity Verification */}
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-800 mb-2">Identity Verification & Authorization</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">ISE Policy Engine</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• 802.1X authentication</li>
                      <li>• Certificate validation</li>
                      <li>• Role-based access</li>
                      <li>• Dynamic authorization</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Active Directory</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• LDAP integration</li>
                      <li>• Group membership</li>
                      <li>• Permission matrix</li>
                      <li>• Audit logging</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Security Policies</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• HIPAA compliance</li>
                      <li>• Data classification</li>
                      <li>• Access controls</li>
                      <li>• Encryption in transit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: EHR Data Retrieval */}
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-800 mb-2">EHR Data Retrieval & Processing</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">FHIR API Gateway</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• HL7 FHIR R4 standard</li>
                      <li>• OAuth 2.0 security</li>
                      <li>• Rate limiting</li>
                      <li>• API versioning</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Data Sources</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Patient demographics</li>
                      <li>• Medical conditions</li>
                      <li>• Medication allergies</li>
                      <li>• Recent vitals</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Data Processing</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Real-time aggregation</li>
                      <li>• Data normalization</li>
                      <li>• Priority scoring</li>
                      <li>• Context filtering</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: AI Processing */}
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
              <div className="flex-1">
                <h4 className="font-semibold text-orange-800 mb-2">AI Context Generation</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Natural Language Processing</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Medical terminology</li>
                      <li>• Context summarization</li>
                      <li>• Priority ranking</li>
                      <li>• Voice optimization</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Machine Learning</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Pattern recognition</li>
                      <li>• Risk assessment</li>
                      <li>• Personalization</li>
                      <li>• Continuous learning</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Content Generation</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Concise summaries</li>
                      <li>• Critical alerts</li>
                      <li>• Family updates</li>
                      <li>• Action items</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Voice Delivery */}
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
              <div className="flex-1">
                <h4 className="font-semibold text-indigo-800 mb-2">Secure Voice Delivery</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Webex Voice API</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Text-to-speech engine</li>
                      <li>• Voice quality optimization</li>
                      <li>• Multi-language support</li>
                      <li>• Real-time streaming</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Audio Delivery</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Secure RTP streams</li>
                      <li>• Noise cancellation</li>
                      <li>• Volume adaptation</li>
                      <li>• Crystal clear whisper</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Device Integration</p>
                    <ul className="text-gray-600 text-xs mt-1 space-y-1">
                      <li>• Bluetooth headsets</li>
                      <li>• Badge speakers</li>
                      <li>• Mobile devices</li>
                      <li>• Hands-free operation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Technical Specifications & Performance
          </CardTitle>
          <CardDescription>Detailed technical requirements and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Network Requirements</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bandwidth per AP:</span>
                  <span className="font-medium">1 Gbps minimum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Latency (end-to-end):</span>
                  <span className="font-medium">&lt; 500ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location accuracy:</span>
                  <span className="font-medium">&lt; 1 meter</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Concurrent users:</span>
                  <span className="font-medium">500+ per site</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime requirement:</span>
                  <span className="font-medium">99.99%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Security & Compliance</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Encryption:</span>
                  <span className="font-medium">AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Authentication:</span>
                  <span className="font-medium">802.1X + Certificates</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">HIPAA compliance:</span>
                  <span className="font-medium">Full compliance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Audit logging:</span>
                  <span className="font-medium">Complete trail</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data retention:</span>
                  <span className="font-medium">7 years</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Friendly Whisper</h1>
          <p className="text-xl text-gray-600 mb-4">AI-powered Context Assistant for Healthcare Workers</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Staff ID: {staffId}</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              <span>Cisco Integrated Network</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="demo" className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
            <TabsTrigger value="architecture">Network Architecture</TabsTrigger>
            <TabsTrigger value="integration">Cisco Integration</TabsTrigger>
            <TabsTrigger value="ai-analytics">AI Analytics</TabsTrigger>
            <TabsTrigger value="family-portal">Family Portal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="demo" className="space-y-6">
            {/* Demo Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Trigger Simulation
                </CardTitle>
                <CardDescription>
                  Select a room and simulate entering to receive AI-generated patient context
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Select Room</label>
                    <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a room to enter..." />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={triggerContextWhisper}
                      disabled={!selectedRoom || isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? 'Processing...' : 'Enter Room'}
                    </Button>
                    {isPlaying && (
                      <Button 
                        onClick={stopVoice}
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50"
                      >
                        Stop Voice
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Network Flow */}
            {showTechnicalView && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Real-time Cisco Network Flow
                  </CardTitle>
                  <CardDescription>
                    Live visualization of data flow through Cisco infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CiscoNetworkDiagram />
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Processing Progress</span>
                      <span>{Math.round((activeStep / 5) * 100)}%</span>
                    </div>
                    <Progress value={(activeStep / 5) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Patient Context Display */}
            {patientContext && showAIFeatures && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Patient Context
                  </CardTitle>
                  <CardDescription>
                    AI-generated patient summary and context
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">{patientContext.patient_name}</h4>
                      <p className="text-blue-700 text-sm mb-2">{patientContext.ai_summary}</p>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <span className="text-xs text-blue-600 font-medium">Age:</span>
                          <span className="ml-2 text-blue-800">{patientContext.age} years</span>
                        </div>
                        <div>
                          <span className="text-xs text-blue-600 font-medium">Room:</span>
                          <span className="ml-2 text-blue-800">{patientContext.room_id}</span>
                        </div>
                      </div>
                      {patientContext.conditions && patientContext.conditions.length > 0 && (
                        <div className="mt-3">
                          <span className="text-xs text-blue-600 font-medium">Conditions:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {patientContext.conditions.map((condition, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {patientContext.allergies && patientContext.allergies.length > 0 && (
                        <div className="mt-3">
                          <span className="text-xs text-red-600 font-medium">Allergies:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {patientContext.allergies.map((allergy, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <DetailedNetworkTopology />
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cisco Technology Integration</CardTitle>
                <CardDescription>
                  How each Cisco solution contributes to the healthcare workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Location Detection</h4>
                      <p className="text-blue-700 text-sm">DNA Spaces uses Wi-Fi triangulation to detect when healthcare staff enter patient rooms, triggering the context delivery system.</p>
                      <div className="mt-2 text-xs text-blue-600">
                        <strong>Technical:</strong> Sub-meter accuracy, &lt;100ms detection latency, BLE + Wi-Fi 6E triangulation
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-green-900">Identity Verification</h4>
                      <p className="text-green-700 text-sm">ISE authenticates staff credentials and ensures only authorized personnel receive patient information based on their role and clearance level.</p>
                      <div className="mt-2 text-xs text-green-600">
                        <strong>Technical:</strong> 802.1X authentication, certificate-based PKI, role-based access policies
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-purple-900">Data Processing</h4>
                      <p className="text-purple-700 text-sm">AI engine processes EHR data, medical history, and real-time vitals to generate contextual patient summaries tailored for immediate care needs.</p>
                      <div className="mt-2 text-xs text-purple-600">
                        <strong>Technical:</strong> FHIR R4 APIs, HL7 integration, AES-256 encryption, HIPAA compliance
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-orange-900">Voice Delivery</h4>
                      <p className="text-orange-700 text-sm">Webex Voice API delivers the AI-generated summary directly to staff headsets using secure, low-latency audio transmission.</p>
                      <div className="mt-2 text-xs text-orange-600">
                        <strong>Technical:</strong> Secure RTP, G.722 codec, noise cancellation, &lt;200ms audio latency
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Business Impact</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medical error reduction:</span>
                        <span className="font-bold text-blue-600">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Patient handoff speed:</span>
                        <span className="font-bold text-green-600">60% faster</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staff efficiency gain:</span>
                        <span className="font-bold text-purple-600">40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROI within:</span>
                        <span className="font-bold text-orange-600">6 months</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Technical Performance</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">End-to-end latency:</span>
                        <span className="font-bold text-blue-600">&lt; 500ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">System availability:</span>
                        <span className="font-bold text-green-600">99.99%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Concurrent users:</span>
                        <span className="font-bold text-purple-600">500+ per site</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location accuracy:</span>
                        <span className="font-bold text-orange-600">&lt; 1 meter</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="ai-analytics" className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900">AI Analytics Dashboard</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced AI insights powering intelligent healthcare decisions through predictive analytics, 
              computer vision, and natural language processing.
            </p>
          </div>

          {aiAnalytics ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-500" />
                    Real-Time Risk Assessment
                  </CardTitle>
                  <CardDescription>
                    AI-powered patient risk analysis with predictive modeling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-700">{aiAnalytics.risk_assessment?.sepsis_risk || 0}%</div>
                      <div className="text-sm text-red-600">Sepsis Risk</div>
                      <Progress value={aiAnalytics.risk_assessment?.sepsis_risk || 0} className="mt-2 h-2" />
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-700">{aiAnalytics.risk_assessment?.fall_risk || 0}%</div>
                      <div className="text-sm text-orange-600">Fall Risk</div>
                      <Progress value={aiAnalytics.risk_assessment?.fall_risk || 0} className="mt-2 h-2" />
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-700">{aiAnalytics.risk_assessment?.deterioration_probability || 0}%</div>
                      <div className="text-sm text-yellow-600">Deterioration Risk</div>
                      <Progress value={aiAnalytics.risk_assessment?.deterioration_probability || 0} className="mt-2 h-2" />
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{aiAnalytics.risk_assessment?.early_warning_score || 0}</div>
                      <div className="text-sm text-blue-600">Early Warning Score</div>
                      <div className="mt-2 text-xs text-blue-500">0-20 scale</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Predictive Analytics
                  </CardTitle>
                  <CardDescription>
                    Machine learning predictions for care optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-green-900">Estimated Discharge</h4>
                      </div>
                      <div className="text-lg font-bold text-green-700">{aiAnalytics.predictive_insights?.estimated_discharge || 'N/A'}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-purple-900">Readmission Risk</h4>
                      </div>
                      <div className="text-lg font-bold text-purple-700">{aiAnalytics.predictive_insights?.readmission_risk || 0}%</div>
                      <Progress value={aiAnalytics.predictive_insights?.readmission_risk || 0} className="mt-2 h-2" />
                    </div>
                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-semibold text-indigo-900">Care Escalation</h4>
                      </div>
                      <div className="text-lg font-bold text-indigo-700">{aiAnalytics.predictive_insights?.care_escalation_probability || 0}%</div>
                      <Progress value={aiAnalytics.predictive_insights?.care_escalation_probability || 0} className="mt-2 h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-blue-500" />
                    Cisco Network Analytics
                  </CardTitle>
                  <CardDescription>
                    AI-powered network infrastructure insights and optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{aiAnalytics.cisco_network_analytics?.wifi_signal_strength || 0}%</div>
                      <div className="text-sm text-blue-600">Wi-Fi Signal Strength</div>
                      <Progress value={aiAnalytics.cisco_network_analytics?.wifi_signal_strength || 0} className="mt-2 h-2" />
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-700">{aiAnalytics.cisco_network_analytics?.staff_movement_patterns || 0}</div>
                      <div className="text-sm text-green-600">Staff Movement Events</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-purple-700">{aiAnalytics.cisco_network_analytics?.device_connectivity_score || 0}%</div>
                      <div className="text-sm text-purple-600">Device Connectivity</div>
                      <Progress value={aiAnalytics.cisco_network_analytics?.device_connectivity_score || 0} className="mt-2 h-2" />
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-700">{aiAnalytics.cisco_network_analytics?.network_latency_ms || 0}ms</div>
                      <div className="text-sm text-orange-600">Network Latency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-500" />
                      DNA Spaces Insights
                    </CardTitle>
                    <CardDescription>
                      Real-time location services and spatial analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                        <span className="text-indigo-900 font-medium">Location Accuracy</span>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-700 font-bold">{aiAnalytics.dna_spaces_insights?.location_accuracy || 0}%</span>
                          <Progress value={aiAnalytics.dna_spaces_insights?.location_accuracy || 0} className="w-20 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-yellow-900 font-medium">Staff Proximity Alerts</span>
                        <span className="text-yellow-700 font-bold">{aiAnalytics.dna_spaces_insights?.staff_proximity_alerts || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-900 font-medium">Room Occupancy Optimization</span>
                        <div className="flex items-center gap-2">
                          <span className="text-green-700 font-bold">{aiAnalytics.dna_spaces_insights?.room_occupancy_optimization || 0}%</span>
                          <Progress value={aiAnalytics.dna_spaces_insights?.room_occupancy_optimization || 0} className="w-20 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-red-900 font-medium">Contact Tracing Events</span>
                        <span className="text-red-700 font-bold">{aiAnalytics.dna_spaces_insights?.contact_tracing_events || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-500" />
                      ISE Security Metrics
                    </CardTitle>
                    <CardDescription>
                      Identity services and network security analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-900 font-medium">Device Authentication Rate</span>
                        <div className="flex items-center gap-2">
                          <span className="text-green-700 font-bold">{aiAnalytics.ise_security_metrics?.device_authentication_rate || 0}%</span>
                          <Progress value={aiAnalytics.ise_security_metrics?.device_authentication_rate || 0} className="w-20 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-900 font-medium">Policy Compliance Score</span>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-700 font-bold">{aiAnalytics.ise_security_metrics?.policy_compliance_score || 0}%</span>
                          <Progress value={aiAnalytics.ise_security_metrics?.policy_compliance_score || 0} className="w-20 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-orange-900 font-medium">Threat Detection Events</span>
                        <span className="text-orange-700 font-bold">{aiAnalytics.ise_security_metrics?.threat_detection_events || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-red-900 font-medium">Access Control Violations</span>
                        <span className="text-red-700 font-bold">{aiAnalytics.ise_security_metrics?.access_control_violations || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-purple-500" />
                      Webex Voice Analytics
                    </CardTitle>
                    <CardDescription>
                      AI-powered voice delivery and audio quality metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-purple-900 font-medium">Voice Clarity Score</span>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-700 font-bold">{aiAnalytics.webex_voice_analytics?.voice_clarity_score || 0}%</span>
                          <Progress value={aiAnalytics.webex_voice_analytics?.voice_clarity_score || 0} className="w-20 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-900 font-medium">Audio Delivery Latency</span>
                        <span className="text-blue-700 font-bold">{aiAnalytics.webex_voice_analytics?.audio_delivery_latency || 0}ms</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-900 font-medium">Noise Cancellation</span>
                        <div className="flex items-center gap-2">
                          <span className="text-green-700 font-bold">{aiAnalytics.webex_voice_analytics?.noise_cancellation_effectiveness || 0}%</span>
                          <Progress value={aiAnalytics.webex_voice_analytics?.noise_cancellation_effectiveness || 0} className="w-20 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                        <span className="text-indigo-900 font-medium">Whisper Mode Accuracy</span>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-700 font-bold">{aiAnalytics.webex_voice_analytics?.whisper_mode_accuracy || 0}%</span>
                          <Progress value={aiAnalytics.webex_voice_analytics?.whisper_mode_accuracy || 0} className="w-20 h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-teal-500" />
                      IoT Sensor Fusion
                    </CardTitle>
                    <CardDescription>
                      Connected medical device analytics and optimization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                        <span className="text-teal-900 font-medium">Connected Medical Devices</span>
                        <span className="text-teal-700 font-bold">{aiAnalytics.iot_sensor_fusion?.connected_medical_devices || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-900 font-medium">Sensor Data Quality</span>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-700 font-bold">{aiAnalytics.iot_sensor_fusion?.sensor_data_quality || 0}%</span>
                          <Progress value={aiAnalytics.iot_sensor_fusion?.sensor_data_quality || 0} className="w-20 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-orange-900 font-medium">Predictive Maintenance</span>
                        <span className="text-orange-700 font-bold">{aiAnalytics.iot_sensor_fusion?.predictive_maintenance_alerts || 0} alerts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-900 font-medium">Bandwidth Optimization</span>
                        <div className="flex items-center gap-2">
                          <span className="text-green-700 font-bold">{aiAnalytics.iot_sensor_fusion?.bandwidth_optimization || 0}%</span>
                          <Progress value={aiAnalytics.iot_sensor_fusion?.bandwidth_optimization || 0} className="w-20 h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    Machine Learning Performance
                  </CardTitle>
                  <CardDescription>
                    AI model confidence, accuracy, and training statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-800">{aiAnalytics.ml_insights?.model_confidence || 0}%</div>
                      <div className="text-sm text-gray-600">Model Confidence</div>
                      <Progress value={aiAnalytics.ml_insights?.model_confidence || 0} className="mt-2 h-2" />
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-700">{aiAnalytics.ml_insights?.prediction_accuracy || 0}%</div>
                      <div className="text-sm text-green-600">Prediction Accuracy</div>
                      <Progress value={aiAnalytics.ml_insights?.prediction_accuracy || 0} className="mt-2 h-2" />
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{aiAnalytics.ml_insights?.training_data_size || 'N/A'}</div>
                      <div className="text-sm text-blue-600">Training Records</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-purple-700">{aiAnalytics.ml_insights?.last_model_update || 'N/A'}</div>
                      <div className="text-sm text-purple-600">Last Update</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {visionAnalytics && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-500" />
                      Computer Vision & Safety Monitoring
                    </CardTitle>
                    <CardDescription>
                      Real-time patient safety monitoring through AI-powered video analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Fall Detection</h4>
                        </div>
                        <div className="text-lg font-bold text-blue-700">{visionAnalytics?.fall_detection?.risk_level || 'Low'}</div>
                        <div className="text-sm text-blue-600">Confidence: {Math.round((visionAnalytics?.fall_detection?.confidence || 0) * 100)}%</div>
                        <div className="text-xs text-blue-500 mt-1">{visionAnalytics?.fall_detection?.last_incident || 'No recent incidents'}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Bed Exit Monitoring</h4>
                        </div>
                        <div className="text-lg font-bold text-green-700">{visionAnalytics?.bed_exit_monitoring?.status || 'Safe'}</div>
                        <div className="text-sm text-green-600">Alerts Today: {visionAnalytics?.bed_exit_monitoring?.alerts_today || 0}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">Hand Hygiene</h4>
                        </div>
                        <div className="text-lg font-bold text-purple-700">{visionAnalytics?.hand_hygiene_compliance?.compliance_rate || 0}%</div>
                        <Progress value={visionAnalytics?.hand_hygiene_compliance?.compliance_rate || 0} className="mt-2 h-2" />
                        <div className="text-xs text-purple-500 mt-1">Violations: {visionAnalytics?.hand_hygiene_compliance?.violations_today || 0}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {nlpAnalytics && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-500" />
                      Advanced Natural Language Processing
                    </CardTitle>
                    <CardDescription>
                      AI-powered clinical documentation and medication safety screening
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Clinical Documentation</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                            <span className="text-indigo-900 font-medium">Auto-Generated Notes</span>
                            <span className="text-indigo-700 font-bold">{nlpAnalytics?.clinical_documentation?.auto_generated_notes || 0}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-green-900 font-medium">Time Saved</span>
                            <span className="text-green-700 font-bold">{nlpAnalytics?.clinical_documentation?.time_saved_minutes || 0} min</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="text-blue-900 font-medium">Transcription Accuracy</span>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-700 font-bold">{nlpAnalytics?.clinical_documentation?.transcription_accuracy || 0}%</span>
                              <Progress value={nlpAnalytics?.clinical_documentation?.transcription_accuracy || 0} className="w-20 h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Medication Safety</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span className="text-red-900 font-medium">Interactions Detected</span>
                            <span className="text-red-700 font-bold">{nlpAnalytics?.medication_screening?.interactions_detected || 0}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <span className="text-orange-900 font-medium">Safety Alerts</span>
                            <span className="text-orange-700 font-bold">{nlpAnalytics?.medication_screening?.alerts_generated || 0}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <span className="text-green-900 font-medium">Safety Score</span>
                            <div className="flex items-center gap-2">
                              <span className="text-green-700 font-bold">{nlpAnalytics?.medication_screening?.safety_score || 0}%</span>
                              <Progress value={nlpAnalytics?.medication_screening?.safety_score || 0} className="w-20 h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {staffAnalytics && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-teal-500" />
                      Staff Optimization & Workflow Intelligence
                    </CardTitle>
                    <CardDescription>
                      AI-driven workforce analytics and burnout prevention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-5 h-5 text-teal-600" />
                          <h4 className="font-semibold text-teal-900">Workload Prediction</h4>
                        </div>
                        <div className="text-lg font-bold text-teal-700">{staffAnalytics?.workload_prediction?.current_capacity || 0}%</div>
                        <div className="text-sm text-teal-600">Current Capacity</div>
                        <div className="text-xs text-teal-500 mt-1">{staffAnalytics?.workload_prediction?.staffing_recommendation || 'Optimal staffing'}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          <h4 className="font-semibold text-orange-900">Burnout Risk</h4>
                        </div>
                        <div className="text-lg font-bold text-orange-700">{staffAnalytics?.burnout_indicators?.stress_level || 'Low'}</div>
                        <div className="text-sm text-orange-600">Stress Level</div>
                        <div className="text-xs text-orange-500 mt-1">Break Compliance: {staffAnalytics?.burnout_indicators?.break_compliance || 0}%</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">Skill Matching</h4>
                        </div>
                        <div className="text-lg font-bold text-purple-700">{staffAnalytics?.skill_matching?.optimal_assignments || 0}</div>
                        <div className="text-sm text-purple-600">Optimal Assignments</div>
                        <div className="text-xs text-purple-500 mt-1">Efficiency: +{staffAnalytics?.skill_matching?.efficiency_improvement || 0}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">AI Analytics Ready</h3>
                <p className="text-gray-500 mb-4">
                  Select a room and trigger context whisper to view comprehensive AI analytics
                </p>
                <Badge variant="outline" className="text-sm">
                  Advanced AI features will appear here after room selection
                </Badge>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="family-portal" className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Family Communication Portal</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Automated family updates and secure communication through Cisco Webex Voice integration
            </p>
          </div>

          {familyPortal ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    Family Contacts & Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {familyPortal.family_contacts?.map((contact: any, index: number) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-blue-900">{contact.name}</h4>
                            <p className="text-blue-700 text-sm">{contact.relationship}</p>
                            <p className="text-blue-600 text-xs">{contact.phone}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs border border-blue-300 bg-blue-100 text-blue-800 px-2 py-1 rounded">{contact.preferred_contact_method}</div>
                            <p className="text-blue-500 text-xs mt-1">{contact.update_frequency}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-green-500" />
                    Communication Log & Automated Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {familyPortal.communication_log?.map((log: any, index: number) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-green-900 text-sm">{log.content}</p>
                            <p className="text-green-600 text-xs mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs border border-gray-300 bg-gray-100 text-gray-800 px-2 py-1 rounded">{log.delivery_method}</div>
                            <p className="text-green-500 text-xs mt-1">{log.read_status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    Emotional Analysis & Communication Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Family Sentiment</h4>
                      <p className="text-purple-700 capitalize">{familyPortal.emotional_analysis?.family_sentiment || 'Neutral'}</p>
                      <p className="text-purple-600 text-sm mt-1">Recommended tone: {familyPortal.emotional_analysis?.recommended_communication_tone || 'Professional'}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-900 mb-2">Key Concerns</h4>
                      <div className="flex flex-wrap gap-1">
                        {familyPortal.emotional_analysis?.key_concerns?.map((concern: string, index: number) => (
                          <div key={index} className="text-xs border border-indigo-300 bg-indigo-100 text-indigo-800 px-2 py-1 rounded">{concern}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Family Portal Ready</h3>
                <p className="text-gray-500 mb-4">
                  Select a room and trigger context to view family communication features
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  </div>
  )
}

export default App
