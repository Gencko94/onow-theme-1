import { Dispatch, SetStateAction, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { PAYMENT_METHOD } from '../../interfaces/init';
interface IProps {
  paymentMethod: PAYMENT_METHOD | null;
  setPaymentMethod: Dispatch<SetStateAction<PAYMENT_METHOD | null>>;
}

const PaymentMethods = ({ paymentMethod, setPaymentMethod }: IProps) => {
  const { t, i18n } = useTranslation(['checkout']);
  const { payment_methods } = useContext(ApplicationProvider);

  return (
    <Container>
      {/* <BoxHead> */}

      <SectionTitle>{t('payment')}</SectionTitle>
      <SectionBody>
        {payment_methods?.map(method => (
          <PaymentMethodItem
            active={paymentMethod?.id === method.id}
            onClick={() => setPaymentMethod(method)}
            key={method.id}
          >
            <PaymentMethodImage
              src={method.logo}
              alt={method.name[i18n.language]}
            />
            <PaymentMethodName>{method.name[i18n.language]}</PaymentMethodName>
          </PaymentMethodItem>
        ))}
      </SectionBody>
    </Container>
  );
};

export default PaymentMethods;
const Container = styled.div`
  /* background-color: ${props => props.theme.overlayColor}; */
  /* border-radius: 12px; */
  margin: 2rem 0;
  /* padding: 0.5rem; */
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  overflow: hidden;
`;

const SectionBody = styled.div(
  ({ theme: { breakpoints, overlayColor } }) => `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem 0.5rem 0.5rem;
  `
);

const SectionTitle = styled.h5(
  ({ theme: { breakpoints, font, headingColor } }) => `
  margin-bottom:0.5rem;
  font-weight:${font.bold};
 
 
 
  @media ${breakpoints.md} {
     
    }
  }
`
);

const PaymentMethodItem = styled.div<{ active: boolean }>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${props =>
    props.active ? props.theme.highlightColor : props.theme.inputColorLight};
  color: ${props =>
    props.active ? props.theme.highlightColorText : props.theme.subHeading};
`;
const PaymentMethodName = styled.p`
  font-size: 0.8rem;
  font-weight: ${props => props.theme.font.bold};
`;
const PaymentMethodImage = styled.img`
  width: 46px;
  height: 38px;
  margin: 0.25rem 0;
`;
