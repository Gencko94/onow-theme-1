import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import BackNav from '../components/BackNav/BackNav';
import { UserInfoProvider } from '../contexts/UserInfoContext';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Address } from '../interfaces/Address';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import { editAddress } from '../utils/queries';
import Loader from 'react-loader-spinner';
import EditAddressMap from '../components/EditAddressMap';
import MobileHeader from '../components/Header/MobileHeader';
import Layout from '../layout/Layout';
import { m, Variants } from 'framer-motion';

interface EditedAddressForm {
  area: string | undefined;
  mapAddress?: string;
  street: string | undefined;
  floor?: string | undefined;
  block: string | undefined;
  additionalDirections?: string | undefined;
  building?: string | undefined;
}
const containerVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
  },
};
const EditAddress = () => {
  const { t } = useTranslation(['addresses']);
  const queryClient = useQueryClient();
  const { editedAddress } = useContext(UserInfoProvider);
  const [outOfBorder, setOutOfBorder] = useState<boolean>(false);

  const schema = useMemo(() => {
    return Yup.object().shape({
      mapAddress: Yup.string().required(t('required-field')).max(200),
      avenue: Yup.string().max(20),
      floor: Yup.string().max(20),
      block: Yup.string().required(t('required-field')).max(20),
      street: Yup.string().required(t('required-field')).max(50),
      additionalDirections: Yup.string().max(100),
      building: Yup.string().required(t('required-field')).max(20),
      area: Yup.string().required(t('required-field')).max(20),
    });
  }, []);

  const { mutateAsync: editUserAddress, isLoading: editLoading } = useMutation(
    editAddress,
    {
      onSuccess: data => {
        queryClient.setQueryData<Address[] | undefined>('addresses', prev => {
          const newAddresses = prev?.filter(i => i.id !== data.id);
          newAddresses?.push(data);
          return newAddresses;
        });
      },
    }
  );
  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm<EditedAddressForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      mapAddress: editedAddress?.mapAddress,
      block: editedAddress?.block,

      street: editedAddress?.street,
      building: editedAddress?.building,
      floor: editedAddress?.floor,
      additionalDirections: editedAddress?.additionalDirections,
      area: editedAddress?.area,
    },
  });

  const onSubmit = async (data: EditedAddressForm) => {
    if (editedAddress) {
      try {
        console.log(data);
        const res = await editUserAddress({
          address: {
            id: editedAddress.id,
            coords: {
              lat: editedAddress.coords.lat,
              lng: editedAddress.coords.lng,
            },
            ...data,
          },
        });
        console.log(res);

        history.push('/user/addresses');
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    reset({
      additionalDirections: editedAddress?.additionalDirections,
      area: editedAddress?.area,
      block: editedAddress?.block,
      building: editedAddress?.building,
      floor: editedAddress?.floor,
      mapAddress: editedAddress?.mapAddress,
      street: editedAddress?.street,
    });
  }, [editedAddress]);

  if (!editedAddress) {
    return <Redirect to="/user/addresses" />;
  }
  return (
    <Layout>
      <MobileHeader title="edit-address" />

      <ContentContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <MapContainer>
          <EditAddressMap
            outOfBorder={outOfBorder}
            setOutOfBorder={setOutOfBorder}
          />
        </MapContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label>{t('address')}*</Label>
            <Input colored border name="mapAddress" ref={register} />
            {errors.mapAddress && (
              <ErrorMessage>{errors.mapAddress.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputsContainer flex>
            <InputContainer>
              <Label>{t('area')}*</Label>
              <Input colored border name="area" ref={register} />
              {errors.area && (
                <ErrorMessage>{errors.area.message}</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>{t('block')}*</Label>
              <Input colored border name="block" ref={register} />
              {errors.block && (
                <ErrorMessage>{errors.block.message}</ErrorMessage>
              )}
            </InputContainer>
          </InputsContainer>
          <InputContainer>
            <Label>{t('street')}*</Label>
            <Input colored border name="street" ref={register} />
            {errors.street && (
              <ErrorMessage>{errors.street.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputsContainer flex>
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
          </InputsContainer>
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
          <SubmitButton
            outOfBorder={outOfBorder}
            disabled={outOfBorder}
            type="submit"
          >
            {editLoading ? (
              <Loader type="ThreeDots" color="#fff" height={20} width={30} />
            ) : (
              t('save')
            )}
          </SubmitButton>
        </Form>
      </ContentContainer>
    </Layout>
  );
};

export default EditAddress;

const ContentContainer = styled(m.div)(
  ({ theme: { breakpoints } }) => `
  padding: 0.5rem;
  display:grid;
  grid-template-columns:1fr;
  margin:0 auto;
  @media ${breakpoints.md}{
    max-width:960px;
    gap:1rem;
    grid-template-columns:0.5fr 1fr;
    margin-top:0.5rem;
  }
  @media ${breakpoints.lg}{
    max-width:1100px;
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
    height: 100%;
    margin-bottom:0;
    border-radius:10px;
    overflow:hidden;
   
  }
`
);

const Form = styled.form``;
const InputsContainer = styled.div<{ flex?: boolean }>`
  display: ${props => (props.flex ? 'grid' : 'block')};
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
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
const SubmitButton = styled.button<{ outOfBorder: boolean }>`
  padding: 0.5rem;
  background-color: ${props =>
    props.outOfBorder ? 'gray' : props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-top: 1rem;
  border: 1px solid ${props => props.theme.btnBorder};
  font-weight: ${props => props.theme.font.bold};
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
