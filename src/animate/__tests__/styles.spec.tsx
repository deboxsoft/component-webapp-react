import React from 'react';
import styled, { css } from 'styled-components/macro';
import { render } from '@testing-library/react';
import { fadeIn } from '../Animations';
import 'jest-styled-components';

describe('Keyframe animations', () => {
  it('render snapshot', () => {
    const Div = styled.div`
      animation: ${fadeIn};
    `;
    const { container } = render(<Div />);
    expect(container).toMatchSnapshot();
  });
});
