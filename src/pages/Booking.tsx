import styled from "styled-components";
import Hero from "../components/Home/Hero/Hero";
import Layout from "../layout/Layout";
import Select from "react-select";
import { branches } from "../data/branches";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
// import DatePicker from '../utils/DatePicker';
// import TimePicker from '../utils/TimePicker';

interface SelectProps {
  label: string;
  value: string;
}
type Inputs = {
  name: string;
  phone: string;
};

const Booking = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({});
  const [selectedBranch, setSelectedBranch] = useState<SelectProps | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  console.log(errors);
  const onSubmit = (data: Inputs) => {
    const info = {
      ...data,
      selectedBranch,
      selectedDate,
    };
    console.log(data);
  };
  const options = useMemo(() => {
    return branches.map((branch) => ({
      value: branch.value,
      label: branch.name,
    }));
  }, []);
  useEffect(() => {
    // setSelectedBranch(options[0].label);
  }, [options]);

  const handleBranchChange = (branch: SelectProps | null) => {
    setSelectedBranch(branch);
  };

  return (
    <Layout>
      <Hero />
      <Container>
        <Title>Booking</Title>
        <ContentContainer>
          <BranchTitle>Branch</BranchTitle>
          {/* <Select
            options={options}
            defaultValue={options[0]}
            onChange={handleBranchChange}
            isSearchable={false}
          /> */}
        </ContentContainer>
        <DateTimeWrapper>
          <DateTimeContainer>
            <DateTimeTitle>Date</DateTimeTitle>

            {/* <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            /> */}
          </DateTimeContainer>
          <DateTimeContainer>
            <DateTimeTitle>Time</DateTimeTitle>
            {/* <TimePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            /> */}
          </DateTimeContainer>
        </DateTimeWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label>Name</Label>
            {/* <Input name="name" ref={register} /> */}
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <Label>Phone Number</Label>
            {/* <Input name="phone" ref={register} /> */}
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </InputContainer>
          <AdditionalInstructionsTitle>
            Optional Notes
          </AdditionalInstructionsTitle>
          <AdditionalInstructionsText rows={3} />
          <SubmitButton type="submit">Book Appointment</SubmitButton>
        </Form>
      </Container>
    </Layout>
  );
};

export default Booking;
const Container = styled.div`
  margin-top: 58px;
  padding: 1rem;
`;
const ContentContainer = styled.div`
  padding: 0.5rem 0.25rem;
`;
const Title = styled.h1(
  ({ theme: { breakpoints, accentColor } }) => `
  font-size: 1.875rem; 
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color:${accentColor};
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
const BranchTitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.accentColor};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;
const DateTimeTitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.accentColor};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DateTimeWrapper = styled.div`
  padding: 0.5rem 0.25rem;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  /* align-items: center; */
  gap: 0.5rem;
`;
const Form = styled.form`
  padding: 0.5rem 0.25rem;
`;
const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.accentColor};
  margin-bottom: 0.5rem;
  display: block;
`;
const Input = styled.input`
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.25rem;
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
  background-color: ${(props) => props.theme.mainColor};
  color: #fff;
  border-radius: 8px;
  text-transform: uppercase;
  margin-top: 0.5rem;
`;
const AdditionalInstructionsTitle = styled.p`
  color: ${({ theme }) => theme.accentColor};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;
const AdditionalInstructionsText = styled.textarea`
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
`;
