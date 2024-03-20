/**
 * Returns the minimum of two numbers.
 */
export const min = (a, b) => (a < b ? a : b);

/**
 * Returns the maximum of two numbers.
 */
export const max = (a, b) => (a > b ? a : b);

/**
 * Clamps a value to a range.
 */
export const clamp = (value, lower, upper) => min(max(value, lower), upper);
