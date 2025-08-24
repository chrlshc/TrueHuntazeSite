import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(cents: number | bigint, currency = 'USD'): string {
  const amount = typeof cents === 'bigint' ? Number(cents) : cents;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function getTierColor(tier: string): string {
  const colors = {
    VIP: 'text-purple-600 bg-purple-100',
    PREMIUM: 'text-yellow-600 bg-yellow-100',
    ACTIVE: 'text-blue-600 bg-blue-100',
    BASIC: 'text-gray-600 bg-gray-100',
  };
  return colors[tier as keyof typeof colors] || colors.BASIC;
}

export function getEngagementScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
}