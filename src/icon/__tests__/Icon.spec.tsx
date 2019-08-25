import React from 'react';
import { render, fireEvent, cleanup, waitForElement, debugDOM } from '@testing-library/react';
import { Icon } from '../Icon';

describe('IconComponent', () => {
  afterEach(cleanup);
  it('render no error', () => {
    const { getByTestId, container } = render(<Icon data-testid="icon" name="smile-o" size="xs" />);
    const element = getByTestId('icon');
    expect(element.tagName).toBe('I');
    expect(container).toMatchSnapshot();
  });
});
