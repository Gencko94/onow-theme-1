import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import MobileHeader from '../components/Header/MobileHeader';
import ChangePassword from '../components/MyAccount/profile/ChangePassword';
import Info from '../components/MyAccount/profile/Info';
import { AuthProvider } from '../contexts/AuthContext';
import { paymentMethods } from '../data/paymentMethods';
import Layout from '../layout/Layout';

const MyProfile = () => {
  const { user } = useContext(AuthProvider);
  const { t } = useTranslation(['profile']);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  if (!user) {
    return <Redirect to={{ pathname: '/login', state: '/user/profile' }} />;
  }
  return (
    <Layout>
      <MobileHeader title="my-profile" />

      <Container>
        <Block>
          <Info />
        </Block>
        <hr />
        <Block>
          <ChangePassword />
        </Block>

        <BlockHead>
          <Title>{t('preffered-payment')}</Title>
        </BlockHead>
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
    // display:grid;
    // grid-template-columns:1fr 1fr 1fr;
    gap:1rem;
    // padding:1rem 0.5rem;
  }
  @media ${breakpoints.lg}{
     padding:1rem 0.5rem;
     max-width:1100px;
    
   }
`
);
const Title = styled.h4(
  ({ theme: { breakpoints, font, headingColor } }) => `
  font-weight:${font.semibold};
  color:${headingColor};
  font-size:1.3rem;
  
  @media ${breakpoints.md} {
    
    font-size:1.3rem;
  }
  }
`
);
const Box = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder, shadow } }) => `
  // background: ${overlayColor};
  // margin: 0.5rem 0;
  overflow: hidden;
  // box-shadow:${shadow};
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

const BlockHead = styled.div`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* background-color: ${props => props.theme.btnPrimaryLight}; */
  /* color: ${props => props.theme.btnText}; */
  /* background: #fff; */
`;
const BlockBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;
const Block = styled.div(
  ({ theme: { breakpoints, overlayColor, btnBorder, shadow } }) => `
  padding: 0 0.5rem;
  @media ${breakpoints.md}{
    padding: 0.5rem 1rem;

  }
  `
);
const BlockTitle = styled.h5``;
// const Label = styled.h6(
//   ({ theme: { breakpoints, headingColor, font } }) => `
//   margin-bottom: 0.25rem;
//   font-weight:${font.semibold};
//   display: block;
//   font-size: 1.1rem;
//   color: ${headingColor};
//   @media ${breakpoints.md}{
//     font-size:1.2rem;
//   }
// `
// );
const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Input = styled.input<{ border?: boolean; colored?: boolean }>`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  color: ${props => props.theme.subHeading};
  border: ${props => props.border && `1px solid ${props.theme.btnBorder}`};
  border-radius: ${props => props.border && '5px'};
  background-color: ${props => props.colored && props.theme.inputColorLight};
`;
const Label = styled.label`
  color: ${({ theme }) => theme.subHeading};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.bold};
  display: block;
`;
// const Info = styled.p`
//   font-weight: ${props => props.theme.font.light};
//   color: ${props => props.theme.subHeading};
//   font-size: 1rem;
// `;
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
  padding: 0.5rem;
  font-size:.8rem;
  // text-decoration:underline;
  font-weight: ${font.semibold};
  @media ${breakpoints.md}{
    font-size:0.8rem;
    // padding: 0.25rem 0.5rem;
  }
`
);
