import { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AnimatePresence, m } from 'framer-motion';

interface IProps {
  title: string;
}

const OrderTime = ({ title }: IProps) => {
  const { t, i18n } = useTranslation(['checkout']);
  const { mode } = useContext(ThemeContext);
  const [date, setDate] = useState<Date | Date[]>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const {
    orderTime,
    orderTimeType,
    handleSetOrderTimeType,
    handleSetOrderTime,
  } = useContext(ApplicationProvider);
  return (
    <Container>
      <Title>{t(title)} :</Title>
      <PickerContainer>
        <Option
          type="button"
          selected={orderTimeType === 'asap'}
          onClick={() => {
            handleSetOrderTimeType?.('asap');
          }}
        >
          <TitleContainer>
            <OptionTitle>{t('asap')}</OptionTitle>
          </TitleContainer>
          <IconContainer>
            {orderTimeType === 'asap' ? (
              <BiRadioCircleMarked size={25} />
            ) : (
              <BiRadioCircle size={25} />
            )}
          </IconContainer>
        </Option>

        <Option
          type="button"
          selected={orderTimeType === 'schedule'}
          onClick={() => {
            handleSetOrderTimeType?.('schedule');
          }}
        >
          <TitleContainer>
            <OptionTitle>{t('schedule')}</OptionTitle>
          </TitleContainer>
          <IconContainer>
            {orderTimeType === 'schedule' ? (
              <BiRadioCircleMarked size={25} />
            ) : (
              <BiRadioCircle size={25} />
            )}
          </IconContainer>
        </Option>
      </PickerContainer>
      {orderTimeType === 'asap' && <Subtitle>{t('asap-note')} </Subtitle>}
      {orderTimeType === 'schedule' && (
        <>
          <Title>{t('date-time')} :</Title>
          <InputsContainer>
            <InputContainer>
              <Label>{t('date')}</Label>
              <Input>
                <DateInput
                  readOnly
                  value={format(date as Date, 'yyyy-MM-dd')}
                />
                <Icon
                  type="button"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                >
                  <FiCalendar size={20} />
                </Icon>
                <AnimatePresence>
                  {calendarOpen && (
                    <>
                      <CalendarContainer
                        key={1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Calendar
                          className={
                            mode === 'dark' ? 'calendar-dark' : 'calendar-light'
                          }
                          value={date as Date | Date[]}
                          onChange={(date: Date | Date[]) => {
                            setCalendarOpen(false);
                            setDate(date);
                          }}
                          // calendarType="Arabic"
                          locale={i18n.language}
                          tileClassName="tile"
                          minDate={new Date()}
                          prev2Label={<FaAngleDoubleLeft size={20} />}
                          next2Label={<FaAngleDoubleRight size={20} />}
                          prevLabel={<FaAngleLeft size={20} />}
                          nextLabel={<FaAngleRight size={20} />}
                          // showNavigation={false}
                          showNeighboringMonth={false}
                          // showFixedNumberOfWeeks={true}
                          // tileContent={<Sample />}
                        />
                      </CalendarContainer>
                      <Backdrop
                        key={2}
                        onClick={() => setCalendarOpen(false)}
                      />
                    </>
                  )}
                </AnimatePresence>
              </Input>
            </InputContainer>
            <InputContainer>
              <Label>{t('time')}</Label>
              <Input>
                <DateInput />
              </Input>
            </InputContainer>
          </InputsContainer>
        </>
      )}
    </Container>
  );
};

export default OrderTime;

const Container = styled.div``;

const Title = styled.p<{ bold?: boolean; center?: boolean }>`
  font-size: 1rem;
  font-weight: ${props =>
    props.bold ? props.theme.font.bold : props.theme.font.bold};
  text-align: ${props => props.center && 'center'};
`;
const Subtitle = styled.p<{ bold?: boolean; center?: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.theme.subHeading};
  font-weight: ${props =>
    props.bold ? props.theme.font.bold : props.theme.font.semibold};
  text-align: ${props => props.center && 'center'};
`;

const PickerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  align-self: flex-start;
  padding: 0.75rem 0;
`;
const Option = styled.button<{
  selected: boolean;
}>`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border: ${props => props.theme.border};
  background: ${props =>
    props.selected ? props.theme.highlightColor : props.theme.overlayColor};
  color: ${props =>
    props.selected
      ? props => props.theme.highlightColorText
      : props.theme.headingColor};
  border-radius: 5px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: ${props => props.theme.shadow};
`;
const IconContainer = styled.span`
  margin: 0 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OptionTitle = styled.p`
  text-align: center;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.semibold};
  white-space: nowrap;
`;
const InputsContainer = styled.div(
  ({ theme: { breakpoints, overlayColor } }) => `
  display:grid;
 
  padding:0.75rem 0 ;
  gap:0.5rem;
  grid-template-columns: 1fr;
   @media ${breakpoints.md}{
     grid-template-columns: 0.5fr 0.5fr;
   }
   `
);
const InputContainer = styled.div``;
const Input = styled.div`
  margin-top: 0.25rem;
  padding: 0.5rem;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border: ${props => props.theme.border};
  background: ${props => props.theme.overlayColor};
  color: ${props => props.theme.headingColor};
  border-radius: 5px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: ${props => props.theme.shadow};
`;
const DateInput = styled.input`
  width: 100%;
  color: ${props => props.theme.subHeading};
  display: block;
`;
const CalendarContainer = styled(m.div)`
  position: absolute;
  z-index: 10;
  left: 0;
  bottom: 85px;
  direction: ltr;
  width: 250px;
  height: 250px;
`;
const Label = styled.p`
  font-size: 0.9rem;
`;
const Icon = styled.button`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0.25rem;
  transition: all 75ms ease;
  color: ${props => props.theme.subHeading};
  &:hover {
    background-color: gray;
    color: ${props => props.theme.highlightColorText};
  }
`;
const Backdrop = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: transparent;
`;
