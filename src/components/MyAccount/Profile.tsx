import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { paymentMethods } from '../../data/paymentMethods';

const Profile = () => {
  const { t } = useTranslation(['account']);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  return (
    <Container>
      <Box>
        <BoxHead>
          <Title>{t('account-info')}</Title>
        </BoxHead>
        <Block>
          <Label>{t('fullname')}</Label>
          <Info>Maher Khawandi</Info>
        </Block>
        <hr />
        <Block>
          <Label>{t('phonenumber')}</Label>
          <Info>+9655067821</Info>
        </Block>
        <ButtonContainer>
          <Button>Change</Button>
        </ButtonContainer>
      </Box>
      <Box>
        <BoxHead>
          <Title>{t('preffered-payment')}</Title>
        </BoxHead>
        <PaymentMethodsContainer>
          {paymentMethods.map(method => (
            <PaymentMethodItem
              active={paymentMethod.name === method.name}
              onClick={() => setPaymentMethod(method)}
              key={method.name}
            >
              <PaymentMethodImage src={method.photo} alt={method.name} />
              <PaymentMethodName>{method.name}</PaymentMethodName>
            </PaymentMethodItem>
          ))}
        </PaymentMethodsContainer>
        <ButtonContainer>
          <Button>Save</Button>
        </ButtonContainer>
      </Box>
    </Container>
  );
};

export default Profile;

const Container = styled.div``;
const Title = styled.h5(
  ({ theme: { breakpoints, font, headingColor } }) => `
  
  font-weight:${font.bold};
  text-align: center;
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const Box = styled.div`
  background-color: ${props => props.theme.overlayColor};
  border-radius: 12px;
  margin: 0.5rem 0 1rem 0;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const BoxHead = styled.div`
  padding: 0.5rem;

  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  /* background: #fff; */
`;
const Block = styled.div`
  padding: 0.5rem;
`;
const Label = styled.h6`
  margin-bottom: 0.25rem;
  display: block;
  font-size: 1rem;
  color: ${props => props.theme.headingColor};
`;
const Info = styled.p`
  font-weight: ${props => props.theme.font.semibold};
  color: ${props => props.theme.subHeading};
`;
const PaymentMethodsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
`;
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
const ButtonContainer = styled.div`
  padding: 0.5rem;
`;
const Button = styled.button`
  width: 100%;
  border-radius: 8px;
  background-color: ${props => props.theme.btnPrimaryDark};
  color: ${props => props.theme.btnText};
  padding: 0.5rem;
  font-weight: ${props => props.theme.font.bold};
`;
