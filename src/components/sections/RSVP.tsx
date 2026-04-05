'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { weddingConfig } from '@/config/wedding';
import { formatDate } from '@/lib/utils';
import en from '@/locales/en.json';
import type { RSVPFormData, RSVPApiResponse } from '@/types';

// ── Validation Schema ─────────────────────────────────────────────────────────

const schema = z.object({
  fullName: z
    .string({ required_error: 'Your name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  attending: z.enum(['yes', 'no'], {
    required_error: 'Please let us know if you can attend',
  }),
  guestCount: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number' })
    .int('Must be a whole number')
    .min(1, 'At least 1 guest')
    .max(weddingConfig.rsvp.maxGuestsPerRsvp, `Max ${weddingConfig.rsvp.maxGuestsPerRsvp} guests`),
  message: z.string().max(500, 'Message too long (max 500 characters)').optional().default(''),
});

type FormValues = z.infer<typeof schema>;

// ── Field Wrapper ─────────────────────────────────────────────────────────────

function Field({
  label, error, children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-text)]/80 font-sans">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

// ── Shared Input Classes ──────────────────────────────────────────────────────

const inputClasses =
  'w-full rounded-xl border border-champagne-200 dark:border-champagne-700/40 ' +
  'bg-white dark:bg-[#201810] text-[var(--color-text)] ' +
  'px-4 py-3 text-sm font-sans ' +
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ' +
  'placeholder:text-[var(--color-text)]/30 ' +
  'transition-all duration-200 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

// ── Success State ─────────────────────────────────────────────────────────────

function SuccessMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-4">💌</div>
      <h3 className="font-serif text-2xl font-bold text-[var(--color-text)] mb-3">
        {en.rsvp.success.title}
      </h3>
      <p className="text-[var(--color-text)]/70 font-sans max-w-md mx-auto">
        {message || en.rsvp.success.message}
      </p>
    </motion.div>
  );
}

// ── RSVP Section ──────────────────────────────────────────────────────────────

/**
 * RSVP section with:
 * - react-hook-form + zod validation
 * - Animated form fields
 * - Success / error states
 * - POST to /api/rsvp
 */
export default function RSVP() {
  const { rsvp } = weddingConfig;
  const [submitted, setSubmitted] = useState(false);
  const [serverMsg,  setServerMsg]  = useState('');
  const [serverErr,  setServerErr]  = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guestCount: 1, attending: 'yes', message: '' },
  });

  const attending = watch('attending');

  const onSubmit = async (data: FormValues) => {
    setServerErr('');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data as RSVPFormData),
      });

      const json: RSVPApiResponse = await res.json();

      if (json.success) {
        setServerMsg(json.message);
        setSubmitted(true);
      } else {
        setServerErr(json.message || en.rsvp.error);
      }
    } catch {
      setServerErr(en.rsvp.error);
    }
  };

  return (
    <SectionWrapper id="rsvp" bg="default">
      <div className="container-custom max-w-2xl">

        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">{en.rsvp.sectionLabel}</p>
          <h2 className="section-heading">{en.rsvp.heading}</h2>
          <p className="text-[var(--color-text)]/60 font-sans text-sm mt-3">
            {en.rsvp.deadline}{' '}
            <span className="font-medium text-[var(--color-primary)]">
              {formatDate(rsvp.deadline)}
            </span>
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>

        {/* ── Form Card ── */}
        <div className="bg-champagne-50 dark:bg-[#201810] rounded-3xl p-6 sm:p-10
                        border border-champagne-200 dark:border-champagne-700/30 shadow-sm">
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessMessage key="success" message={serverMsg} />
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-6"
              >
                {/* Full Name */}
                <Field label={en.rsvp.form.fullName} error={errors.fullName?.message}>
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder={en.rsvp.form.fullNamePlaceholder}
                    className={inputClasses}
                    autoComplete="name"
                  />
                </Field>

                {/* Attendance */}
                <Field label={en.rsvp.form.attending} error={errors.attending?.message}>
                  <div className="grid grid-cols-2 gap-3">
                    {(['yes', 'no'] as const).map((val) => {
                      const label = val === 'yes'
                        ? en.rsvp.form.attendingYes
                        : en.rsvp.form.attendingNo;
                      return (
                        <label
                          key={val}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer
                                      border text-sm font-medium font-sans transition-all duration-200
                                      ${attending === val
                                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                                        : 'border-champagne-200 dark:border-champagne-700/40 text-[var(--color-text)]/70 hover:border-[var(--color-primary)]/50'
                                      }`}
                        >
                          <input
                            {...register('attending')}
                            type="radio"
                            value={val}
                            className="sr-only"
                          />
                          {val === 'yes' ? '🥂' : '💌'} {label}
                        </label>
                      );
                    })}
                  </div>
                </Field>

                {/* Guest Count (only when attending) */}
                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Field label={en.rsvp.form.guestCount} error={errors.guestCount?.message}>
                      <input
                        {...register('guestCount')}
                        type="number"
                        min={1}
                        max={rsvp.maxGuestsPerRsvp}
                        className={inputClasses}
                      />
                    </Field>
                  </motion.div>
                )}

                {/* Message */}
                <Field label={en.rsvp.form.message} error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder={en.rsvp.form.messagePlaceholder}
                    className={`${inputClasses} resize-none`}
                  />
                </Field>

                {/* Server error */}
                {serverErr && (
                  <p className="text-sm text-red-500 dark:text-red-400 text-center">
                    {serverErr}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? en.rsvp.form.submitting : en.rsvp.form.submit}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </SectionWrapper>
  );
}
