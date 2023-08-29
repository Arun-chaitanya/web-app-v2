import ImpactBadge from './impact-badge';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('impact-badge', () => {
  test('should set proper badge color', () => {
    render(<ImpactBadge color="#756475" iconUrl="" />);
    const element = screen.getByRole('button');
    expect(element).toHaveStyle('background-color: #756475');
  });
});
