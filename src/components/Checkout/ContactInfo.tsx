import { DeepMap, FieldError } from 'react-hook-form';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { CHECKOUT_FORM } from '../../interfaces/checkoutForm';

interface IProps {
  register: any;
  errors: DeepMap<CHECKOUT_FORM, FieldError>;
}

const ContactInfo = ({ register, errors }: IProps) => {
  const { t } = useTranslation(['checkout']);

  return (
    <Container>
      <SectionTitle>{t('contact-info')}</SectionTitle>
      <SectionBody>
        <InputContainer>
          <Label>{t('first-name')}</Label>
          <Input colored border name="first_name" ref={register} />
          <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Label>{t('last-name')}</Label>
          <Input colored border name="last_name" ref={register} />
          <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Label>{t('phone-number')}</Label>
          <PhoneInputContainer>
            <PhoneKey>+965</PhoneKey>
            <Input name="phone_number" ref={register} />
          </PhoneInputContainer>
          <ErrorMessage>{errors.phone_number?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Label>{t('email')}</Label>
          <Input colored border name="email" ref={register} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </InputContainer>
      </SectionBody>
    </Container>
  );
};

export default ContactInfo;

const SectionTitle = styled.h5(
  ({ theme: { breakpoints, font, headingColor } }) => `
  margin-bottom:0.5rem;
  font-weight:${font.bold};
 
 
 
  @media ${breakpoints.md} {
     
    }
  }
`
);
const Container = styled.div`
  /* padding: 0.75rem 0.5rem; */
`;

const InputContainer = styled.div`
  margin-bottom: 0.75rem;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.subHeading};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.bold};
  display: block;
`;
const PhoneInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.btnBorder};
  background-color: ${props => props.theme.inputColorLight};
`;
const PhoneKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.font.semibold};
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.dangerRed};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
const SectionBody = styled.div(
  ({ theme: { breakpoints, overlayColor } }) => `
  padding: 0.5rem;
  padding-top:1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${overlayColor};
  display:grid;
  gap:0.5rem;
  grid-template-columns:1fr;
  @media ${breakpoints.md}{
    
    grid-template-columns:1fr 1fr;
  }
  `
);
const Input = styled.input<{ border?: boolean; colored?: boolean }>`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  color: ${props => props.theme.subHeading};
  border: ${props => props.border && `1px solid ${props.theme.btnBorder}`};
  border-radius: ${props => props.border && '5px'};
  background-color: ${props => props.colored && props.theme.inputColorLight};
`;
