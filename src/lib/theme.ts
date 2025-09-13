export type Theme = 'light' | 'dark' | 'system';

const KEY = 'theme';

export function getSystemPrefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark());
  root.classList.toggle('dark', isDark);
}

export function initTheme() {
  const saved = (typeof window !== 'undefined' && (localStorage.getItem(KEY) as Theme)) || 'system';
  applyTheme(saved);
}

export function setTheme(theme: Theme) {
  localStorage.setItem(KEY, theme);
  applyTheme(theme);
}

