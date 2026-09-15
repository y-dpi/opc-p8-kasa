import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Rating from './Rating';

describe('Rating', () => {
  it('prints the score', () => {
    render(<Rating value={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('reads out the scale the score is on, which the star alone does not give', () => {
    const { container } = render(<Rating value={4.5} />);
    expect(container).toHaveTextContent('4.5étoiles sur 5');
  });

  it('hides the star from assistive technology', () => {
    const { container } = render(<Rating value={3} />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('★');
  });
});
