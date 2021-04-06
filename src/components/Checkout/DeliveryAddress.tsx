import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import OrderTime from './OrderTime';
import { DeepMap, FieldError } from 'react-hook-form';
import { CHECKOUT_FORM } from '../../interfaces/checkoutForm';
interface IProps {
  register: any;
  errors: DeepMap<CHECKOUT_FORM, FieldError>;
}

const DeliveryAddress = ({ errors, register }: IProps) => {
  const { t } = useTranslation(['checkout']);
  const { deliveryAddress } = useContext(ApplicationProvider);

  const [outOfBorder, setOutOfBorder] = useState(false);
  return (
    <Container>
      {/* <BoxHead> */}

      <SectionTitle>{t('delivery-details')}</SectionTitle>
      <SectionBody coords={deliveryAddress?.coords ? true : false}>
        <InputsContainer>
          <InputContainer>
            <Label>{t('governorate')}</Label>
            <Input value={deliveryAddress?.governorate} readOnly />
            <ErrorMessage>{errors.governorate?.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>{t('area')}</Label>
            <Input value={deliveryAddress?.area} readOnly />
            <ErrorMessage>{errors.area?.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>{t('street')}</Label>
            <Input name="street" ref={register} />
            <ErrorMessage>{errors.street?.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>{t('block')}</Label>
            <Input name="block" ref={register} />
            <ErrorMessage>{errors.block?.message}</ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Label>{t('building')}</Label>
            <Input name="building" ref={register} />
            <ErrorMessage>{errors.building?.message}</ErrorMessage>
          </InputContainer>
        </InputsContainer>
        {deliveryAddress?.coords?.lat && (
          <MapContainer>
            <MapImage
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${deliveryAddress?.coords?.lat},${deliveryAddress?.coords?.lng}&zoom=15&size=500x500&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
            />
            <EditButton>Edit Location</EditButton>
          </MapContainer>
        )}
      </SectionBody>
    </Container>
  );
};

export default DeliveryAddress;
const Container = styled.div`
  /* background-color: ${props => props.theme.overlayColor}; */
  /* border-radius: 12px; */
  margin: 2rem 0;
  /* padding: 0.5rem; */
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  overflow: hidden;
`;
const InputsContainer = styled.div(
  ({ theme: { breakpoints, overlayColor } }) => `
  display:grid;
  gap:0.5rem;
  grid-template-columns: 1fr;
   @media ${breakpoints.md}{
     grid-template-columns: 1fr 1fr;
   }
   `
);
const SectionBody = styled.div<{ coords: boolean }>(
  ({ theme: { breakpoints, overlayColor }, coords }) => `
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${overlayColor};
  display:grid;
  @media ${breakpoints.md}{
    grid-template-columns: ${coords ? '1fr 0.5fr' : '1fr'};
  }
  `
);
const MapContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  height: 200px;
  width: 100%;
  position: relative;
  margin-bottom:1rem;
  @media ${breakpoints.md}{
    // height: 100%;
    margin-bottom:0;
    border-radius:10px;
    overflow:hidden;
   
  }
`
);
const SectionTitle = styled.h5(
  ({ theme: { breakpoints, font, headingColor } }) => `
  margin-bottom:0.5rem;
  font-weight:${font.bold};
 
 
 
  @media ${breakpoints.md} {
     
    }
  }
`
);

const Form = styled.form`
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
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
  background-color: ${props => props.theme.inputColorLight};
`;
const ErrorMessage = styled.p`
  color: #b72b2b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
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
