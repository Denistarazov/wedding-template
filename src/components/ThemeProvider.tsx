'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Wraps the app with next-themes, enabling dark/light mode via a CSS class.
 * The ThemeProvider must be a Client Component but its children can be RSC.
 */
export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"        // Adds/removes 'dark' class on <html>
      defaultTheme="light"
      enableSystem={false}     // Opt-in to system preference detection later
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
