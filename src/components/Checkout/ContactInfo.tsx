import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ContactInfoProps } from '../../interfaces/ContactInfo';
const ContactInfo = () => {
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
      <FormContainer>
        <Title>Contact Info</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label>Full Name</Label>

            <Input name="name" ref={register} />

            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputContainer>
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
            <Label>Email Address</Label>

            <Input name="email" ref={register} />

            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
            )}
          </InputContainer>

          <NextButton type="submit">Next</NextButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ContactInfo;

const Container = styled.div``;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
  // font-size: 1.875rem; 
  // line-height: 2.25rem;
  text-align: center;
  margin-bottom: .5rem;
  color:#5F7999;
  @media ${breakpoints.xs} {
      // font-size: 1.5rem;
      // line-height: 2rem;
    }
  }
`
);
const FormContainer = styled.div`
  padding: 0.75rem 0.5rem;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const Form = styled.form`
  padding: 0.5rem 0.25rem;
`;
const InputContainer = styled.div`
  margin-bottom: 0.75rem;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.secondaryColor};
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
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
const NextButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  border-radius: 5px;
  text-transform: uppercase;
  margin-top: 0.5rem;
  text-align: center;
`;
const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
