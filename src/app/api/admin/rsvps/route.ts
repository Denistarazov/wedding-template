import { NextRequest, NextResponse } from 'next/server';
import { isValidToken, COOKIE_NAME } from '@/lib/admin-auth';
import { rsvpStore } from '@/lib/rsvp-store';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!(await isValidToken(token))) {
    return NextResponse.json({ success: false, message: 'Нет доступа' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: {
      rsvps: await rsvpStore.getAll(),
      stats: await rsvpStore.getStats(),
      storage: rsvpStore.getStorageInfo(),
    },
  });
}
