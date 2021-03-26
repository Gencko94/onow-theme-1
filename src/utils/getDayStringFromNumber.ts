export const getDayStringFromNumber = (day: number, locale: string): string => {
  const days: { [key: string]: string }[] = [
    { ar: 'الأحد', en: 'Sunday' },
    { ar: 'الإثنين', en: 'Monday' },
    { ar: 'الثلاثاء', en: 'Tuesday' },
    { ar: 'الأربعاء', en: 'Wednesday' },
    { ar: 'الخميس', en: 'Thursday' },
    { ar: 'الجمعة', en: 'Friday' },
    { ar: 'السبت', en: 'Saturday' },
  ];
  return days[day][locale];
};
