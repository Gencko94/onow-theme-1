export interface Sizes {
  xs: string;
  sm: string;
  lg: string;
}

export interface Devices {
  xs: string;
  sm: string;
  lg: string;
}
const size: Sizes = {
  xs: '320px',
  sm: '768px',
  lg: '1200px',
};

export const devices: Devices = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  lg: `(min-width: ${size.lg})`,
};
