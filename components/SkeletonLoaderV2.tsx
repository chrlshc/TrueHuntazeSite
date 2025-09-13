'use client'

import React from 'react'

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'image' | 'avatar' | 'button'
  width?: string
  height?: string
  className?: string
  count?: number
  'aria-label'?: string
}

export default function SkeletonLoaderV2({ 
  variant = 'text', 
  width, 
  height,
  className = '',
  count = 1,
  'aria-label': ariaLabel = 'Loading content'
}: SkeletonLoaderProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return {
          width: width || '100%',
          height: height || '20px',
          borderRadius: 'var(--radius-100)',
        }
      case 'card':
        return {
          width: width || '100%',
          height: height || '200px',
          borderRadius: 'var(--radius-200)',
        }
      case 'image':
        return {
          width: width || '100%',
          height: height || '300px',
          borderRadius: 'var(--radius-200)',
        }
      case 'avatar':
        return {
          width: width || '48px',
          height: height || '48px',
          borderRadius: 'var(--radius-full)',
        }
      case 'button':
        return {
          width: width || '120px',
          height: height || '44px',
          borderRadius: 'var(--radius-200)',
        }
      default:
        return {
          width: width || '100%',
          height: height || '20px',
          borderRadius: 'var(--radius-100)',
        }
    }
  }

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton skeleton--${variant} ${className}`}
      style={getVariantStyles()}
      role="status"
      aria-busy="true"
      aria-label={i === 0 ? ariaLabel : undefined}
    >
      {i === 0 && <span className="sr-only">{ariaLabel}</span>}
    </div>
  ))

  return (
    <>
      {skeletons}
      <style jsx>{`
        .skeleton {
          position: relative;
          overflow: hidden;
          background-color: var(--color-bg-secondary);
          margin-bottom: ${count > 1 ? 'var(--space-300)' : '0'};
        }
        
        /* Only animate if motion is allowed */
        @media (prefers-reduced-motion: no-preference) {
          .skeleton::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent,
              var(--color-bg-primary),
              transparent
            );
            transform: translateX(-100%) translateZ(0);
            animation: shimmer 1.5s infinite;
            will-change: transform;
          }
        }
        
        @keyframes shimmer {
          to { 
            transform: translateX(100%) translateZ(0);
          }
        }
        
        /* Reduced motion - static background */
        @media (prefers-reduced-motion: reduce) {
          .skeleton {
            background-color: var(--color-bg-secondary);
          }
          
          .skeleton::after {
            display: none;
          }
        }
        
        /* Remove will-change when not animating */
        .skeleton:not(:hover)::after {
          will-change: auto;
        }
      `}</style>
    </>
  )
}

// Compound components for common patterns
export function SkeletonCardV2() {
  return (
    <div className="skeleton-card" role="article" aria-busy="true">
      <SkeletonLoaderV2 
        variant="image" 
        height="200px" 
        aria-label="Loading card image"
      />
      <div className="skeleton-card-body">
        <SkeletonLoaderV2 
          variant="text" 
          width="60%" 
          aria-label="Loading card title"
        />
        <SkeletonLoaderV2 
          variant="text" 
          count={3} 
          aria-label="Loading card content"
        />
        <SkeletonLoaderV2 
          variant="button" 
          aria-label="Loading card action"
        />
      </div>
      <style jsx>{`
        .skeleton-card {
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-200);
          overflow: hidden;
        }
        
        .skeleton-card-body {
          padding: var(--space-600);
        }
      `}</style>
    </div>
  )
}

export function SkeletonTableV2({ rows = 5 }: { rows?: number }) {
  return (
    <div 
      className="skeleton-table" 
      role="table" 
      aria-busy="true"
      aria-label="Loading table data"
    >
      <div className="skeleton-table-header" role="row">
        <SkeletonLoaderV2 
          variant="text" 
          height="16px" 
          aria-label="Loading table headers"
        />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skeleton-table-row" role="row">
          <SkeletonLoaderV2 
            variant="text" 
            height="16px" 
            aria-label={`Loading table row ${i + 1}`}
          />
        </div>
      ))}
      <style jsx>{`
        .skeleton-table {
          width: 100%;
          background: var(--color-surface-elevated);
          border-radius: var(--radius-200);
          overflow: hidden;
        }
        
        .skeleton-table-header {
          padding: var(--space-400);
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-secondary);
        }
        
        .skeleton-table-row {
          padding: var(--space-400);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .skeleton-table-row:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  )
}