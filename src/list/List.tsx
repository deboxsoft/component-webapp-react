import React from 'react';
import styled, { css } from 'styled-components/macro';
import { StyledThemeTypeProps } from '../types';
import { ListTheme } from '../theme';

type ListStyledProps = StyledThemeTypeProps<ListTheme>;

type DefaultProps = ListStyledProps;

interface ListProps extends ListStyledProps {
  children: React.ReactNode;
}

const ListStyled = styled.div<ListStyledProps>`
  ${props => {
    const { theme, themeType } = props;
    const colors = theme.list.colors[themeType];
    return css<ListStyledProps>`
      background: ${colors && colors.backgroundColor};
      border: 1px solid ${colors && colors.borderColor};
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
    `;
  }}

  &:focus {
    text-decoration: none;
  }

  &:hover {
    text-decoration: none;
  }
`;

export const List = (props: ListProps) => {
  const { children, ...attributes } = props;

  return <ListStyled {...attributes}>{children}</ListStyled>;
};

export const defaultTheme: ListTheme = {
  list: { colors: {} },
  listHeader: { colors: {} },
  listFooter: { border: {}, padding: undefined },
  listItem: { colors: {} },
  listSection: { colors: {} }
};

List.defaultProps = {
  themeType: 'default',
  theme: defaultTheme
};
