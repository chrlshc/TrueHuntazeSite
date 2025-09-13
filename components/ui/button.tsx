'use client'

import React from 'react'
import { Loader2, type LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-brand-primary',
  {
    variants: {
      variant: {
        primary: 'bg-[#5E6AD2] text-white hover:bg-[#4C5BC0] shadow-sm hover:shadow-md',
        secondary: 'bg-[#252528] text-[#EEEFF1] border border-[#2D2D30] hover:bg-[#2D2D30] hover:border-[#404040]',
        ghost: 'text-[#9CA3AF] hover:text-[#EEEFF1] hover:bg-[#252528]/50',
        danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] focus-visible:ring-[#EF4444]',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
        md: 'h-10 px-4 text-base rounded-lg gap-2',
        lg: 'h-12 px-6 text-lg rounded-lg gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false, 
    icon: Icon,
    iconPosition = 'left',
    children,
    disabled,
    asChild = false,
    ...props 
  }, ref) => {
    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18
    
    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(buttonVariants({ variant, size }), className),
        ref,
        ...props,
      })
    }
    
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && iconPosition === 'left' && (
          <Loader2 className="animate-spin" size={iconSize} />
        )}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon size={iconSize} />
        )}
        {children}
        {!loading && Icon && iconPosition === 'right' && (
          <Icon size={iconSize} />
        )}
        {loading && iconPosition === 'right' && (
          <Loader2 className="animate-spin" size={iconSize} />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'