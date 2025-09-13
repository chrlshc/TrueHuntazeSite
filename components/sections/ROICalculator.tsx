'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Clock, Euro } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 5000,
    hoursPerWeek: 20,
    conversionRate: 2
  })

  const calculations = useMemo(() => {
    // Calculate potential savings and gains
    const hoursSavedPerWeek = inputs.hoursPerWeek * 0.75 // 75% time savings
    const hoursSavedPerMonth = hoursSavedPerWeek * 4
    const hourlyValue = inputs.monthlyRevenue / (inputs.hoursPerWeek * 4)
    const timeSavingsValue = hoursSavedPerMonth * hourlyValue
    
    // Calculate revenue increase from better conversion
    const currentConversions = inputs.monthlyRevenue * (inputs.conversionRate / 100)
    const improvedConversionRate = inputs.conversionRate * 1.5 // 50% improvement
    const newRevenue = inputs.monthlyRevenue * (improvedConversionRate / inputs.conversionRate)
    const revenueIncrease = newRevenue - inputs.monthlyRevenue
    
    // Total value and ROI
    const monthlyValue = timeSavingsValue + revenueIncrease
    const toolCost = 97 // Professional plan
    const monthlyROI = ((monthlyValue - toolCost) / toolCost) * 100
    const annualROI = monthlyROI * 12
    const paybackDays = toolCost / (monthlyValue / 30)
    
    return {
      hoursSavedPerWeek,
      timeSavingsValue,
      revenueIncrease,
      monthlyValue,
      monthlyROI,
      annualROI,
      paybackDays,
      newRevenue
    }
  }, [inputs])

  return (
    <section className="py-20">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-[#9CA3AF]">
              See how much time and revenue Huntaze can generate for your creator business
            </p>
          </div>

          <Card variant="elevated" className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-white mb-6">Your Current Situation</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-3">
                      <Euro className="w-4 h-4" />
                      Monthly Revenue
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="500"
                        value={inputs.monthlyRevenue}
                        onChange={(e) => setInputs({...inputs, monthlyRevenue: parseInt(e.target.value)})}
                        className="w-full h-2 bg-[#252528] rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="mt-2 text-2xl font-bold text-[#5E6AD2]">
                        €{inputs.monthlyRevenue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-3">
                      <Clock className="w-4 h-4" />
                      Hours per Week on Admin/Messages
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="5"
                        max="40"
                        value={inputs.hoursPerWeek}
                        onChange={(e) => setInputs({...inputs, hoursPerWeek: parseInt(e.target.value)})}
                        className="w-full h-2 bg-[#252528] rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="mt-2 text-2xl font-bold text-[#5E6AD2]">
                        {inputs.hoursPerWeek} hours
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-3">
                      <TrendingUp className="w-4 h-4" />
                      Current Conversion Rate
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0.5"
                        max="10"
                        step="0.5"
                        value={inputs.conversionRate}
                        onChange={(e) => setInputs({...inputs, conversionRate: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-[#252528] rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="mt-2 text-2xl font-bold text-[#5E6AD2]">
                        {inputs.conversionRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gradient-to-br from-[#5E6AD2]/10 to-[#5E6AD2]/5 rounded-2xl p-6 border border-[#5E6AD2]/20">
                <h3 className="text-xl font-semibold text-white mb-6">Your Potential with Huntaze</h3>
                
                {/* Main ROI Display */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-[#5E6AD2] mb-2">
                    {calculations.monthlyROI.toFixed(0)}%
                  </div>
                  <p className="text-[#9CA3AF]">Monthly ROI</p>
                </div>

                {/* Detailed Metrics */}
                <div className="space-y-4">
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#9CA3AF]">Time Saved per Week</span>
                      <span className="text-xl font-semibold text-white">
                        {calculations.hoursSavedPerWeek.toFixed(0)} hours
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#9CA3AF]">Projected Monthly Revenue</span>
                      <span className="text-xl font-semibold text-green-400">
                        €{calculations.newRevenue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#9CA3AF]">Monthly Value Generated</span>
                      <span className="text-xl font-semibold text-[#5E6AD2]">
                        €{calculations.monthlyValue.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#9CA3AF]">Payback Period</span>
                      <span className="text-xl font-semibold text-yellow-400">
                        {calculations.paybackDays.toFixed(0)} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Urgency indicator for high ROI */}
                {calculations.monthlyROI > 300 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <p className="text-sm text-green-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Exceptional ROI! Lock in current pricing before it increases</span>
                    </p>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-[#5E6AD2] text-white py-4 rounded-lg font-semibold hover:bg-[#4C5BC0] transition-colors duration-200"
                >
                  Start Your Free Trial
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #5E6AD2;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #4C5BC0;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #5E6AD2;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #4C5BC0;
        }
      `}</style>
    </section>
  )
}