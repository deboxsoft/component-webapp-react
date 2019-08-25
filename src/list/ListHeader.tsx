import React from 'react';
import styled from 'styled-components/macro';
import { CardTitle } from '../card/CardTitle';
import { defaultTheme } from '../list/List';
import { StyledThemeTypeProps } from '../types';
import { ListTheme } from '../theme';

type ListHeaderStyledProps = StyledThemeTypeProps<ListTheme>;

type DefaultProps = ListHeaderStyledProps;

interface ListHeaderProps extends ListHeaderStyledProps {
  children: React.ReactNode;
  custom?: React.ElementType;
  title?: string;
  subtitle?: string;
}

const ListHeaderStyled = styled.div<ListHeaderStyledProps>`
  padding: 15px 20px;
  border-bottom: 1px solid
    ${({ theme, themeType }) => {
      const colors = theme.listHeader.colors[themeType];
      return colors && colors.borderColor;
    }};
`;

/**
 * List header
 */
export const ListHeader = (
  props: ListHeaderProps
) => {
  const { children, className, custom: CustomComponent, title, subtitle, ...attributes } = props;
  const renderContent = () => {
    if (CustomComponent) {
      return <CustomComponent>{children}</CustomComponent>;
    }

    return (
      <div>
        <CardTitle>{title}</CardTitle>
        <CardTitle subtitle>{subtitle}</CardTitle>
        {children}
      </div>
    );
  };

  return (
    <ListHeaderStyled className={className} {...attributes}>
      {renderContent()}
    </ListHeaderStyled>
  );
};

ListHeader.defaultProps = {
  themeType: 'default',
  theme: defaultTheme
};
