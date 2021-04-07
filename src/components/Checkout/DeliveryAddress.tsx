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
  const { t, i18n } = useTranslation(['checkout']);
  const { deliveryAddress } = useContext(ApplicationProvider);

  const [outOfBorder, setOutOfBorder] = useState(false);
  return (
    <Container>
      <StepNumber>2</StepNumber>
      <SectionTitle>{t('delivery-details-time')}</SectionTitle>
      <DashedLine rtl={i18n.language === 'ar'} />
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
const StepNumber = styled.span`
  padding: 0.5rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DashedLine = styled.span<{ rtl: boolean }>`
  border-right: ${props =>
    props.rtl ? 'none' : '2px dashed rgba(0, 0, 0, 0.1)'};
  border-left: ${props =>
    props.rtl ? '2px dashed rgba(0, 0, 0, 0.1)' : 'none'};
  margin-right: ${props => (props.rtl ? '0' : '17px')};
  margin-left: ${props => (props.rtl ? '17px' : '0')};
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 0.5rem;
  margin: 2rem 0;
  row-gap: 1rem;
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
  padding-top: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${overlayColor};
  display:grid;
  border-radius:6px;
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
  ({ theme: { breakpoints, font } }) => `
  font-weight:${font.bold};
 
 
 
  @media ${breakpoints.md} {
     
    }
  }
`
);

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
