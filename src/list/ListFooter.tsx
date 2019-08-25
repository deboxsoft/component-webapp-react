import React from 'react';
import styled, { css } from 'styled-components/macro';
import { StyledThemeProps } from '../types';
import { ListTheme } from '../theme';
import { Row, Column, Container } from '../layout';

type FooterStyledProps = StyledThemeProps<ListTheme>;

interface ListFooterProps extends FooterStyledProps {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const FooterStyled = styled.div<FooterStyledProps>`
  padding: ${props => props.theme.listFooter.padding};
  border-top: ${({ theme }) => theme.listFooter.border && theme.listFooter.border.top};
`;

/**
 * List Footer - https://dribbble.com/shots/3935136-MrWhite-UI-Kit-Dropdown-s/attachments/897751
 */
export const ListFooter = (props: ListFooterProps) => {
  const { children, left, right, ...attributes } = props;

  return (
    <FooterStyled {...attributes}>
      <Container fluid>
        <Row>
          {left && (
            <Column size="md" numberColumn={4}>
              {left}
            </Column>
          )}
          <Column>{right || children}</Column>
        </Row>
      </Container>
    </FooterStyled>
  );
};
