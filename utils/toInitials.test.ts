import { describe, expect, it } from 'vitest';

import toInitials from './toInitials';

describe('toInitials', () => {
  it('takes the first letter of each of the two first words of a name', () => {
    expect(toInitials('Nathalie Jean', 'ignored@kasa.test')).toBe('NJ');
  });

  it('splits a PascalCase name on its capital letters', () => {
    expect(toInitials('JeanPaul', 'ignored@kasa.test')).toBe('JP');
  });

  it('falls back to the two first letters when there is only one word', () => {
    expect(toInitials('Camille', 'ignored@kasa.test')).toBe('CA');
  });

  it('reads the local part of the email when there is no name', () => {
    expect(toInitials(null, 'camille.voyageuse@kasa.test')).toBe('CV');
  });

  it('treats an empty name as no name at all', () => {
    expect(toInitials('', 'bob@kasa.test')).toBe('BO');
  });

  it('gives something back rather than nothing when it has neither', () => {
    expect(toInitials(null, '')).toBe('??');
  });
});
