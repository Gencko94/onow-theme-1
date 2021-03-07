// import original module declarations
import 'styled-components';
import { Devices } from './breakpoints';

// and extend them!
type FontWeights = {
  regular: string;
  semibold: string;
  bold: string;
  xbold: string;
};
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string;
    breakpoints: Devices;
    mainColor: string;
    accentColor: string;
    highlightColor: string;
    highlightColorText: string;
    bodyColor: string;
    headingColor: string;
    subHeading: string;
    textColor: string;
    shadow: string;
    overlayColor: string;
    navColor: string;
    btnPrimaryLight: string;
    btnPrimaryDark: string;
    btnText: string;
    green: string;
    font: FontWeights;
  }
}
