import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import styled from 'styled-components';
import * as Yup from 'yup';
interface FormProps {
  password: string;
}
const schema = Yup.object().shape({
  phoneNumber: Yup.string().required('Required Field').min(5),
  password: Yup.string().required('Required Field').min(5),
});
const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });
  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const { t } = useTranslation(['profile']);
  return (
    <div>
      <Head>
        <Title>{t('password')}</Title>
        <Button>{t('update-password')}</Button>
      </Head>
      <Body>
        <InputContainer>
          <Label>{t('old-password')}</Label>
          <PasswordInputContainer>
            <PasswordInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              ref={register}
            />
            <ShowPassword onClick={() => handleShowPassword()}>
              {showPassword ? (
                <MdVisibilityOff size={21} />
              ) : (
                <MdVisibility size={21} />
              )}
            </ShowPassword>
          </PasswordInputContainer>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <Label>{t('new-password')}</Label>
          <PasswordInputContainer>
            <PasswordInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              ref={register}
            />
            <ShowPassword onClick={() => handleShowPassword()}>
              {showPassword ? (
                <MdVisibilityOff size={21} />
              ) : (
                <MdVisibility size={21} />
              )}
            </ShowPassword>
          </PasswordInputContainer>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <Label>{t('confirm-new-password')}</Label>
          <PasswordInputContainer>
            <PasswordInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              ref={register}
            />
            <ShowPassword onClick={() => handleShowPassword()}>
              {showPassword ? (
                <MdVisibilityOff size={21} />
              ) : (
                <MdVisibility size={21} />
              )}
            </ShowPassword>
          </PasswordInputContainer>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputContainer>
      </Body>
    </div>
  );
};

export default ChangePassword;
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
const PasswordInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.inputColorLight};
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.btnBorder};
`;
const PasswordInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  color: ${props => props.theme.subHeading};
`;
const ShowPassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-left: 1px solid rgba(0, 0, 0, 0.1); */
  padding: 0.5rem;
  background-color: ${props => props.theme.inputColorLight};
`;
const ErrorMessage = styled.p`
  color: #b72b2b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
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
