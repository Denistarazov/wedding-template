import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:    ButtonVariant;
  size?:       ButtonSize;
  isLoading?:  boolean;
  leftIcon?:   React.ReactNode;
  rightIcon?:  React.ReactNode;
}

// ── Variant / Size Maps ───────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gold-DEFAULT text-white hover:bg-gold-600 shadow-sm hover:shadow-md active:scale-[0.98]',
  secondary:
    'bg-blush-100 text-blush-800 hover:bg-blush-200 dark:bg-blush-900/30 dark:text-blush-200',
  outline:
    'border border-gold-DEFAULT text-gold-DEFAULT hover:bg-gold-DEFAULT hover:text-white dark:border-gold-300 dark:text-gold-300',
  ghost:
    'text-gold-DEFAULT hover:bg-gold-50 dark:text-gold-300 dark:hover:bg-gold-900/20',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Reusable Button component with multiple variants and sizes.
 * Supports loading state with a spinner.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'rounded-full font-sans font-medium tracking-wide',
          'transition-all duration-200 ease-in-out',
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none',
          // Variant & size
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <span
            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
            aria-hidden="true"
          />
        )}

        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
