import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
interface FormProps {
  first_name: string;
  last_name: string;
}
const schema = Yup.object().shape({
  phoneNumber: Yup.string().required('Required Field').min(5),
  password: Yup.string().required('Required Field').min(5),
});
const Info = () => {
  const { user } = useContext(ApplicationProvider);
  console.log(user);
  const { register, handleSubmit, errors } = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });
  const { t } = useTranslation(['profile']);
  return (
    <div>
      <Head>
        <Title>{t('your-info')}</Title>
        <Button>{t('update-info')}</Button>
      </Head>
      <Body>
        <InputContainer>
          <Label>{t('first-name')}</Label>
          <Input colored border name="first_name" ref={register} />
          {/* {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )} */}
        </InputContainer>
        <InputContainer>
          <Label>{t('last-name')}</Label>
          <Input colored border name="last_name" ref={register} />
          {/* {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )} */}
        </InputContainer>
        <InputContainer>
          <Label>{t('email')}</Label>
          <Input colored border readOnly />
          {/* {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )} */}
        </InputContainer>
        <InputContainer>
          <Label>{t('phonenumber')}</Label>
          <Input colored border readOnly disabled defaultValue={user?.phone} />
          {/* {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )} */}
        </InputContainer>
      </Body>
    </div>
  );
};

export default Info;
const Head = styled.div`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;
const Title = styled.h5`
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.bold};
`;
const Button = styled.button(
  ({ theme: { breakpoints, font, btnBorder, btnPrimaryLight, btnText } }) => `
  border-radius: 6px;
  background-color: ${btnPrimaryLight};
  border:${btnBorder};
  color: ${btnText};
  padding: 0.5rem;
  font-size:.8rem;
  // text-decoration:underline;
  font-weight: ${font.bold};
  letter-spacing:0.5px;
  @media ${breakpoints.md}{
    font-size:0.8rem;
    // padding: 0.25rem 0.5rem;
  }
`
);
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
