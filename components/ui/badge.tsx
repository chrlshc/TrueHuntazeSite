'use client'

import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  // Base styles
  'inline-flex items-center font-medium transition-colors duration-200 whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'bg-[#5E6AD2] text-white',
        secondary: 'bg-[#252528] text-[#EEEFF1] border border-[#2D2D30]',
        success: 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30',
        warning: 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30',
        error: 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30',
        outline: 'text-[#9CA3AF] border border-[#2D2D30]',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-md',
        md: 'text-sm px-2.5 py-1 rounded-lg',
        lg: 'text-base px-3 py-1.5 rounded-lg',
      },
      interactive: {
        true: 'cursor-pointer hover:opacity-80',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, interactive, asChild = false, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(props.children as React.ReactElement, {
        className: cn(badgeVariants({ variant, size, interactive }), className),
        ref,
        ...props,
      })
    }

    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, interactive }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

// Badge with dot indicator
export const BadgeWithDot = React.forwardRef<
  HTMLDivElement,
  BadgeProps & { dotColor?: string }
>(({ children, dotColor = '#10B981', ...props }, ref) => (
  <Badge ref={ref} {...props}>
    <span
      className="w-1.5 h-1.5 rounded-full mr-1.5"
      style={{ backgroundColor: dotColor }}
    />
    {children}
  </Badge>
))

BadgeWithDot.displayName = 'BadgeWithDot'

// Badge with icon
export interface BadgeWithIconProps extends BadgeProps {
  icon: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const BadgeWithIcon = React.forwardRef<HTMLDivElement, BadgeWithIconProps>(
  ({ children, icon, iconPosition = 'left', ...props }, ref) => (
    <Badge ref={ref} {...props}>
      {iconPosition === 'left' && (
        <span className="mr-1.5 flex items-center">{icon}</span>
      )}
      {children}
      {iconPosition === 'right' && (
        <span className="ml-1.5 flex items-center">{icon}</span>
      )}
    </Badge>
  )
)

BadgeWithIcon.displayName = 'BadgeWithIcon'

// Export all badge components
export { BadgeWithDot, BadgeWithIcon }