import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Админ-панель — Свадебный сайт',
  robots: 'noindex, nofollow',   // Не индексировать поисковиками
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F0EA] dark:bg-[#1A1410] font-sans">
      {children}
    </div>
  );
}
