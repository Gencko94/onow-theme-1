import { Dispatch, SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { locationTypes } from '../../data/locationTypes';
import { CheckoutFormInputs } from '../../interfaces/checkoutForm';
import { LocationT } from '../../interfaces/LocationTypes';
import OrderTime from './OrderTime';

interface IProps {
  register: any;
  errors: any;
  handleSubmit: any;
  onSubmit: (data: CheckoutFormInputs) => void;
  locationType: LocationT;
  setLocationType: Dispatch<SetStateAction<LocationT>>;
}

const DeliveryAddress = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  locationType,
  setLocationType,
}: IProps) => {
  const { deliveryAddress } = useContext(ApplicationProvider);
  return (
    <Box>
      <BoxHead>
        <Title>Delivery Details</Title>
        <Subtitle>Select location type </Subtitle>
      </BoxHead>
      <LocationTypesContainer>
        {locationTypes.map(({ title, Icon }) => (
          <LocationType
            onClick={() => setLocationType(title)}
            active={locationType === title}
            key={title}
          >
            <LocationTypeIcon>
              <Icon size={20} />
            </LocationTypeIcon>
            <LocationTypeName>{title}</LocationTypeName>
          </LocationType>
        ))}
      </LocationTypesContainer>
      <DeliveryAddressContainer>
        <Subtitle>Deliver to</Subtitle>
        {deliveryAddress ? (
          <ChangeButton to="/location">Change</ChangeButton>
        ) : (
          <LocationPrompt to="/location">
            Select your Delivery location
          </LocationPrompt>
        )}
      </DeliveryAddressContainer>
      {deliveryAddress && (
        <AddressText>{deliveryAddress.physicalAddress}</AddressText>
      )}
      {deliveryAddress && <OrderTime title="Delivery Time" />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {locationType === 'House' && (
          <InputContainer>
            <Label>House no</Label>
            <Input name="name" ref={register} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputContainer>
        )}
        <InputContainer>
          <Label>Avenue</Label>
          <Input name="phone" ref={register} />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </InputContainer>
        {locationType === 'Office' && (
          <InputContainer>
            <Label>Office no</Label>
            <Input name="phone" ref={register} />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </InputContainer>
        )}
        {locationType === 'Apartment' && (
          <InputContainer>
            <Label>Apt no</Label>
            <Input name="phone" ref={register} />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </InputContainer>
        )}
        <InputContainer>
          <Label>Street</Label>
          <Input name="phone" ref={register} />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>Block</Label>
          <Input name="phone" ref={register} />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </InputContainer>
      </Form>
    </Box>
  );
};

export default DeliveryAddress;
const Box = styled.div`
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
`;
const BoxHead = styled.div`
  padding: 0.25rem 0;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
`;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
  
  text-align: center;
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const Subtitle = styled.p<{ bold?: boolean }>`
  text-align: center;
  font-size: 1rem;
  font-weight: ${props => props.bold && '600'};
`;
const LocationTypesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
`;
const LocationType = styled.div<{ active: boolean }>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.active && props.theme.mainColor};
  color: ${props => props.active && '#fff'};
`;
const LocationTypeName = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
`;
const LocationTypeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.25rem 0;
`;
const DeliveryAddressContainer = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LocationPrompt = styled(Link)`
  font-weight: 500;
  display: block;
  font-size: 0.9rem;
  text-decoration: underline;
`;
const ChangeButton = styled(Link)`
  border-radius: 12px;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  margin: 0 0.25rem;
`;
const AddressText = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
`;
const Form = styled.form`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
`;
const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  margin-bottom: 0.25rem;
  display: block;
  font-size: 0.8rem;
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
