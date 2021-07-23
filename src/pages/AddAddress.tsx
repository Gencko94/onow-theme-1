import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { UserInfoProvider } from "../contexts/UserInfoContext";
import { useForm } from "react-hook-form";
import { DELIVERY_ADDRESS } from "../interfaces/Address";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { addAddress } from "../utils/queries";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import MobileHeader from "../components/Header/MobileHeader";
import AddAddressMap from "../components/AddAddressMap";

interface EditedAddressForm {
  area: string | undefined;
  mapAddress?: string;
  street: string | undefined;
  floor?: string | undefined;
  block: string | undefined;
  additionalDirections?: string | undefined;
  building?: string | undefined;
}

const AddAddress = () => {
  const [outOfBorder, setOutOfBorder] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { newAddress } = useContext(UserInfoProvider);

  const { mutateAsync: addNewAddress, isLoading } = useMutation(addAddress, {
    onSuccess: (data) => {
      queryClient.setQueryData<DELIVERY_ADDRESS[] | undefined>(
        "addresses",
        (prev) => {
          if (prev) {
            return [...prev, data];
          }
        }
      );
    },
  });
  const history = useHistory();

  const { t } = useTranslation(["addresses"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditedAddressForm>({
    defaultValues: {
      block: newAddress.block,

      street: newAddress.street,
      building: "",
      floor: "",
      area: newAddress.area,
    },
  });

  const onSubmit = async (data: EditedAddressForm) => {
    if (newAddress && newAddress.coords) {
      try {
        console.log(data);
        const res = await addNewAddress({
          id: newAddress.id,
          coords: {
            lat: newAddress.coords.lat,
            lng: newAddress.coords.lng,
          },
          ...data,
        });
        console.log(res);
        // h(null);
        history.push("/user/addresses");
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    reset({
      additionalDirections: newAddress?.additionalDirections,
      area: newAddress?.area,
      block: newAddress?.block,
      building: newAddress?.building,
      floor: newAddress?.floor,
      street: newAddress?.street,
    });
  }, [newAddress]);
  return (
    <Layout>
      {/* <BackNav title="add-location" target="addAddress" /> */}
      <MobileHeader title="add-address" />
      <ContentContainer>
        <MapContainer>
          <AddAddressMap
            setOutOfBorder={setOutOfBorder}
            outOfBorder={outOfBorder}
          />
        </MapContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <InputContainer>
            <Label>{t("address")}*</Label>
            <Input colored border name="mapAddress" ref={register} />
            {errors.mapAddress && (
              <ErrorMessage>{errors.mapAddress.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputsContainer flex>
            <InputContainer>
              <Label>{t("area")}*</Label>
              <Input colored border name="area" ref={register} />
              {errors.area && (
                <ErrorMessage>{errors.area.message}</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>{t("block")}*</Label>
              <Input colored border name="block" ref={register} />
              {errors.block && (
                <ErrorMessage>{errors.block.message}</ErrorMessage>
              )}
            </InputContainer>
          </InputsContainer>
          <InputContainer>
            <Label>{t("street")}*</Label>
            <Input colored border name="street" ref={register} />
            {errors.street && (
              <ErrorMessage>{errors.street.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputsContainer flex>
            <InputContainer>
              <Label>{t("building")}*</Label>
              <Input colored border name="building" ref={register} />
              {errors.building && (
                <ErrorMessage>{errors.building.message}</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>{t("floor")}</Label>
              <Input colored border name="floor" ref={register} />
              {errors.floor && (
                <ErrorMessage>{errors.floor.message}</ErrorMessage>
              )}
            </InputContainer>
          </InputsContainer>
          <InputContainer>
            <Label>{t("additional-directions")}</Label>
            <AdditionalInstructionsText
              name="additionalDirections"
              ref={register}
            />
            {errors.additionalDirections && (
              <ErrorMessage>{errors.additionalDirections.message}</ErrorMessage>
            )}
          </InputContainer> */}
          <SubmitButton type="submit">
            {isLoading ? (
              <Loader type="ThreeDots" color="#fff" height={20} width={30} />
            ) : (
              t("save")
            )}
          </SubmitButton>
        </Form>
      </ContentContainer>
    </Layout>
  );
};

export default AddAddress;

const ContentContainer = styled.div(
  ({ theme: { breakpoints } }) => `
  padding: 0.5rem;
  display:grid;
  grid-template-columns:1fr;
  margin:0 auto;
  @media ${breakpoints.md}{
    max-width:960px;
    gap:1rem;
    grid-template-columns:0.5fr 1fr;
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
const MapImage = styled.img`
  max-height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
`;
const EditButton = styled(Link)`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  background-color: ${(props) => props.theme.btnPrimaryLight};
  color: ${(props) => props.theme.btnText};
  padding: 0.25rem 0.75rem;
  z-index: 999px;
`;
const Form = styled.form``;
const InputsContainer = styled.div<{ flex?: boolean }>`
  display: ${(props) => (props.flex ? "grid" : "block")};
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
  font-weight: ${(props) => props.theme.font.bold};
  display: block;
`;
const Input = styled.input<{ border?: boolean; colored?: boolean }>`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  color: ${(props) => props.theme.subHeading};
  border: ${(props) => props.border && `1px solid ${props.theme.btnBorder}`};
  border-radius: ${(props) => props.border && "5px"};
  background-color: ${(props) => props.colored && props.theme.inputColorLight};
`;

const ErrorMessage = styled.p`
  color: #b72b2b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
const SubmitButton = styled.button`
  padding: 0.5rem;
  background-color: ${(props) => props.theme.btnPrimaryLight};
  color: ${(props) => props.theme.btnText};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-top: 1rem;
  border: 1px solid ${(props) => props.theme.btnBorder};
  font-weight: ${(props) => props.theme.font.bold};
`;
const AdditionalInstructionsText = styled.textarea`
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  background-color: ${(props) => props.theme.inputColorLight};
  color: ${(props) => props.theme.subHeading};
  border: ${(props) => `1px solid ${props.theme.btnBorder}`};
`;
