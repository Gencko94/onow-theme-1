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

  return (
    <Container>
      <StepNumber isDark={mode === 'dark'}>2</StepNumber>
      <SectionTitle>{t('pickup-details-time')}</SectionTitle>
      <DashedLine rtl={i18n.language === 'ar'} />
      <SectionBody>
        <div>
          <Text>
            {t('pickup-branch')} : {pickupBranch?.name[i18n.language]}
          </Text>
        </div>
        <OrderTime title="pickup-time" />
      </SectionBody>
    </Container>
  );
};

export default PickupDetails;
const StepNumber = styled.span<{ isDark: boolean }>`
  padding: 0.5rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${props =>
    props.isDark ? props.theme.overlayColor : props.theme.mainColor};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DashedLine = styled.span<{ rtl: boolean }>`
  border-right: ${props =>
    props.rtl ? 'none' : `2px dashed ${props.theme.seperator}`};
  border-left: ${props =>
    props.rtl ? `2px dashed ${props.theme.seperator}` : 'none'};
  margin-right: ${props => (props.rtl ? '0' : '17px')};
  margin-left: ${props => (props.rtl ? '17px' : '0')};
`;
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 0.25rem;
  row-gap: 0.5rem;
  margin: 2rem 0 ;
  @media ${breakpoints.md}{
    
    row-gap: 1rem;
    gap: 0.5rem;
  }
  `
);
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
  ({ theme: { breakpoints, overlayColor, border, shadow } }) => `
  padding: 0.5rem;
  padding-top: 0.75rem;
  border: ${border};
  box-shadow:${shadow};
  background: ${overlayColor};
  border-radius:6px;
  display:grid;
  gap:0.5rem;
  @media ${breakpoints.md}{
    grid-template-columns:1fr 1fr;
  }
  `
);
const Text = styled.h6``;

const SectionTitle = styled.h5(
  ({ theme: { breakpoints, font } }) => `
  font-weight:${font.bold};
 
 
 font-size:1.05rem;
  @media ${breakpoints.md} {
    font-size:1.25rem;
    }
  }
`
);
