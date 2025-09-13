import { useEffect, useRef, useState } from 'react'

interface UseOptimizedInViewOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useOptimizedInView({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  delay = 0
}: UseOptimizedInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (!ref.current || (triggerOnce && hasTriggered)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting
        
        if (isInView && !hasTriggered) {
          if (delay > 0) {
            setTimeout(() => {
              setInView(true)
              setHasTriggered(true)
            }, delay)
          } else {
            setInView(true)
            setHasTriggered(true)
          }
        } else if (!triggerOnce) {
          setInView(isInView)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered, delay])

  return { ref, inView }
}