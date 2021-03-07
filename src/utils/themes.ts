import { devices } from '../breakpoints';

export const lightTheme = {
  mainColor: '#b11e29',
  accentColor: '#ECECEC', // Inputs
  breakpoints: devices,
  bodyColor: '#FCFCFC',
  overlayColor: '#FCFCFC',
  headingColor: '#252525',
  subHeading: '#3B3B3B',
  textColor: 'rgba(15,15,15,.7)',
  shadow: '0px 0px 6px 0px rgb(159,159,159)',
  highlightColor: '#b11e29',
  highlightColorText: '#fff',
  navColor: '#b11e29',
  btnPrimaryLight: '#b11e29',
  btnPrimaryDark: '#b11e29',
  green: '#0B9B23',
  btnText: '#fff',
  font: {
    regular: '400',
    semibold: '600',
    bold: '700',
    xbold: '800',
  },
};

export const darkTheme = {
  mainColor: '#b11e29',
  accentColor: '#5B5B5B',
  breakpoints: devices,
  bodyColor: '#3B3B3B',
  navColor: '#3B3B3B',
  overlayColor: '#5B5B5B',
  headingColor: '#FFF',
  subHeading: '#D8D8D8',
  textColor: '#FFF',
  shadow: '',
  highlightColor: 'rgba(255,255,255,.9)',
  highlightColorText: 'rgba(15,15,15,.8)',
  btnPrimaryLight: '#5B5B5B',
  btnPrimaryDark: '#3B3B3B',
  green: '#1AD439',
  btnText: '#fff',
  font: {
    regular: '400',
    semibold: '600',
    bold: '700',
    xbold: '800',
  },
};
