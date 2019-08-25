// /* eslint-disable no-shadow */
// import styled, { css } from 'styled-components/macro';
// import { DeboxStyleProps } from 'styled-components/macro';
// import { defaultTheme } from '../theme';
//
// export interface Props extends DeboxStyleProps {
//   light?: boolean;
//   active?: boolean;
// }
//
// export const StyledList = styled.div<Props>`
//   background: ${props => props.theme.lightColor};
//   border: 1px solid ${props => props.theme.borderColor};
//   border-radius: 3px;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);
//
//   &:focus {
//     text-decoration: none;
//   }
//
//   &:hover {
//     text-decoration: none;
//   }
// `;
//
// export const StyledHeader = styled.div<Props>`
//   padding: 15px 20px;
//   border-bottom: 1px solid ${props => props.theme.borderColor};
// `;
//
// export const StyledSection = styled.ul<Props>`
//   padding: 0;
//   margin: 0;
//
//   &:not(:last-child) {
//     border-bottom: 1px solid ${props => props.theme.borderColor};
//   }
//
// `;
//
// export const StyledItem = styled.li<Props>`
//   padding: 0 20px;
//   color: ${props => props.theme.grayColorDark};
//   height: 42px;
//   line-height: 42px;
//   list-style: none;
//
//   &:hover {
//     cursor: pointer;
//     background: ${props => props.theme.listActiveColor};
//   }
//
//   ${props =>
//     props.active &&
//     css`
//       background: ${props => props.theme.listActiveColor};
//     `}
//
//   .list-item-left {
//     display: inline-flex;
//     height: 100%;
//     padding-right: 15px;
//     float: left;
//     justify-content: center;
//     align-items: center;
//
//     i {
//       color: ${props => props.theme.grayColorDark};
//     }
//   }
//
//   .list-item-right {
//     display: inline-flex;
//     height: 100%;
//     padding-left: 15px;
//     float: right;
//     justify-content: center;
//     align-items: center;
//
//     i {
//       color: ${props => props.theme.grayColorDark};
//     }
//   }
//   ${props =>
//     props.injectStyle &&
//     css`
//       ${props.injectStyle};
//     `};
// `;
//
// export const StyledFooter = styled.div<Props>`
//   padding: 15px 20px;
//
//   &:not(:last-child) {
//     border-top: 1px solid ${props => props.theme.borderColor};
//   }
//   ${props =>
//     props.injectStyle &&
//     css`
//       ${props.injectStyle};
//     `};
// `;
//
// export const StyledTitle = styled.h1<Props>`
//   font-size: 20px;
//   line-height: 32px;
//   font-weight: 500;
//   color: ${props => props.theme.darkColor};
//   margin: 0;
//
//   ${props =>
//     props.light &&
//     css`
//       color: ${props => props.theme.lightColor};
//     `}
// `;
//
// export const StyledSubTitle = styled.h2<Props>`
//   font-size: 14px;
//   line-height: 18px;
//   font-weight: 300;
//   color: ${props => props.theme.grayColor};
//   margin: 0;
//
//   ${props =>
//     props.light &&
//     css`
//       color: ${props => props.theme.lightColor};
//     `}
// `;
//
// StyledList.defaultProps = {
//   theme: defaultTheme
// };
//
// StyledHeader.defaultProps = {
//   theme: defaultTheme
// };
//
// StyledSection.defaultProps = {
//   theme: defaultTheme
// };
//
// StyledItem.defaultProps = {
//   theme: defaultTheme
// };
//
// StyledFooter.defaultProps = {
//   theme: defaultTheme
// };
//
// StyledTitle.defaultProps = {
//   theme: defaultTheme
// };
//
// StyledSubTitle.defaultProps = {
//   theme: defaultTheme
// };
