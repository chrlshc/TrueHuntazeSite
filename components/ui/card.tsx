'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  // Base styles
  'rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        elevated: 'bg-[#1A1A1B] border border-[#2D2D30] hover:border-[#404040] shadow-lg hover:shadow-xl',
        filled: 'bg-[#252528] hover:bg-[#2D2D30]',
        outlined: 'bg-transparent border-2 border-[#2D2D30] hover:border-[#5E6AD2]',
        ghost: 'bg-transparent hover:bg-[#252528]/30',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:transform hover:-translate-y-0.5',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      size: 'md',
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, asChild = false, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(props.children as React.ReactElement, {
        className: cn(cardVariants({ variant, size, interactive }), className),
        ref,
        ...props,
      })
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, interactive }), className)}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

// Card subcomponents
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-semibold text-[#EEEFF1]', className)}
    {...props}
  />
))

CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[#9CA3AF]', className)}
    {...props}
  />
))

CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
))

CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-0', className)}
    {...props}
  />
))

CardFooter.displayName = 'CardFooter'