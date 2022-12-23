/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.{html,js,svelte,ts}',
    './slate/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    // overwrite spacing to pixel units
    spacing: {
      px: '1px',
      0: '0px',
      2: '0.125rem',
      4: '0.25rem',
      6: '0.375rem',
      8: '0.5rem',
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      20: '1.25rem',
      24: '1.5rem',
      28: '1.75rem',
      32: '2rem',
      36: '2.25rem',
      40: '2.5rem',
      44: '2.75rem',
      48: '3rem',
      56: '3.5rem',
      64: '4rem',
      80: '5rem',
      96: '6rem',
      112: '7rem',
      128: '8rem',
      144: '9rem',
      160: '10rem',
      176: '11rem',
      192: '12rem',
      208: '13rem',
      224: '14rem',
      240: '15rem',
      256: '16rem',
      288: '18rem',
      320: '20rem',
      384: '24rem'
    },
    fontSize: {
      12: ['0.75rem', { lineHeight: '1rem' }],
      14: ['0.875rem', { lineHeight: '1.25rem' }],
      16: ['1rem', { lineHeight: '1.5rem' }],
      18: ['1.125rem', { lineHeight: '1.75rem' }],
      20: ['1.25rem', { lineHeight: '1.75rem' }],
      24: ['1.5rem', { lineHeight: '2rem' }],
      30: ['1.875rem', { lineHeight: '2.25rem' }],
      36: ['2.25rem', { lineHeight: '2.5rem' }],
      48: ['3rem', { lineHeight: '1' }],
      60: ['3.75rem', { lineHeight: '1' }],
      72: ['4.5rem', { lineHeight: '1' }],
      96: ['6rem', { lineHeight: '1' }],
      128: ['8rem', { lineHeight: '1' }],
    },
    extend: {
    },
  },
  plugins: [],
}
