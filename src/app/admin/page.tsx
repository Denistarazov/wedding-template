'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import type { RSVPEntry } from '@/lib/rsvp-store';
import type { RSVPStorageInfo } from '@/types';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Stats {
  total: number;
  attending: number;
  declining: number;
  totalGuests: number;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }: {
  label: string; value: number; icon: string; color: string;
}) {
  return (
    <div className={`rounded-2xl p-5 border ${color} bg-white dark:bg-[#201810] shadow-sm`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold font-serif text-[var(--color-text)]">{value}</div>
      <div className="text-sm text-[var(--color-text)]/60 mt-1">{label}</div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res  = await fetch('/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password }),
      });
      const json = await res.json();
      if (json.success) {
        onLogin();
      } else {
        setError(json.message ?? 'Неверный пароль');
      }
    } catch {
      setError('Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💍</div>
          <h1 className="font-serif text-2xl font-bold text-[var(--color-text)]">
            {weddingConfig.couple.bride.name} &amp; {weddingConfig.couple.groom.name}
          </h1>
          <p className="text-sm text-[var(--color-text)]/50 mt-1">Панель управления</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#201810] rounded-3xl p-8 shadow-lg border border-champagne-200 dark:border-champagne-700/30"
        >
          <label className="block text-sm font-medium text-[var(--color-text)]/70 mb-2">
            Пароль администратора
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль…"
            autoFocus
            className="w-full rounded-xl border border-champagne-200 dark:border-champagne-700/40
                       bg-[#FDFAF5] dark:bg-[#2A1F14] text-[var(--color-text)]
                       px-4 py-3 text-sm mb-4
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                       placeholder:text-[var(--color-text)]/30"
          />

          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-accent)]
                       text-white font-medium rounded-xl py-3 text-sm
                       transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Вхожу…' : 'Войти'}
          </button>
        </form>

        <p className="text-center text-xs text-[var(--color-text)]/30 mt-4">
          По умолчанию: <code className="font-mono">wedding2027</code>
        </p>
      </motion.div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [rsvps,   setRsvps]   = useState<RSVPEntry[]>([]);
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [storage, setStorage] = useState<RSVPStorageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [search,  setSearch]  = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/rsvps');
      if (res.status === 401) { onLogout(); return; }
      const json = await res.json();
      if (json.success) {
        setRsvps(json.data.rsvps);
        setStats(json.data.stats);
        setStorage(json.data.storage ?? null);
      }
    } catch {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    onLogout();
  };

  const filtered = rsvps.filter((r) =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.message.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <header className="bg-white dark:bg-[#201810] border-b border-champagne-200 dark:border-champagne-700/30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💍</span>
            <div>
              <span className="font-serif font-bold text-[var(--color-text)]">
                {weddingConfig.couple.bride.name} &amp; {weddingConfig.couple.groom.name}
              </span>
              <span className="text-xs text-[var(--color-text)]/40 ml-2 hidden sm:inline">
                Панель управления
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="text-xs text-[var(--color-text)]/50 hover:text-[var(--color-primary)]
                         transition-colors px-3 py-1.5 rounded-lg hover:bg-champagne-50 dark:hover:bg-champagne-900/20"
            >
              ↻ Обновить
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-[var(--color-text)]/50 hover:text-red-500
                         transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Stats ── */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Всего ответов"    value={stats.total}       icon="📋" color="border-champagne-200 dark:border-champagne-700/30" />
            <StatCard label="Придут"           value={stats.attending}   icon="🥂" color="border-green-200 dark:border-green-700/30" />
            <StatCard label="Не придут"        value={stats.declining}   icon="💌" color="border-red-200 dark:border-red-700/30" />
            <StatCard label="Гостей всего"     value={stats.totalGuests} icon="👥" color="border-blue-200 dark:border-blue-700/30" />
          </div>
        )}

        {/* ── RSVP Table ── */}
        <div className="bg-white dark:bg-[#201810] rounded-3xl border border-champagne-200 dark:border-champagne-700/30 shadow-sm overflow-hidden">

          {/* Table header */}
          <div className="px-6 py-4 border-b border-champagne-100 dark:border-champagne-700/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-serif text-lg font-bold text-[var(--color-text)]">
              Список гостей
            </h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по имени…"
              className="text-sm rounded-xl border border-champagne-200 dark:border-champagne-700/40
                         bg-[#FDFAF5] dark:bg-[#2A1F14] text-[var(--color-text)]
                         px-3 py-2 w-full sm:w-52
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                         placeholder:text-[var(--color-text)]/30"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-16 text-[var(--color-text)]/40">
              <span className="animate-spin mr-2">↻</span> Загружаю…
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-16 text-red-500 text-sm">{error}</div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--color-text)]/40">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-sm">
                {rsvps.length === 0 ? 'Ответов пока нет' : 'Ничего не найдено'}
              </p>
              {rsvps.length === 0 && (
                <p className="text-xs mt-1 text-[var(--color-text)]/30">
                  Ответы появятся здесь после того, как гости заполнят форму
                </p>
              )}
            </div>
          )}

          {/* Table */}
          {!loading && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-champagne-50/60 dark:bg-champagne-900/10 text-left">
                    <th className="px-6 py-3 font-medium text-[var(--color-text)]/50 whitespace-nowrap">Имя</th>
                    <th className="px-4 py-3 font-medium text-[var(--color-text)]/50 whitespace-nowrap">Статус</th>
                    <th className="px-4 py-3 font-medium text-[var(--color-text)]/50 whitespace-nowrap">Гостей</th>
                    <th className="px-4 py-3 font-medium text-[var(--color-text)]/50">Пожелания</th>
                    <th className="px-4 py-3 font-medium text-[var(--color-text)]/50 whitespace-nowrap">Дата ответа</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne-100 dark:divide-champagne-700/20">
                  <AnimatePresence>
                    {filtered.map((rsvp, i) => (
                      <motion.tr
                        key={rsvp.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-champagne-50/50 dark:hover:bg-champagne-900/10 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-[var(--color-text)] whitespace-nowrap">
                          {rsvp.fullName}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {rsvp.attending === 'yes' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              🥂 Придёт
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                              💌 Не придёт
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center text-[var(--color-text)]">
                          {rsvp.attending === 'yes' ? rsvp.guestCount : '—'}
                        </td>
                        <td className="px-4 py-4 text-[var(--color-text)]/60 max-w-xs truncate">
                          {rsvp.message || <span className="italic opacity-40">нет</span>}
                        </td>
                        <td className="px-4 py-4 text-[var(--color-text)]/40 whitespace-nowrap">
                          {new Date(rsvp.submittedAt).toLocaleString('ru-RU', {
                            day:    '2-digit',
                            month:  'short',
                            hour:   '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {stats && stats.total > 0 && (
            <div className="px-6 py-3 border-t border-champagne-100 dark:border-champagne-700/20 text-xs text-[var(--color-text)]/40 text-right">
              {filtered.length} из {rsvps.length} записей
            </div>
          )}
        </div>

        {storage && (
          <p className="text-center text-xs text-[var(--color-text)]/30 mt-6">
            {storage.persistent
              ? `Данные сохраняются через ${storage.label}.`
              : `⚠️ Данные хранятся через ${storage.label} и могут сброситься после перезапуска.`}
          </p>
        )}

      </main>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Check auth on mount
  useEffect(() => {
    fetch('/api/admin/rsvps')
      .then((r) => setAuthenticated(r.ok))
      .catch(() => setAuthenticated(false));
  }, []);

  // Loading
  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--color-text)]/30">
        <span className="animate-spin mr-2">↻</span> Проверяю доступ…
      </div>
    );
  }

  return authenticated ? (
    <Dashboard onLogout={() => setAuthenticated(false)} />
  ) : (
    <LoginScreen onLogin={() => setAuthenticated(true)} />
  );
}
