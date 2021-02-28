import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import enLocale, { Locale } from 'dayjs/locale/en-gb';
import arLocale from 'dayjs/locale/ar';
import { useTranslation } from 'react-i18next/';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

const DatePicker = ({ selectedDate, setSelectedDate }: IProps) => {
  const localeMap: { [key: string]: Locale } = {
    en: enLocale,
    ar: arLocale,
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <MuiPickersUtilsProvider utils={DayJsUtils} locale={localeMap[language]}>
      <KeyboardDatePicker
        margin="dense"
        id="date-picker-dialog"
        // format="MM/dd/yyyy"
        disablePast
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDate={date => date?.day() === 0 || date?.day() === 6}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
