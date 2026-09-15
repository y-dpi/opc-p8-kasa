import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Tag from './Tag';

describe('Tag', () => {
  it('is plain text when it does nothing', () => {
    render(<Tag label='WIFI' />);

    expect(screen.getByText('WIFI')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('becomes a toggle that reports whether it is picked', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(<Tag label='Nature' onToggle={onToggle} />);
    const toggle = screen.getByRole('button', { name: 'Nature' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(onToggle).toHaveBeenCalledOnce();

    rerender(<Tag label='Nature' selected onToggle={onToggle} />);
    expect(screen.getByRole('button', { name: 'Nature' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('names its remove control after the tag it removes', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();

    render(<Tag label='Montmartre' onRemove={onRemove} />);

    await user.click(screen.getByRole('button', { name: 'Retirer Montmartre' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });
});
