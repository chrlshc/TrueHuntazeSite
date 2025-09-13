'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { InView } from 'react-intersection-observer'

export default function SocialProof() {
  const [hasAnimated, setHasAnimated] = useState(false)
  
  return (
    <InView 
      onChange={(inView) => {
        if (inView && !hasAnimated) {
          setHasAnimated(true)
        }
      }}
      threshold={0.3}
    >
      {({ ref, inView }) => (
        <section 
          ref={ref}
          className="py-32 px-4 bg-gradient-to-r from-violet-900/20 to-purple-900/20 relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl mb-6 text-gray-300">
                Thousands of creators have collectively generated over
              </p>
              
              <div className="text-6xl md:text-8xl font-bold mb-4">
                {hasAnimated && (
                  <CountUp
                    start={0}
                    end={50000000}
                    duration={3}
                    prefix="$"
                    separator=","
                    className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400"
                  />
                )}
              </div>
              
              <p className="text-xl md:text-2xl text-gray-400">
                with Huntaze
              </p>

              {/* Additional stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-violet-400">
                    {hasAnimated && (
                      <CountUp
                        start={0}
                        end={15000}
                        duration={2.5}
                        separator=","
                        suffix="+"
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Active Creators</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-purple-400">
                    {hasAnimated && (
                      <CountUp
                        start={0}
                        end={312}
                        duration={2.5}
                        suffix="%"
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Avg. Growth</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-pink-400">
                    {hasAnimated && (
                      <CountUp
                        start={0}
                        end={24}
                        duration={2.5}
                        suffix="/7"
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">AI Response</div>
                </motion.div>
              </div>

              {/* Animated creator avatars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <div className="flex -space-x-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full border-2 border-black"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400 ml-4">
                  Join thousands of successful creators
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </InView>
  )
}