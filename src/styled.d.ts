// import original module declarations
import 'styled-components';
import { Devices } from './breakpoints';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string;
    breakpoints: Devices;
    mainColor: string;
    secondaryColor: string;
  }
}
