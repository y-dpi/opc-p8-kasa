// Runs before every test file.

// Matchers that read the DOM the way a person would: toBeInTheDocument, toHaveAccessibleName and the rest.
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// jsdom carries the <dialog> element but none of the methods that drive it, so a component that
// opens itself on mount would throw before it ever rendered. These stand in for the three the
// specification defines, keeping the 'open' attribute and the close event components listen for.
if (typeof HTMLDialogElement.prototype.showModal !== 'function') {
  HTMLDialogElement.prototype.show = function show(this: HTMLDialogElement): void {
    this.open = true;
  };

  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement): void {
    this.open = true;
  };

  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement, value?: string): void {
    if (!this.open) return;

    this.open = false;
    if (value !== undefined) this.returnValue = value;
    this.dispatchEvent(new Event('close'));
  };
}

// Setup before each test.
beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockImplementation((input) => {
    const target = input instanceof Request ? input.url : String(input);
    throw new Error(
      `A test tried to fetch '${target}'. Tests run against the fixtures under '/mocks', `
      + 'so reach for those, or stand in for the action that would have made the call.',
    );
  });
});

// Clean slate after each test.
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
