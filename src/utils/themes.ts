import { devices } from '../breakpoints';

export const lightTheme = {
  mainColor: '#b11e29',
  accentColor: 'rgba(250,250,250,.95)',
  breakpoints: devices,
  bodyColor: '#ffffff',
  headingColor: 'rgba(15,15,15,.87)',
  subtitleColor: 'rgba(15,15,15,.60)',
  textColor: 'rgba(15,15,15,.7)',
  shadow: '5px 3px 8px 3px rgba(0,0,0,0.1)',
  highlightColor: '#b11e29',
  highlightColorText: '#fff',
};

export const darkTheme = {
  mainColor: 'rgba(80,80,80,.98)',
  accentColor: 'rgba(255,255,255,.24)',
  breakpoints: devices,
  bodyColor: '#252525',
  headingColor: 'rgba(255,255,255,.87)',
  subtitleColor: 'rgba(255,255,255,.60)',
  textColor: 'rgba(255,255,255,.8)',
  shadow: '',
  highlightColor: 'rgba(255,255,255,.9)',
  highlightColorText: 'rgba(15,15,15,.8)',
};
