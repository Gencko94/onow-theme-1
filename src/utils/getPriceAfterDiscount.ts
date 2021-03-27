export const getPriceAfterDiscount = (
  percent: number,
  originalPrice: number
): number => {
  return originalPrice - (originalPrice * percent) / 100;
};
