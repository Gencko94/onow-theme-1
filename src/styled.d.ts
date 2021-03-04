// import original module declarations
import 'styled-components';
import { Devices } from './breakpoints';

// and extend them!
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
    subtitleColor?: string;
    textColor: string;
    shadow: string;
  }
}
