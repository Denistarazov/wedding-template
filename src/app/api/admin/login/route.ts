import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyPassword, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/admin-auth';

const schema = z.object({ password: z.string().min(1) });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: 'Пароль не указан' }, { status: 400 });
  }

  const token = await verifyPassword(parsed.data.password);

  if (!token) {
    return NextResponse.json({ success: false, message: 'Неверный пароль' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   COOKIE_MAX_AGE,
    path:     '/',
  });
  return res;
}
