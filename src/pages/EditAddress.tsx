import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import BackNav from '../components/BackNav/BackNav';
import { UserInfoProvider } from '../contexts/UserInfoContext';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Address } from '../interfaces/Address';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const schema = Yup.object().shape({
  mapAddress: Yup.string().required('Required Field').max(200),
  avenue: Yup.string().max(20),
  floor: Yup.string().max(20),
  block: Yup.string().required('Required Field').max(20),
  street: Yup.string().required('Required Field').max(20),
  additionalDirections: Yup.string().max(100),
  building: Yup.string().required('Required Field').max(20),
  area: Yup.string().required('Required Field').max(20),
});
const EditAddress = () => {
  const { editedAddress, handleSetEditedAddress } = useContext(
    UserInfoProvider
  );
  const history = useHistory();
  const { t } = useTranslation(['addresses']);
  const { register, handleSubmit, errors } = useForm<Address>({
    resolver: yupResolver(schema),
    defaultValues: {
      mapAddress: editedAddress?.mapAddress,
      block: editedAddress?.block,
      avenue: editedAddress?.avenue,
      street: editedAddress?.street,
      building: editedAddress?.building,
      floor: editedAddress?.floor,
      additionalDirections: editedAddress?.additionalDirections,
      area: editedAddress?.area,
    },
  });

  const onSubmit = (data: Address) => {
    console.log(data);
    history.push('/user/addresses');
    handleSetEditedAddress(null);
  };
  useEffect(() => {
    // TODO
    //fetch address information if editedAddress was not found eg:hard refresh of the page
  }, []);
  return (
    <Container>
      <BackNav title="edit-address" />
      <ContentContainer>
        <MapContainer>
          <MapImage
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${editedAddress?.coords.lat},${editedAddress?.coords.lng}&zoom=15&size=500x500&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
          />
          <EditButton>Edit Location</EditButton>
        </MapContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label>{t('address')}*</Label>
            <Input colored border name="mapAddress" ref={register} />
            {errors.mapAddress && (
              <ErrorMessage>{errors.mapAddress.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label>{t('area')}*</Label>
            <Input colored border name="area" ref={register} />
            {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <Label>{t('block')}*</Label>
            <Input colored border name="block" ref={register} />
            {errors.block && (
              <ErrorMessage>{errors.block.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label>{t('street')}*</Label>
            <Input colored border name="street" ref={register} />
            {errors.street && (
              <ErrorMessage>{errors.street.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label>{t('building')}*</Label>
            <Input colored border name="building" ref={register} />
            {errors.building && (
              <ErrorMessage>{errors.building.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label>{t('floor')}</Label>
            <Input colored border name="floor" ref={register} />
            {errors.floor && (
              <ErrorMessage>{errors.floor.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label>{t('additional-directions')}</Label>
            <AdditionalInstructionsText
              name="additionalDirections"
              ref={register}
            />
            {errors.additionalDirections && (
              <ErrorMessage>{errors.additionalDirections.message}</ErrorMessage>
            )}
          </InputContainer>
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default EditAddress;

const Container = styled.div``;
const ContentContainer = styled.div`
  padding: 0.5rem;
`;
const MapContainer = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
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
const Form = styled.form`
  padding: 1rem 0.25rem;
`;
const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.subHeading};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.bold};
  display: block;
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
  color: #b72b2b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
const SubmitButton = styled.button`
  padding: 0.5rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  width: 100%;
  border-radius: 6px;
`;
const AdditionalInstructionsText = styled.textarea`
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${props => props.theme.inputColorDark};
  color: ${props => props.theme.subHeading};
  border: ${props => `1px solid ${props.theme.btnBorder}`};
`;
