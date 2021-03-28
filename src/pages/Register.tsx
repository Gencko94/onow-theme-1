import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { SocialAuth } from '../interfaces/loginForm';
import {
  AiFillFacebook,
  AiOutlineArrowLeft,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { GrApple } from 'react-icons/gr';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { REGISTER_FORM } from '../interfaces/auth';
import { userRegister } from '../utils/queries';
import { useMutation } from 'react-query';

const Register = () => {
  const { t, ready, i18n } = useTranslation(['auth']);
  const schema = useMemo(
    () =>
      Yup.object().shape({
        phone_number: Yup.string()
          .required('Required Field')
          .min(8, t('phone-validation')),
        password: Yup.string().required('Required Field').min(6, t('min-6')),
        email: Yup.string().email(),
      }),
    []
  );
  const [phoneKey] = useState('+965');
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState: { isSubmitting },
  } = useForm<REGISTER_FORM>({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: reg } = useMutation(userRegister, {
    onSuccess: data => {
      if (data.token) {
        localStorage.setItem('tpid', data.token);
        history.replace('/');
      }
    },
  });
  const onSubmit = async (data: REGISTER_FORM) => {
    try {
      await reg({
        password: data.password,
        phone_number: `${phoneKey}${data.phone_number}`,
        email: '',
      });
    } catch (error) {
      console.log(error.response);
      if (
        error.response.data.message === 'Phone Number or Password is Missing'
      ) {
        setError('password', {
          message: t('fields-missing-response'),
        });
        setError('phone_number', {
          message: t('fields-missing-response'),
        });
      } else if (error.response.data.message === 'User Already Existed') {
        setError('phone_number', {
          message: t('existing-user'),
        });
      } else {
        // show unknown error
      }
    }
  };
  const changeLanguage = (lng: string) => {
    if (ready) {
      i18n.changeLanguage(lng);
    }
  };
  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <LogoContainer to="/">
            <img src="/images/logo.png" alt="logo" />
          </LogoContainer>
        </Header>
        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
            <InputContainer>
              <Label>{t('password')}</Label>
              <PasswordInputContainer>
                <PasswordInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  ref={register}
                />
                <ShowPassword onClick={() => handleShowPassword()}>
                  {showPassword ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </ShowPassword>
              </PasswordInputContainer>

              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </InputContainer>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {t('register')}
            </SubmitButton>
          </Form>
        </FormContainer>
        <Footer>
          <Text>
            <Trans i18nKey="auth:have-an-account">
              Have an account ?<InlineLink to="/login">Login here</InlineLink>
            </Trans>
          </Text>
        </Footer>
        <LoginWithContainer>
          <SpanLine />
          <LoginWithText>{t('or-signup-with')}</LoginWithText>
          <SpanLine />
        </LoginWithContainer>
        <SocialLinksContainer>
          <SocialLink variant="facebook">
            <AiFillFacebook size={20} />
          </SocialLink>
          <SocialLink variant="instagram">
            <AiOutlineInstagram size={20} />
          </SocialLink>
          <SocialLink variant="apple">
            <GrApple size={20} />
          </SocialLink>
          <SocialLink variant="twitter">
            <AiOutlineTwitter size={20} />
          </SocialLink>
        </SocialLinksContainer>
      </ContentWrapper>

      <LanguageContainer>
        <>
          {i18n.language === 'ar' && (
            <Icon onClick={() => changeLanguage('en')}>English</Icon>
          )}
          {i18n.language === 'en' && (
            <Icon onClick={() => changeLanguage('ar')}>العربية</Icon>
          )}
        </>
      </LanguageContainer>
      <BackButtonContainer>
        <Icon>
          <AiOutlineArrowLeft size={20} />
        </Icon>
      </BackButtonContainer>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fontFamily};
  background-color: ${props => props.theme.bodyColor};
`;

const ContentWrapper = styled.div`
  /* width:100%; */
  max-width: 90%;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;
const LogoContainer = styled(Link)`
  display: block;
  width: 100px;
  height: 100px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 50%;
`;
const FormContainer = styled.div`
  padding: 0.75rem 0.75rem;
  border: ${props => props.theme.btnBorder};
  box-shadow: ${props => props.theme.shadow};
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  background: ${props => props.theme.overlayColor};
`;
const Form = styled.form`
  /* padding: 0.5rem 0.25rem; */
`;
const InputContainer = styled.div`
  margin-bottom: 0.25rem;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  font-weight: ${props => props.theme.font.semibold};
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
const Input = styled.input<{ border?: boolean; colored?: boolean }>`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  color: ${props => props.theme.subHeading};
  border: ${props => props.border && `1px solid ${props.theme.btnBorder}`};
  border-radius: ${props => props.border && '5px'};
  background-color: ${props => props.colored && props.theme.inputColorLight};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.dangerRed};
  height: 19.2px;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
const SubmitButton = styled.button<{ loading: boolean }>`
  width: 100%;
  padding: 0.5rem;
  background-color: ${props =>
    props.loading ? 'gray' : props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  font-weight: ${props => props.theme.font.regular};
  border-radius: 5px;
  border: ${props => props.theme.btnBorder};
  text-transform: uppercase;
  font-size: 0.9rem;
  transition: background-color 75ms;
  &:hover {
    background-color: ${props => props.theme.btnPrimaryDark};
  }
`;
const Footer = styled.div`
  padding: 0.5rem;
  text-align: center;
`;
const Text = styled.p`
  font-size: 0.8rem;
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 40px;
`;
const LanguageContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
`;
const InlineLink = styled(Link)`
  color: ${props => props.theme.dangerRed};
  font-weight: ${props => props.theme.font.regular};
  text-decoration: underline;
`;
const Icon = styled.button`
  color: ${props => props.theme.headingColor};
`;
const LoginWithContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const SpanLine = styled.span`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  flex: auto;
`;
const LoginWithText = styled.p`
  font-size: 0.8rem;
  margin: 0 0.5rem;
`;
const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const SocialLink = styled.div<{ variant: SocialAuth }>`
  background: ${props => {
    switch (props.variant) {
      case 'facebook':
        return '#4267B2';
      case 'twitter':
        return '#00acee';
      case 'instagram':
        return '#ff0099';
      case 'apple':
        return '#555555';

      default:
        break;
    }
  }};
  color: #fff;
  width: 40px;
  height: 40px;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
`;
const PasswordInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.btnBorder};
  background-color: ${props => props.theme.inputColorLight};
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
`;
