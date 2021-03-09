import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ContactInfoProps } from '../../interfaces/ContactInfo';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation(['checkout']);
  const schema = Yup.object().shape({
    phoneNumber: Yup.string().required('Required Field').min(5),
    email: Yup.string().required('Required Field').min(5),
    name: Yup.string().required('Required Field').min(5),
  });
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<ContactInfoProps>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: ContactInfoProps) => {
    // const info = {
    //   ...data,
    // };
    history.push('/checkout/summary');
    console.log(data);
  };
  console.log(errors);
  return (
    <Container>
      <Title>{t('contact-info')}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>{t('fullname')}</Label>
          <Input colored border name="name" ref={register} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>{t('phone-number')}</Label>
          <PhoneInputContainer>
            <PhoneKey>+965</PhoneKey>
            <Input name="phoneNumber" ref={register} />
          </PhoneInputContainer>
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <Label>{t('email')}</Label>
          <Input colored border name="email" ref={register} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputContainer>

        <NextButton type="submit">{t('next')}</NextButton>
      </Form>
    </Container>
  );
};

export default ContactInfo;

const Title = styled.h4(
  ({ theme: { breakpoints, headingColor, font } }) => `
  font-weight:${font.bold};
  text-align: center;
  margin-bottom: 1rem;
  color:${headingColor};
  @media ${breakpoints.xs} {
      // font-size: 1.5rem;
      // line-height: 2rem;
    }
  }
`
);
const Container = styled.div`
  /* padding: 0.75rem 0.5rem; */
`;
const Form = styled.form`
  background-color: ${props => props.theme.overlayColor};
  border-radius: 12px;
  /* margin-bottom: 0.5rem; */
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0.75rem;
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
const NextButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  font-weight: ${props => props.theme.font.bold};
  border-radius: 5px;
  text-transform: uppercase;
  transition: background-color 75ms;
  &:hover {
    background-color: ${props => props.theme.btnPrimaryDark};
  }

  margin-top: 0.5rem;
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
