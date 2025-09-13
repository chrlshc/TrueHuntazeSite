'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { 
  Send, Bot, User, Sparkles, Zap, TrendingUp,
  Heart, MessageSquare, DollarSign, Clock
} from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: Date
  metrics?: {
    sentiment?: number
    intent?: string
    suggestedPrice?: number
  }
}

const sampleConversations = [
  {
    id: '1',
    title: 'New Fan Introduction',
    messages: [
      { sender: 'user', text: 'Hey! Just subscribed, love your content!' },
      { sender: 'ai', text: 'Welcome! So happy to have you here! What type of content are you most interested in?' }
    ]
  },
  {
    id: '2',
    title: 'Upsell Opportunity',
    messages: [
      { sender: 'user', text: 'Do you have any exclusive content?' },
      { sender: 'ai', text: 'Yes! I have premium photo sets and personalized videos. Would you like to see what\'s available?' }
    ]
  },
  {
    id: '3',
    title: 'Re-engagement',
    messages: [
      { sender: 'user', text: 'Haven\'t heard from you in a while' },
      { sender: 'ai', text: 'I\'ve missed chatting with you! I just posted some amazing new content you might love. Want a sneak peek?' }
    ]
  }
]

export default function AIDemo() {
  const [selectedConvo, setSelectedConvo] = useState(sampleConversations[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [metrics, setMetrics] = useState({
    responseTime: 0,
    sentiment: 0,
    conversionProbability: 0,
    suggestedAction: ''
  })

  useEffect(() => {
    // Simulate conversation flow
    const loadConversation = async () => {
      setMessages([])
      setIsTyping(false)
      
      for (let i = 0; i < selectedConvo.messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const msg = selectedConvo.messages[i]
        const newMessage: Message = {
          id: `${Date.now()}-${i}`,
          sender: msg.sender as 'user' | 'ai',
          text: msg.text,
          timestamp: new Date()
        }
        
        if (msg.sender === 'ai') {
          setIsTyping(true)
          await new Promise(resolve => setTimeout(resolve, 1500))
          setIsTyping(false)
          
          // Update metrics
          setMetrics({
            responseTime: Math.random() * 2 + 0.5,
            sentiment: Math.random() * 40 + 60,
            conversionProbability: Math.random() * 30 + 70,
            suggestedAction: 'Send personalized offer'
          })
        }
        
        setMessages(prev => [...prev, newMessage])
      }
    }
    
    loadConversation()
  }, [selectedConvo])

  return (
    <section className="py-24 relative">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">AI in Action</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See How Our AI Engages Fans
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Watch our AI handle real conversations with personalized responses that convert
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Conversation Selector */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Sample Scenarios</h3>
            {sampleConversations.map((convo) => (
              <Card
                key={convo.id}
                variant={selectedConvo.id === convo.id ? 'elevated' : 'outlined'}
                interactive
                className={`p-4 cursor-pointer transition-all ${
                  selectedConvo.id === convo.id ? 'border-[#5E6AD2]' : ''
                }`}
                onClick={() => setSelectedConvo(convo)}
              >
                <h4 className="font-medium text-white mb-2">{convo.title}</h4>
                <p className="text-sm text-[#9CA3AF] line-clamp-2">
                  {convo.messages[0].text}
                </p>
              </Card>
            ))}
          </div>

          {/* Chat Demo */}
          <div className="lg:col-span-2">
            <Card variant="elevated" className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-[#2D2D30] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#5E6AD2] to-[#4C5BC0] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">AI Assistant</h4>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Active Now
                    </p>
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  AI Powered
                </Badge>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${
                        message.sender === 'ai' ? '' : 'flex-row-reverse'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'ai' 
                            ? 'bg-[#5E6AD2]/20' 
                            : 'bg-[#252528]'
                        }`}>
                          {message.sender === 'ai' ? (
                            <Bot className="w-4 h-4 text-[#5E6AD2]" />
                          ) : (
                            <User className="w-4 h-4 text-[#9CA3AF]" />
                          )}
                        </div>
                        <div className={`px-4 py-3 rounded-2xl ${
                          message.sender === 'ai'
                            ? 'bg-[#252528] text-white'
                            : 'bg-[#5E6AD2] text-white'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[#9CA3AF]"
                  >
                    <Bot className="w-4 h-4" />
                    <span className="text-sm">AI is typing</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#5E6AD2] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#5E6AD2] rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-[#5E6AD2] rounded-full animate-bounce delay-200"></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Metrics Panel */}
              <div className="px-6 py-4 border-t border-[#2D2D30] bg-[#1A1A1B]/50">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-sm font-semibold">
                        {metrics.responseTime.toFixed(1)}s
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">Response Time</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                      <Heart className="w-3 h-3" />
                      <span className="text-sm font-semibold">
                        {metrics.sentiment.toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">Sentiment</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#5E6AD2] mb-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-sm font-semibold">
                        {metrics.conversionProbability.toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">Conversion</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                      <Sparkles className="w-3 h-3" />
                      <span className="text-sm font-semibold">High</span>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">AI Confidence</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Insights */}
            <Card variant="elevated" className="mt-6 p-6 bg-gradient-to-br from-[#5E6AD2]/10 to-[#5E6AD2]/5 border-[#5E6AD2]/20">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#5E6AD2] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-2">AI Analysis</h4>
                  <p className="text-sm text-[#9CA3AF] mb-3">
                    This conversation shows high purchase intent. The AI detected interest in exclusive content 
                    and responded with a soft upsell approach.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Suggested Action: {metrics.suggestedAction}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}