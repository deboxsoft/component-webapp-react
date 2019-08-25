import React from 'react';
import styled from 'styled-components/macro';
import { defaultTheme } from '../list/List';
import { StyledThemeTypeProps, OnClickedProps } from '../types';
import { ListTheme } from '../theme';

type ListItemStyledProps = StyledThemeTypeProps<ListTheme>;

type DefaultProps = ListItemStyledProps;

interface ListItemProps extends ListItemStyledProps, OnClickedProps {
  children?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const ListItemStyled = styled.div<ListItemStyledProps>``;

/**
 * List Item
 */
export const ListItem = (props: ListItemProps) => {
  const { children, onClick, left, right, ...attributes } = props;
  const renderLeft = () => {
    if (left) {
      return <div className="list-item-left">{left}</div>;
    }
    return '';
  };

  const renderRight = () => {
    if (right) {
      return <div className="list-item-right">{right}</div>;
    }

    return '';
  };

  const handleClick = (event: React.SyntheticEvent) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <ListItemStyled onClick={handleClick} {...attributes}>
      {renderLeft()}
      {children}
      {renderRight}
    </ListItemStyled>
  );
};

ListItem.defaultProps = {
  theme: defaultTheme,
  themeType: 'default'
};
