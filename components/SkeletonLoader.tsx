'use client'

import React from 'react'

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'image' | 'avatar' | 'button'
  width?: string
  height?: string
  className?: string
  count?: number
}

export default function SkeletonLoader({ 
  variant = 'text', 
  width, 
  height,
  className = '',
  count = 1 
}: SkeletonLoaderProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return {
          width: width || '100%',
          height: height || '20px',
          borderRadius: '4px',
        }
      case 'card':
        return {
          width: width || '100%',
          height: height || '200px',
          borderRadius: '8px',
        }
      case 'image':
        return {
          width: width || '100%',
          height: height || '300px',
          borderRadius: '8px',
        }
      case 'avatar':
        return {
          width: width || '48px',
          height: height || '48px',
          borderRadius: '50%',
        }
      case 'button':
        return {
          width: width || '120px',
          height: height || '40px',
          borderRadius: '6px',
        }
      default:
        return {
          width: width || '100%',
          height: height || '20px',
          borderRadius: '4px',
        }
    }
  }

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton ${className}`}
      style={getVariantStyles()}
    >
      <span className="sr-only">Loading...</span>
    </div>
  ))

  return (
    <>
      {skeletons}
      <style jsx>{`
        .skeleton {
          position: relative;
          overflow: hidden;
          background-color: var(--bg-secondary);
          margin-bottom: ${count > 1 ? '12px' : '0'};
        }
        
        .skeleton::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 50%,
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .skeleton::after {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}

// Compound components for common patterns
export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <SkeletonLoader variant="image" height="200px" />
      <div className="skeleton-card-body">
        <SkeletonLoader variant="text" width="60%" />
        <SkeletonLoader variant="text" count={3} />
        <SkeletonLoader variant="button" />
      </div>
      <style jsx>{`
        .skeleton-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .skeleton-card-body {
          padding: 24px;
        }
      `}</style>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        <SkeletonLoader variant="text" height="16px" />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skeleton-table-row">
          <SkeletonLoader variant="text" height="16px" />
        </div>
      ))}
      <style jsx>{`
        .skeleton-table {
          width: 100%;
        }
        
        .skeleton-table-header {
          padding: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }
        
        .skeleton-table-row {
          padding: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  )
}