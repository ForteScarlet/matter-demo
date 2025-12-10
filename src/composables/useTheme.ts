import { ref, watch } from 'vue';
import type { Theme } from '../types/blog';

const theme = ref<Theme>((localStorage.getItem('blog-theme') as Theme) || 'day');

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    localStorage.setItem('blog-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  watch(theme, (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  }, { immediate: true });

  return {
    theme,
    setTheme
  };
}