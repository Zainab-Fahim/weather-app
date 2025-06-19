// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock ResizeObserver for recharts and other libraries
if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Mock clientWidth and clientHeight for recharts ResponsiveContainer
Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 600 });
Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 300 });
