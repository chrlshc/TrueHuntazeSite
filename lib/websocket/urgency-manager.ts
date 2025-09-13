import { EventEmitter } from 'events'

export interface UrgencyIndicator {
  id: string
  type: 'announcement' | 'update' | 'offer' | 'social_proof' | 'feature'
  message: string
  severity: 'info' | 'success' | 'warning' | 'important'
  data?: any
  timestamp: number
  expiresAt?: number
}

export interface WebSocketConfig {
  url: string
  reconnectInterval?: number
  maxReconnectAttempts?: number
  heartbeatInterval?: number
}

export class UrgencyWebSocketManager extends EventEmitter {
  private ws: WebSocket | null = null
  private config: Required<WebSocketConfig>
  private reconnectAttempts = 0
  private reconnectTimeout: NodeJS.Timeout | null = null
  private heartbeatInterval: NodeJS.Timeout | null = null
  private indicators: Map<string, UrgencyIndicator> = new Map()
  private connectionState: 'connecting' | 'connected' | 'disconnected' = 'disconnected'

  constructor(config: WebSocketConfig) {
    super()
    this.config = {
      url: config.url,
      reconnectInterval: config.reconnectInterval || 5000,
      maxReconnectAttempts: config.maxReconnectAttempts || 10,
      heartbeatInterval: config.heartbeatInterval || 30000
    }
  }

  connect(): void {
    if (this.connectionState === 'connecting' || this.connectionState === 'connected') {
      return
    }

    this.connectionState = 'connecting'
    
    try {
      this.ws = new WebSocket(this.config.url)
      this.setupEventHandlers()
    } catch (error) {
      console.error('WebSocket connection error:', error)
      this.scheduleReconnect()
    }
  }

  private setupEventHandlers(): void {
    if (!this.ws) return

    this.ws.onopen = () => {
      console.log('WebSocket connected')
      this.connectionState = 'connected'
      this.reconnectAttempts = 0
      this.emit('connected')
      this.startHeartbeat()
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.handleMessage(data)
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.emit('error', error)
    }

    this.ws.onclose = () => {
      console.log('WebSocket disconnected')
      this.connectionState = 'disconnected'
      this.stopHeartbeat()
      this.emit('disconnected')
      this.scheduleReconnect()
    }
  }

  private handleMessage(data: any): void {
    switch (data.type) {
      case 'urgency_update':
        this.handleUrgencyUpdate(data.indicator)
        break
      case 'urgency_remove':
        this.handleUrgencyRemove(data.id)
        break
      case 'batch_update':
        this.handleBatchUpdate(data.indicators)
        break
      case 'pong':
        // Heartbeat response
        break
      default:
        console.warn('Unknown message type:', data.type)
    }
  }

  private handleUrgencyUpdate(indicator: UrgencyIndicator): void {
    this.indicators.set(indicator.id, indicator)
    this.emit('urgency:update', indicator)
    
    // Auto-remove expired indicators
    if (indicator.expiresAt && indicator.expiresAt > Date.now()) {
      setTimeout(() => {
        this.handleUrgencyRemove(indicator.id)
      }, indicator.expiresAt - Date.now())
    }
  }

  private handleUrgencyRemove(id: string): void {
    const indicator = this.indicators.get(id)
    if (indicator) {
      this.indicators.delete(id)
      this.emit('urgency:remove', indicator)
    }
  }

  private handleBatchUpdate(indicators: UrgencyIndicator[]): void {
    indicators.forEach(indicator => this.handleUrgencyUpdate(indicator))
  }

  private startHeartbeat(): void {
    this.stopHeartbeat()
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, this.config.heartbeatInterval)
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      this.emit('max_reconnect_reached')
      return
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }

    const delay = Math.min(
      this.config.reconnectInterval * Math.pow(1.5, this.reconnectAttempts),
      30000 // Max 30 seconds
    )

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++
      console.log(`Attempting reconnection ${this.reconnectAttempts}/${this.config.maxReconnectAttempts}`)
      this.connect()
    }, delay)
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    this.stopHeartbeat()
    
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.connectionState = 'disconnected'
    this.indicators.clear()
  }

  getIndicators(): UrgencyIndicator[] {
    return Array.from(this.indicators.values())
      .filter(indicator => !indicator.expiresAt || indicator.expiresAt > Date.now())
      .sort((a, b) => {
        // Sort by severity then timestamp
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        const severityDiff = severityOrder[a.severity] - severityOrder[b.severity]
        return severityDiff || b.timestamp - a.timestamp
      })
  }

  getIndicatorsByType(type: UrgencyIndicator['type']): UrgencyIndicator[] {
    return this.getIndicators().filter(indicator => indicator.type === type)
  }

  sendMessage(message: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket not connected, message not sent:', message)
    }
  }

  isConnected(): boolean {
    return this.connectionState === 'connected'
  }
}

// Mock data generator for development
export function createMockUrgencyIndicator(): UrgencyIndicator {
  const types: UrgencyIndicator['type'][] = ['announcement', 'update', 'offer', 'social_proof', 'feature']
  const severities: UrgencyIndicator['severity'][] = ['info', 'success', 'warning', 'important']
  
  const type = types[Math.floor(Math.random() * types.length)]
  const severity = severities[Math.floor(Math.random() * severities.length)]
  
  const messages: Record<UrgencyIndicator['type'], string[]> = {
    announcement: [
      'Annual plan discount available for new customers',
      'Schedule a demo with our team this week',
      'Early access to new features now available'
    ],
    update: [
      'Current pricing available through end of month',
      'Lock in introductory rates with annual billing',
      'Grandfather pricing for early adopters'
    ],
    offer: [
      'Save 20% with annual billing',
      'Complimentary onboarding for Enterprise plans',
      'Extended trial available for qualified businesses'
    ],
    social_proof: [
      'Join leading creators using Huntaze',
      'Trusted by fast-growing businesses',
      'See how teams scale with our platform'
    ],
    feature: [
      'New: Advanced analytics dashboard',
      'Product update: Enhanced AI capabilities',
      'Case study: 300% ROI improvement'
    ]
  }
  
  const messageOptions = messages[type]
  const message = messageOptions[Math.floor(Math.random() * messageOptions.length)]
  
  return {
    id: `urgency-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    message,
    severity,
    timestamp: Date.now(),
    expiresAt: Date.now() + (Math.random() * 300000 + 60000), // 1-6 minutes
    data: {
      value: Math.floor(Math.random() * 100),
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }
  }
}