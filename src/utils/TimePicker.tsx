import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import enLocale, { Locale } from 'dayjs/locale/en-gb';
import arLocale from 'dayjs/locale/ar';
import { useTranslation } from 'react-i18next/';
import { Dispatch, SetStateAction } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IProps {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
}

const TimePicker = ({ selectedDate, setSelectedDate }: IProps) => {
  const localeMap: { [key: string]: Locale } = {
    en: enLocale,
    ar: arLocale,
  };
  const handleDateChange = (date: any) => {
    console.log(date?.hour());
    // if(date?.hour)
    // setSelectedDate(date);
  };
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils} locale={localeMap[language]}>
      <KeyboardTimePicker
        margin="dense"
        id="time-picker-dialog"
        value={selectedDate}
        onChange={handleDateChange}
        invalidDateMessage="INvalid Date"
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TimePicker;
