import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import OrderTime from './OrderTime';
import { DeepMap, FieldError } from 'react-hook-form';
import { CHECKOUT_FORM } from '../../interfaces/checkoutForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
interface IProps {
  register: any;
  errors: DeepMap<CHECKOUT_FORM, FieldError>;
}

const PickupDetails = ({ errors, register }: IProps) => {
  const { t, i18n } = useTranslation(['checkout']);
  const { pickupBranch } = useContext(ApplicationProvider);
  const { mode } = useContext(ThemeContext);
  const [date, setDate] = useState<Date | Date[]>(new Date());

  return (
    <Container>
      <StepNumber>2</StepNumber>
      <SectionTitle>{t('pickup-details-time')}</SectionTitle>
      <DashedLine rtl={i18n.language === 'ar'} />
      <SectionBody>
        <Text>Pickup Branch : {pickupBranch?.name[i18n.language]}</Text>
        <CalendarContainer>
          <Calendar
            className={mode === 'dark' ? 'calendar-dark' : 'calendar-light'}
            value={date}
            onChange={date => setDate(date)}
            // calendarType="Arabic"
            locale="ar"
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
      </SectionBody>
    </Container>
  );
};

export default PickupDetails;
const StepNumber = styled.span`
  padding: 0.5rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DashedLine = styled.span<{ rtl: boolean }>`
  border-right: ${props =>
    props.rtl ? 'none' : '2px dashed rgba(0, 0, 0, 0.1)'};
  border-left: ${props =>
    props.rtl ? '2px dashed rgba(0, 0, 0, 0.1)' : 'none'};
  margin-right: ${props => (props.rtl ? '0' : '17px')};
  margin-left: ${props => (props.rtl ? '17px' : '0')};
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 0.5rem;
  margin: 2rem 0;
  row-gap: 1rem;
  overflow: hidden;
`;
const InputsContainer = styled.div(
  ({ theme: { breakpoints, overlayColor } }) => `
  display:grid;
  gap:0.5rem;
  grid-template-columns: 1fr;
   @media ${breakpoints.md}{
     grid-template-columns: 1fr 1fr;
   }
   `
);
const SectionBody = styled.div(
  ({ theme: { breakpoints, overlayColor } }) => `
  padding: 0.5rem;
  padding-top: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${overlayColor};
  border-radius:6px;
  @media ${breakpoints.md}{
  }
  `
);
const Text = styled.h6``;
const MapContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  height: 200px;
  width: 100%;
  position: relative;
  margin-bottom:1rem;
  @media ${breakpoints.md}{
    // height: 100%;
    margin-bottom:0;
    border-radius:10px;
    overflow:hidden;
   
  }
`
);
const SectionTitle = styled.h5(
  ({ theme: { breakpoints, font } }) => `
  font-weight:${font.bold};
 
 
 
  @media ${breakpoints.md} {
     
    }
  }
`
);

const MapImage = styled.img`
  max-height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
`;
const EditButton = styled.button`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  padding: 0.25rem 0.5rem;
  z-index: 999px;
`;
const CalendarContainer = styled.div`
  width: 300px;
  direction: ltr;
`;
