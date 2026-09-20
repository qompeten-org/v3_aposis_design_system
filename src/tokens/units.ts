/**
 * APOSIS Design System Unit v3.1
 * Exact px to rem scale based on Figma specification
 */
export const units = {
  '1px': '0.0625rem',
  '1.25px': '0.078125rem',
  '1.5px': '0.09375rem',
  '2px': '0.125rem',
  '3px': '0.1875rem',
  '4px': '0.25rem',
  '6px': '0.375rem',
  '7px': '0.4375rem',
  '8px': '0.5rem',
  '10px': '0.625rem',
  '11px': '0.6875rem',
  '12px': '0.75rem',
  '14px': '0.875rem',
  '15px': '0.9375rem',
  '16px': '1rem',
  '20px': '1.25rem',
  '24px': '1.5rem',
  '30px': '1.875rem',
  '32px': '2rem',
  '40px': '2.5rem',
  '48px': '3rem',
  '64px': '4rem',
  '80px': '5rem',
  '96px': '6rem',
  '112px': '7rem',
  '128px': '8rem',
  '144px': '9rem',
} as const;

export type UnitKey = keyof typeof units;
