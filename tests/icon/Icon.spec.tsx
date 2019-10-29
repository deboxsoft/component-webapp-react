import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Icon } from '../../src/icon/Icon';

describe('Icon', () => {
  afterEach(cleanup);
  it('cek render normal', () => {
    const { getByTestId, container } = render(<Icon data-testid="icon" name="smile-o" size="xs" />);
    const element = getByTestId('icon');
    expect(element.tagName).toBe('I');
    expect(container).toMatchSnapshot();
  });
});
