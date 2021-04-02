import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { CheckoutFormInputs } from '../../interfaces/checkoutForm';
import OrderTime from './OrderTime';

interface IProps {
  register: any;
  errors: any;
  handleSubmit: any;
  onSubmit: (data: CheckoutFormInputs) => void;
}

const DeliveryAddress = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
}: IProps) => {
  const { t } = useTranslation(['checkout']);
  const { deliveryAddress } = useContext(ApplicationProvider);
  return (
    <Box>
      <BoxHead>
        <Title>{t('delivery-details')}</Title>
      </BoxHead>

      {deliveryAddress && <OrderTime title="delivery-time" />}
      <MapContainer>
        <MapImage
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${deliveryAddress?.coords?.lat},${deliveryAddress?.coords?.lng}&zoom=15&size=500x500&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        />
        <EditButton>Edit Location</EditButton>
      </MapContainer>
      <DeliveryAddressContainer>
        <Subtitle bold>{t('deliver-to')}</Subtitle>
        {deliveryAddress ? (
          <ChangeButton to="/location">{t('change')}</ChangeButton>
        ) : (
          <LocationPrompt to="/location">{t('delivery-prompt')}</LocationPrompt>
        )}
      </DeliveryAddressContainer>
      {deliveryAddress && (
        <AddressText>{`${deliveryAddress.street}, ${deliveryAddress.block}`}</AddressText>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>{t('street')}</Label>
          <Input name="phone" ref={register} />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>{t('block')}</Label>
          <Input name="phone" ref={register} />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </InputContainer>
      </Form>
    </Box>
  );
};

export default DeliveryAddress;
const Box = styled.div`
  /* background-color: ${props => props.theme.overlayColor}; */
  /* border-radius: 12px; */
  margin-bottom: 0.5rem;
  /* padding: 0.5rem; */
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const BoxHead = styled.div`
  padding: 0.5rem;

  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  /* background: #fff; */
`;
const Title = styled.h5(
  ({ theme: { breakpoints, font, headingColor } }) => `
  
  font-weight:${font.bold};
 
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const Subtitle = styled.p<{ bold?: boolean }>`
  text-align: center;
  font-size: 1rem;
  font-weight: ${props =>
    props.bold ? props.theme.font.bold : props.theme.font.semibold};
`;
const LocationTypesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
`;
const LocationType = styled.div<{ active: boolean }>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active ? props.theme.highlightColor : props.theme.inputColorLight};
  color: ${props =>
    props.active ? props.theme.highlightColorText : props.theme.subHeading};
`;
const LocationTypeName = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.bold};
`;
const LocationTypeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.25rem 0;
`;
const DeliveryAddressContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LocationPrompt = styled(Link)`
  font-weight: 500;
  display: block;
  font-size: 0.9rem;
  text-decoration: underline;
  padding: 0 0.5rem;
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
  padding: 0 0.5rem;
  font-weight: ${props => props.theme.font.bold};
`;
const Form = styled.form`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  padding: 0.5rem;
`;
const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  margin-bottom: 0.25rem;
  display: block;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.bold};
`;
const Input = styled.input`
  border-radius: 5px;
  border: 1px solid ${props => props.theme.btnBorder};
  padding: 0.25rem;
  width: 100%;
  font-size: 0.9rem;
  background-color: ${props => props.theme.inputColorLight};
`;
const ErrorMessage = styled.p`
  color: #b72b2b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
const MapContainer = styled.div`
  height: 150px;
  width: 100%;
  position: relative;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;
const MapImage = styled.img`
  max-height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
`;
const EditButton = styled.button`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  padding: 0.25rem 0.5rem;
  z-index: 999px;
`;
