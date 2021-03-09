import {
  DateTimePicker as Picker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import enLocale, { Locale } from 'dayjs/locale/en-gb';
import arLocale from 'dayjs/locale/ar';
import { useTranslation } from 'react-i18next/';
import { Dispatch, SetStateAction, useContext, useMemo } from 'react';
import { OrderTime } from '../interfaces/orderTime';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ThemeContext } from '../contexts/ThemeContext';
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
  const { mode } = useContext(ThemeContext);
  const defaultMaterialTheme = useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiPickersToolbar: {
            toolbar: {
              backgroundColor: mode === 'dark' ? '#5B5B5B' : '#FCFCFC',
            },
          },

          MuiPickersCalendarHeader: {
            switchHeader: {
              // backgroundColor: lightBlue.A200,
              // color: "white",
            },
          },
          // MuiPickersDay: {
          //   day: {
          //     color: lightBlue.A700,
          //   },
          //   daySelected: {
          //     backgroundColor: lightBlue['400'],
          //   },
          //   dayDisabled: {
          //     color: lightBlue['100'],
          //   },
          //   current: {
          //     color: lightBlue['900'],
          //   },
          // },
          // MuiPickersModal: {
          //   dialogAction: {
          //     color: lightBlue['400'],
          //   },
          // },
        },
      }),
    []
  );
  const handleDateChange = (date: any) => {
    handleSetOrderTime?.(date);
  };
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MuiPickersUtilsProvider utils={DayJsUtils} locale={localeMap[language]}>
        <Picker
          variant="inline"
          margin="dense"
          size="small"
          id="date-picker-dialog"
          // showTodayButton
          disablePast
          value={selectedDate}
          onChange={handleDateChange}
          // disableToolbar
          shouldDisableDate={date => date?.day() === 0 || date?.day() === 6}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default DateTimePicker;
