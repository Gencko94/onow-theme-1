import {
  DateTimePicker as Picker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import enLocale, { Locale } from 'dayjs/locale/en-gb';
import arLocale from 'dayjs/locale/ar';
import { useTranslation } from 'react-i18next/';
import { Dispatch, SetStateAction } from 'react';
import { OrderTime } from '../interfaces/orderTime';
interface IProps {
  selectedDate: Date;
  setSelectedDate?: Dispatch<SetStateAction<Date | null>>;
  handleSetOrderTime?: (time: OrderTime) => void;
}

const DateTimePicker = ({
  selectedDate,
  setSelectedDate,
  handleSetOrderTime,
}: IProps) => {
  const localeMap: { [key: string]: Locale } = {
    en: enLocale,
    ar: arLocale,
  };
  const handleDateChange = (date: any) => {
    handleSetOrderTime?.(date);
  };
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <MuiPickersUtilsProvider utils={DayJsUtils} locale={localeMap[language]}>
      <Picker
        margin="dense"
        id="date-picker-dialog"
        showTodayButton
        disablePast
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDate={date => date?.day() === 0 || date?.day() === 6}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;
