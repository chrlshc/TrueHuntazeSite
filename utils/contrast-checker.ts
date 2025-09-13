/**
 * WCAG Contrast Ratio Checker
 * Ensures text meets accessibility standards
 */

// Convert LCH to RGB
function lchToRgb(l: number, c: number, h: number): [number, number, number] {
  // Convert LCH to Lab
  const a = c * Math.cos(h * Math.PI / 180);
  const b = c * Math.sin(h * Math.PI / 180);
  
  // Convert Lab to XYZ
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  
  const x = 0.95047 * ((fx ** 3 > 0.008856) ? fx ** 3 : (fx - 16/116) / 7.787);
  const y = 1.00000 * ((fy ** 3 > 0.008856) ? fy ** 3 : (fy - 16/116) / 7.787);
  const z = 1.08883 * ((fz ** 3 > 0.008856) ? fz ** 3 : (fz - 16/116) / 7.787);
  
  // Convert XYZ to RGB
  let r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  let b = x *  0.0557 + y * -0.2040 + z *  1.0570;
  
  // Apply gamma correction
  r = r > 0.0031308 ? 1.055 * (r ** (1/2.4)) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * (g ** (1/2.4)) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * (b ** (1/2.4)) - 0.055 : 12.92 * b;
  
  return [
    Math.max(0, Math.min(255, Math.round(r * 255))),
    Math.max(0, Math.min(255, Math.round(g * 255))),
    Math.max(0, Math.min(255, Math.round(b * 255)))
  ];
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(
  color1: { l: number; c: number; h: number },
  color2: { l: number; c: number; h: number }
): number {
  const [r1, g1, b1] = lchToRgb(color1.l, color1.c, color1.h);
  const [r2, g2, b2] = lchToRgb(color2.l, color2.c, color2.h);
  
  const lum1 = getLuminance(r1, g1, b1);
  const lum2 = getLuminance(r2, g2, b2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if contrast meets WCAG standards
export function meetsWCAG(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  largeText: boolean = false
): boolean {
  if (level === 'AA') {
    return largeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return largeText ? ratio >= 4.5 : ratio >= 7;
  }
}

// Get WCAG rating for a contrast ratio
export function getWCAGRating(ratio: number): {
  normalText: { AA: boolean; AAA: boolean };
  largeText: { AA: boolean; AAA: boolean };
} {
  return {
    normalText: {
      AA: ratio >= 4.5,
      AAA: ratio >= 7
    },
    largeText: {
      AA: ratio >= 3,
      AAA: ratio >= 4.5
    }
  };
}

// Test Linear design system contrast ratios
export function testLinearContrasts() {
  const colors = {
    // Light mode
    bgPrimary: { l: 98, c: 0, h: 0 },
    bgSecondary: { l: 93, c: 0, h: 0 },
    textPrimary: { l: 20, c: 0, h: 0 },
    textSecondary: { l: 40, c: 0, h: 0 },
    textTertiary: { l: 60, c: 0, h: 0 },
    accent: { l: 60, c: 85, h: 252 },
    
    // Dark mode
    darkBg: { l: 10, c: 0, h: 0 },
    darkTextPrimary: { l: 90, c: 0, h: 0 },
    darkTextSecondary: { l: 70, c: 0, h: 0 },
  };
  
  const tests = [
    // Light mode tests
    { name: 'Primary text on primary bg', fg: colors.textPrimary, bg: colors.bgPrimary },
    { name: 'Secondary text on primary bg', fg: colors.textSecondary, bg: colors.bgPrimary },
    { name: 'Tertiary text on primary bg', fg: colors.textTertiary, bg: colors.bgPrimary },
    { name: 'Accent on primary bg', fg: colors.accent, bg: colors.bgPrimary },
    { name: 'Primary text on secondary bg', fg: colors.textPrimary, bg: colors.bgSecondary },
    
    // Dark mode tests
    { name: 'Dark: Primary text on dark bg', fg: colors.darkTextPrimary, bg: colors.darkBg },
    { name: 'Dark: Secondary text on dark bg', fg: colors.darkTextSecondary, bg: colors.darkBg },
  ];
  
  console.log('Linear Design System Contrast Test Results:');
  console.log('==========================================');
  
  tests.forEach(test => {
    const ratio = getContrastRatio(test.fg, test.bg);
    const rating = getWCAGRating(ratio);
    
    console.log(`\n${test.name}:`);
    console.log(`Contrast Ratio: ${ratio.toFixed(2)}:1`);
    console.log(`Normal Text: AA ${rating.normalText.AA ? '✓' : '✗'} | AAA ${rating.normalText.AAA ? '✓' : '✗'}`);
    console.log(`Large Text:  AA ${rating.largeText.AA ? '✓' : '✗'} | AAA ${rating.largeText.AAA ? '✓' : '✗'}`);
  });
}

// Find the minimum lightness for text to meet WCAG on a given background
export function findMinimumLightness(
  bgColor: { l: number; c: number; h: number },
  targetRatio: number = 4.5,
  textC: number = 0,
  textH: number = 0
): number {
  let low = 0;
  let high = 100;
  let result = 0;
  
  while (high - low > 0.1) {
    const mid = (low + high) / 2;
    const ratio = getContrastRatio(
      { l: mid, c: textC, h: textH },
      bgColor
    );
    
    if (ratio >= targetRatio) {
      result = mid;
      high = mid;
    } else {
      low = mid;
    }
  }
  
  return Math.ceil(result);
}