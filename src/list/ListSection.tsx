import React from 'react';
import styled from 'styled-components/macro';
import { defaultTheme } from './List';
import { StyledThemeTypeProps } from '../types';
import { ListTheme } from '../theme';

type ListSectionStyledProps = StyledThemeTypeProps<ListTheme>;

type DefaultProps = ListSectionStyledProps;

type ListHeaderProps = ListSectionStyledProps & {
  children?: React.ReactNode;
};

const ListSectionStyled = styled.ul<ListSectionStyledProps>`
  padding: 0;
  margin: 0;

  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme, themeType }) => {
        const colors = theme && theme.listSection.colors[themeType];
        return colors && colors.borderColor;
      }};
  }
`;

/**
 * List Section
 */
export const ListSection = ({
  children,
  ...props
}: ListHeaderProps) => {
  return <ListSectionStyled {...props}>{children}</ListSectionStyled>;
};

ListSection.defaultProps = {
  theme: defaultTheme,
  themeType: 'default'
};
