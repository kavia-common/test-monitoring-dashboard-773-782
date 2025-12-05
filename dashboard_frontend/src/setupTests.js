/* jest-dom adds custom jest matchers for asserting on DOM nodes.
   allows you to do things like:
   expect(element).toHaveTextContent(/react/i)
   learn more: https://github.com/testing-library/jest-dom */
import '@testing-library/jest-dom';

// Provide a default, no-op fetch stub to avoid real network calls.
// Tests can override this per-suite as needed.
if (typeof global.fetch === 'undefined') {
  // eslint-disable-next-line no-undef
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({}),
  });
}
