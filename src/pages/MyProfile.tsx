import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MobileHeader from '../components/Header/MobileHeader';
import { paymentMethods } from '../data/paymentMethods';
import Layout from '../layout/Layout';

const MyProfile = () => {
  const { t } = useTranslation(['profile']);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  return (
    <Layout>
      <MobileHeader title="my-profile" />

      <Container>
        <Box>
          <BoxHead>
            <Title>{t('account-info')}</Title>
            <Button>{t('change')}</Button>
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
          {/* <ButtonContainer>
            <Button>{t('save')}</Button>
          </ButtonContainer> */}
        </Box>
      </Container>
    </Layout>
  );
};

export default MyProfile;

const Container = styled.div(
  ({ theme: { breakpoints } }) => `

  @media ${breakpoints.md}{
    max-width:960px;
    margin:0 auto;
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:1rem;
    padding:1rem 0.5rem;
  }
  @media ${breakpoints.lg}{
     padding:1rem 0.5rem;
     max-width:1100px;
    
   }
`
);
const Title = styled.h5(
  ({ theme: { breakpoints, font } }) => `
  font-weight:${font.semibold};
  
  @media ${breakpoints.xs} {
    
    font-size:1.1rem;
  }
  @media ${breakpoints.lg} {
    
    font-size:1.1rem;
  }
  }
`
);
const Box = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder, shadow } }) => `
  // background: ${overlayColor};
  // margin: 0.5rem 0;
  overflow: hidden;
  box-shadow:${shadow};
  @media ${breakpoints.xs}{
    // border-top: ${btnBorder};
    // border-bottom: ${btnBorder};
    
  }
  @media ${breakpoints.md}{
    // border: ${btnBorder};
    // border-radius:6px;
    margin: 0;
    margin-bottom:1rem;

  }
`
);

const BoxHead = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  /* background: #fff; */
`;
const Block = styled.div`
  padding: 0.5rem;
`;
const Label = styled.h6(
  ({ theme: { breakpoints, headingColor, font } }) => `
  margin-bottom: 0.25rem;
  font-weight:${font.semibold};
  display: block;
  font-size: 1.1rem;
  color: ${headingColor};
  @media ${breakpoints.md}{
    font-size:1.2rem;
  }
`
);
const Info = styled.p`
  font-weight: ${props => props.theme.font.light};
  color: ${props => props.theme.subHeading};
  font-size: 1rem;
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

const Button = styled.button(
  ({ theme: { breakpoints, font, btnBorder, btnPrimaryLight, btnText } }) => `
  border-radius: 6px;
  background-color: ${btnPrimaryLight};
  // border:${btnBorder};
  color: ${btnText};
  // padding: 0.5rem;
  font-size:.8rem;
  text-decoration:underline;
  font-weight: ${font.semibold};
  @media ${breakpoints.md}{
    font-size:0.8rem;
    // padding: 0.25rem 0.5rem;
  }
`
);
