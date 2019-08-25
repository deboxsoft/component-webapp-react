import React from 'react';
import { render } from '@testing-library/react';
import { Animate, shake } from '../index';
import 'jest-styled-components';


describe('Animate Test', () => {
  it('should render no error', () => {
    jest.requireActual('');
    const { container } = render(<Animate keyframe={shake} />);
    expect(container).toMatchSnapshot();
  });
});
