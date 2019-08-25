import Color from 'color';

type ColorParam = Color | string | ArrayLike<number> | number | { [key: string]: any };

export const colors = {
  blue: '#007bff', // primary
  blueHoverFocusA: '#0056b3',
  blueHoverFocus: '#0062cc',
  blueBoxShadow: 'rgba(0, 123, 255, 0.5)',
  blueAlertText: '#004085',
  blueAlertBackground: '#cce5ff',
  blueAlertBorder: '#b8daff',
  blueAlertBorderTop: '#9fcdff',
  blueAlertAHoverFocus: '#002752',
  inigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545', // danger
  redHoverFocus: '#bd2130',
  redBoxShadow: 'rgba(220, 53, 69, 0.5)',
  redAlertText: '#721c24',
  redAlertBackground: '#f8d7da',
  redAlertBorder: '#f5c6cb',
  redAlertBorderTop: '#f1b0b7',
  redAlertAHoverFocus: '#491217',
  orange: '#fd7e14',
  yellow: '#ffc107', // warning
  yellowHoverFocus: '#d39e00',
  yellowBoxShadow: 'rgba(255, 193, 7, 0.5)',
  yellowAlertText: '#856404',
  yellowAlertBackground: '#fff3cd',
  yellowAlertBorder: '#ffeeba',
  yellowAlertBorderTop: '#ffe8a1',
  yellowAlertAHoverFocus: '#533f03',
  green: '#28a745', // success
  greenHoverFocus: '#1e7e34',
  greenBoxShadow: 'rgba(40, 167, 69, 0.5)',
  greenAlertText: '#155724',
  greenAlertBackground: '#d4edda',
  greenAlertBorder: '#c3e6cb',
  greenAlertBorderTop: '#b1dfbb',
  greenAlertAHoverFocus: '#0b2e13',
  teal: '#20c997',
  cyan: '#17a2b8', // info
  cyanHoverFocus: '#117a8b',
  cyanBoxShadow: 'rgba(23, 162, 184, 0.5)',
  cyanAlertText: '#0c5460',
  cyanAlertBackground: '#d1ecf1',
  cyanAlertBorder: '#bee5eb',
  cyanAlertBorderTop: '#abdde5',
  cyanAlertAHoverFocus: '#062c33',
  white: '#fff',
  gray: '#6c757d', // secondary
  grayHoverFocus: '#545b62',
  grayBoxShadow: 'rgba(108, 117, 125, 0.5)',
  grayAlertText: '#383d41',
  grayAlertBackground: '#e2e3e5',
  grayAlertBorder: '#d6d8db',
  grayAlertBorderTop: '#c8cbcf',
  grayAlertAHoverFocus: '#202326',
  gray100: '#f8f9fa', // light
  gray100HoverFocus: '#dae0e5',
  gray100BoxShadow: 'rgba(248, 249, 250, 0.5)',
  gray100AlertText: '#818182',
  gray100AlertBackground: '#fefefe',
  gray100AlertBorder: '#fdfdfe',
  gray100AlertBorderTop: '#ececf6',
  gray100AlertAHoverFocus: '#686868',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#868e96',
  gray700: '#495057',
  gray800: '#343a40', // dark
  gray800HoverFocus: '#1d2124',
  gray800BoxShadow: 'rgba(52, 58, 64, 0.5)',
  gray800AlertText: '#1b1e21',
  gray800AlertBackground: '#d6d8d9',
  gray800AlertBorder: '#c6c8ca',
  gray800AlertBorderTop: '#b9bbbe',
  gray800AlertAHoverFocus: '#040505',
  gray900: '#212529', // darker
  gray900HoverFocus: '#16181b',
  gray900BoxShadow: 'rgba(0, 0, 0, 0.15)',
  black: '#000'
};

const red = Color('#fff');

export const contrastingColor = (hexCode: ColorParam, config?: { primary?: string; white?: string }) => {
  const color = new Color(hexCode);
  return color.luminosity() < 0.26
    ? (config && config.white) || colors.white
    : (config && config.primary) || colors.black;
};
