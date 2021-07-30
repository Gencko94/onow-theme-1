import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { DELIVERY_ADDRESS } from "../../interfaces/Address";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { useHistory } from "react-router";
import { UserInfoProvider } from "../../contexts/UserInfoContext";
import { useMutation, useQueryClient } from "react-query";
import { deleteAddress } from "../../utils/queries";
import { up } from "../../utils/themes";

interface IProps {
  address: DELIVERY_ADDRESS;
}

const Address: React.FC<IProps> = ({ address }) => {
  const { t } = useTranslation(["addresses"]);
  const history = useHistory();
  const queryClient = useQueryClient();
  const { handleSetEditedAddress } = useContext(UserInfoProvider);
  const { mutateAsync } = useMutation(deleteAddress, {
    onSuccess: () => {
      queryClient.setQueryData<DELIVERY_ADDRESS[] | undefined>(
        "addresses",
        (prev) => {
          return prev?.filter((i) => i.id !== address.id);
        }
      );
    },
  });
  const handleDelete = async () => {
    if (address.id) {
      try {
        await mutateAsync({ id: address.id });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <AddressHeader>
        <div>
          <AddressTitle>{`${address.street}, ${address.block}`}</AddressTitle>
          <Label>
            {t("area")} :{address.area}
          </Label>
          <Label>
            {t("block")} : {address.block}
          </Label>
        </div>
        {address.default ? (
          <DefaultLocationContainer>
            <DefaultText>{t("default")}</DefaultText>
            <Icon>
              <BsCheckCircle size={20} />
            </Icon>
          </DefaultLocationContainer>
        ) : (
          <SetDefaultLocation>{t("set-default")}</SetDefaultLocation>
        )}
      </AddressHeader>

      <ButtonsContainer>
        <EditButton
          onClick={() => {
            handleSetEditedAddress(address);
            history.push(`/address/edit`);
          }}
          col="w"
        >
          <DefaultText>{t("edit")}</DefaultText>
          <AiTwotoneEdit size={18} />
        </EditButton>
        <RemoveButton onClick={() => handleDelete()} col="r">
          <DefaultText>{t("delete")}</DefaultText>
          <AiFillDelete size={18} />
        </RemoveButton>
      </ButtonsContainer>
    </Container>
  );
};

export default Address;

const Container = styled.div`
  border-radius: 8px;
  background: ${(props) => props.theme.overlayColor};
  border: ${(props) => props.theme.btnBorder};
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0.5rem;
`;
const AddressTitle = styled.h6(
  ({ theme: { breakpoints, headingColor, font } }) => `
  font-weight: ${font.semibold};

  font-size: 1.1rem;
  color: ${headingColor};
  ${up(breakpoints.md)}{
    
    font-size: 1.1rem;
  }
`
);
const AddressHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 0.25rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;
const DefaultLocationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.green};
  align-self: flex-start;
  padding: 0.25rem 0;
  font-weight: ${(props) => props.theme.font.semibold};
`;
const SetDefaultLocation = styled.button`
  font-weight: ${(props) => props.theme.font.semibold};
  align-self: flex-start;
  font-size: 0.7rem;
  color: ${(props) => props.theme.green};
  padding: 0.25rem 0;
  &:hover {
    text-decoration: underline;
  }
`;
const DefaultText = styled.p`
  font-size: 0.8rem;
  margin: 0 0.25rem;
`;

const EditButton = styled.button<{ col: string }>`
  color: ${(props) =>
    props.col === "r" ? props.theme.dangerRed : props.theme.subHeading};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: ${(props) => props.theme.font.semibold};
`;
const RemoveButton = styled.button<{ col: string }>`
  color: ${(props) =>
    props.col === "r" ? props.theme.dangerRed : props.theme.subHeading};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.btnPrimaryDark};
  padding: 0.25rem;
  border-radius: 6px;
  font-weight: ${(props) => props.theme.font.semibold};
  color: ${(props) => props.theme.btnText};
`;

const Label = styled.p`
  font-weight: ${(props) => props.theme.font.regular};
  display: block;
  font-size: 1rem;
  color: ${(props) => props.theme.subHeading};
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
