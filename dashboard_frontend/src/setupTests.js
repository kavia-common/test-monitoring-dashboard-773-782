/* jest-dom adds custom jest matchers for asserting on DOM nodes.
   allows you to do things like:
   expect(element).toHaveTextContent(/react/i)
   learn more: https://github.com/testing-library/jest-dom */
import '@testing-library/jest-dom';

// Global safety net: stub fetch to avoid any real network calls during tests.
// Individual tests can override this stub as needed.
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({}),
  });
} else {
  // If already defined by environment, still ensure it's a jest mock to prevent real calls.
  // eslint-disable-next-line no-undef
  if (typeof jest !== 'undefined' && typeof global.fetch.mock === 'undefined') {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  }
}
