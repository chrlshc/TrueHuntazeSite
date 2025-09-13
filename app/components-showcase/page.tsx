'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge, BadgeWithDot, BadgeWithIcon } from '@/components/ui/Badge'
import { ArrowRight, Check, AlertCircle, Zap, TrendingUp, Users } from 'lucide-react'

export default function ComponentsShowcase() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#EEEFF1] py-16">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16 animate-in">
          <Badge variant="secondary" className="mb-4">Professional Components</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Linear-Inspired Design System
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Enterprise-grade components with clean aesthetics and smooth animations
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Buttons</h2>
          <div className="grid gap-8">
            {/* Button Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different styles for various use cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Action</Button>
                </div>
              </CardContent>
            </Card>

            {/* Button Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Responsive sizing options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            {/* Button with Icons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons with Icons</CardTitle>
                <CardDescription>Enhanced visual communication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button icon={ArrowRight}>Continue</Button>
                  <Button icon={Check} variant="secondary">Confirm</Button>
                  <Button icon={ArrowRight} iconPosition="right">Next Step</Button>
                  <Button loading>Processing</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16 stagger-in">
          <h2 className="text-2xl font-semibold mb-8">Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="elevated" interactive>
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Default card with shadow and hover effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#9CA3AF]">
                  Professional appearance with subtle elevation and smooth interactions
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Learn More</Button>
              </CardFooter>
            </Card>

            <Card variant="filled">
              <CardHeader>
                <CardTitle>Filled Card</CardTitle>
                <CardDescription>Solid background variant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#5E6AD2]" />
                    <span className="text-sm">High performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#5E6AD2]" />
                    <span className="text-sm">Analytics included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>Minimal border style</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="success" className="mb-2">Active</Badge>
                <p className="text-[#9CA3AF]">
                  Clean design with emphasis on content
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Badges</h2>
          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
              <CardDescription>Status indicators and labels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Badges */}
                <div>
                  <h3 className="text-sm font-medium text-[#9CA3AF] mb-3">Basic Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                {/* Badges with Dots */}
                <div>
                  <h3 className="text-sm font-medium text-[#9CA3AF] mb-3">Status Indicators</h3>
                  <div className="flex flex-wrap gap-2">
                    <BadgeWithDot variant="secondary" dotColor="#10B981">Online</BadgeWithDot>
                    <BadgeWithDot variant="secondary" dotColor="#F59E0B">Away</BadgeWithDot>
                    <BadgeWithDot variant="secondary" dotColor="#EF4444">Busy</BadgeWithDot>
                  </div>
                </div>

                {/* Badges with Icons */}
                <div>
                  <h3 className="text-sm font-medium text-[#9CA3AF] mb-3">With Icons</h3>
                  <div className="flex flex-wrap gap-2">
                    <BadgeWithIcon 
                      icon={<Users className="w-3 h-3" />} 
                      variant="secondary"
                    >
                      15K Users
                    </BadgeWithIcon>
                    <BadgeWithIcon 
                      icon={<AlertCircle className="w-3 h-3" />} 
                      variant="warning"
                      iconPosition="left"
                    >
                      Requires Attention
                    </BadgeWithIcon>
                  </div>
                </div>

                {/* Interactive Badges */}
                <div>
                  <h3 className="text-sm font-medium text-[#9CA3AF] mb-3">Interactive</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge interactive variant="secondary">Clickable</Badge>
                    <Badge interactive variant="outline">Filter Tag</Badge>
                    <Badge interactive size="lg">Large Interactive</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Animations Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Animation Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Hover Lift</CardTitle>
                <CardDescription>Subtle elevation on hover</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#9CA3AF]">
                  Hover over this card to see the smooth lift animation
                </p>
              </CardContent>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Hover Glow</CardTitle>
                <CardDescription>Brand color glow effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#9CA3AF]">
                  Professional glow effect using brand colors
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Loading States */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>Skeleton screens and spinners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="skeleton h-4 w-3/4 rounded"></div>
                <div className="skeleton h-4 w-full rounded"></div>
                <div className="skeleton h-4 w-5/6 rounded"></div>
                <div className="flex items-center gap-4 mt-6">
                  <Button loading size="sm">Small Loading</Button>
                  <div className="animate-spin w-6 h-6 border-2 border-[#5E6AD2] border-t-transparent rounded-full"></div>
                  <div className="animate-pulse w-2 h-2 bg-[#5E6AD2] rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}