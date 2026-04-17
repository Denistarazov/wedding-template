import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rsvpStore } from '@/lib/rsvp-store';

// ── Validation Schema ─────────────────────────────────────────────────────────
const rsvpSchema = z.object({
  fullName:   z.string().min(2, 'Имя должно содержать минимум 2 символа').max(100),
  attending:  z.enum(['yes', 'no'], { required_error: 'Укажите, придёте ли вы' }),
  guestCount: z
    .number({ invalid_type_error: 'Укажите количество гостей' })
    .int()
    .min(1, 'Минимум 1 гость')
    .max(10, 'Максимум 10 гостей'),
  message: z.string().max(500, 'Сообщение слишком длинное').optional().default(''),
});

/**
 * POST /api/rsvp
 *
 * Сохраняет ответ в in-memory store (виден в /admin).
 * В продакшне замените rsvpStore на реальную БД.
 */
export async function POST(req: NextRequest) {
  try {
    const body   = await req.json();
    const result = rsvpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Ошибка валидации', errors: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data = result.data;

    // Сохраняем в in-memory store
    await rsvpStore.add({
      fullName:   data.fullName,
      attending:  data.attending,
      guestCount: data.guestCount,
      message:    data.message ?? '',
    });

    console.log('[RSVP]', data.fullName, '→', data.attending, `(${data.guestCount} гост.)`);

    await new Promise((r) => setTimeout(r, 300));

    return NextResponse.json({
      success: true,
      message:
        data.attending === 'yes'
          ? 'Ура! Мы так рады, что вы придёте!'
          : 'Жаль, что не получится. Спасибо, что сообщили нам.',
    });
  } catch (err) {
    console.error('[RSVP Error]', err);
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
  }
}
