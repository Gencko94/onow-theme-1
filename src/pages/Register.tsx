import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginForm, SocialAuth } from '../interfaces/loginForm';
import {
  AiFillFacebook,
  AiOutlineArrowLeft,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { GrApple } from 'react-icons/gr';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';

const Register = () => {
  const schema = Yup.object().shape({
    phoneNumber: Yup.string().required('Required Field').min(5),
    password: Yup.string().required('Required Field').min(5),
  });

  const { register, handleSubmit, errors } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data: LoginForm) => {
    // const info = {
    //   ...data,
    // };
    console.log(data);
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
              <Label>Phone Number</Label>
              <PhoneInputContainer>
                <PhoneKey>+965</PhoneKey>
                <PhoneInput name="phoneNumber" ref={register} />
              </PhoneInputContainer>
              {errors.phoneNumber && (
                <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Password</Label>
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
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </InputContainer>

            <SubmitButton type="submit">Register</SubmitButton>
          </Form>
        </FormContainer>
        <Footer>
          <Text>Have an account ? Log in here</Text>
        </Footer>
        <LoginWithContainer>
          <SpanLine />
          <LoginWithText>Or Login with</LoginWithText>
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
        <Icon>العربية</Icon>
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
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const Form = styled.form`
  padding: 0.5rem 0.25rem;
`;
const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.secondaryColor};
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  display: block;
`;
const PhoneInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const PhoneKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  font-size: 0.9rem;
`;
const PhoneInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  color: #b72b2b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  border-radius: 5px;
  text-transform: uppercase;
  margin-top: 0.5rem;
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
  left: 50px;
`;
const LanguageContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
`;

const Icon = styled.button``;

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
  width: 30px;
  height: 30px;
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
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const PasswordInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
`;
const ShowPassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
`;
