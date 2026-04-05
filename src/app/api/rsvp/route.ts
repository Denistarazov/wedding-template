import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ── Validation Schema ─────────────────────────────────────────────────────────
const rsvpSchema = z.object({
  fullName:   z.string().min(2, 'Name must be at least 2 characters').max(100),
  attending:  z.enum(['yes', 'no'], { required_error: 'Please select attendance' }),
  guestCount: z
    .number({ invalid_type_error: 'Guest count must be a number' })
    .int()
    .min(1, 'At least 1 guest')
    .max(10, 'Maximum 10 guests per RSVP'),
  message:    z.string().max(500, 'Message too long').optional(),
});

/**
 * POST /api/rsvp
 *
 * Receives RSVP form data, validates it, and stores/forwards it.
 *
 * In production, replace the console.log with:
 *   - A database write (e.g. Prisma, Supabase, MongoDB)
 *   - An email send (e.g. Resend, SendGrid, Nodemailer)
 *   - A Google Sheets write via their API
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate incoming data
    const result = rsvpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = result.data;

    // ── TODO: Replace with real storage/notification logic ────────────────
    console.log('[RSVP Received]', {
      name:       data.fullName,
      attending:  data.attending,
      guests:     data.guestCount,
      message:    data.message ?? '',
      receivedAt: new Date().toISOString(),
    });
    // ── End TODO ───────────────────────────────────────────────────────────

    // Simulate a slight processing delay (remove in production)
    await new Promise((r) => setTimeout(r, 500));

    return NextResponse.json({
      success: true,
      message:
        data.attending === 'yes'
          ? "We're so excited to celebrate with you!"
          : "We're sorry you can't make it, but thank you for letting us know.",
    });
  } catch (err) {
    console.error('[RSVP Error]', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
