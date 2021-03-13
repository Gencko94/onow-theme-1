import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Address as AddressInterface } from '../../interfaces/Address';
import { BsCheckCircle, BsFillHouseFill } from 'react-icons/bs';
import { BiBuilding } from 'react-icons/bi';
import { IoBusinessSharp } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { useHistory } from 'react-router';
import { UserInfoProvider } from '../../contexts/UserInfoContext';

interface IProps {
  address: AddressInterface;
}

const Address: React.FC<IProps> = ({ address }) => {
  const { t } = useTranslation(['account']);
  const history = useHistory();
  const { handleSetEditedAddress } = useContext(UserInfoProvider);
  const getLocationType = (location: 'house' | 'office' | 'apartment') => {
    let I: IconType;

    switch (location) {
      case 'house':
        I = BsFillHouseFill;
        break;
      case 'apartment':
        I = BiBuilding;
        break;
      case 'office':
        I = IoBusinessSharp;
        break;

      default:
        I = BsFillHouseFill;
        break;
    }
    return (
      <LocationTypeContainer>
        <LocationType>{t(location)}</LocationType>
        <Icon>
          <I size={18} />
        </Icon>
      </LocationTypeContainer>
    );
  };
  return (
    <Container>
      <AddressHeader>
        <div>
          <AddressTitle>{address.mapAddress}</AddressTitle>
          <Label>Area :{address.area}</Label>
          <Label>Block : {address.block}</Label>
        </div>
        {address.default ? (
          <DefaultLocationContainer>
            <DefaultText>{t('default')}</DefaultText>
            <Icon>
              <BsCheckCircle size={20} />
            </Icon>
          </DefaultLocationContainer>
        ) : (
          <SetDefaultLocation>Set Default</SetDefaultLocation>
        )}
      </AddressHeader>

      <ButtonsContainer>
        {/* <ShowDetailsButton onClick={() => setShowDetails(prev => !prev)}>
          {t(showDetails ? 'hide' : 'show')} {t('details')}
        </ShowDetailsButton> */}
        <EditButton
          onClick={() => {
            handleSetEditedAddress(address);
            history.push('/address/edit');
          }}
          col="w"
        >
          <DefaultText>Edit</DefaultText>
          <AiTwotoneEdit size={18} />
        </EditButton>
        <RemoveButton col="r">
          <DefaultText>Delete</DefaultText>
          <AiFillDelete size={18} />
        </RemoveButton>
      </ButtonsContainer>
      {/* <Details>
        <Block>
          <InfoContainer>
            <Label>Block</Label>
            <Info>{address.block}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Avenue</Label>
            <Info>{address.avenue}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>{t('location-type')}:</Label>
          
            <Info>{getLocationType(address.type)}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Avenue</Label>
            <Info>{address.avenue}</Info>
          </InfoContainer>
        </Block>
        <Label>Additional Details</Label>
        <AdditionalDetails>{address.additionalDetails}</AdditionalDetails>
      </Details> */}
    </Container>
  );
};

export default Address;

const Container = styled.div`
  border-radius: 12px;
  background-color: ${props => props.theme.overlayColor};
  border: 1px solid ${props => props.theme.btnBorder};
  padding: 0.5rem;
`;
const AddressTitle = styled.h6`
  font-weight: ${props => props.theme.font.xbold};

  font-size: 1.1rem;
  color: ${props => props.theme.headingColor};
`;
const AddressHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 0.25rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;
const DefaultLocationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.green};
  align-self: flex-start;
  padding: 0.25rem 0;
`;
const SetDefaultLocation = styled.button`
  align-self: flex-start;
  font-size: 0.7rem;
  color: ${props => props.theme.green};
  padding: 0.25rem 0;
  &:hover {
    text-decoration: underline;
  }
`;
const DefaultText = styled.p`
  font-size: 0.7rem;
  font-weight: ${props => props.theme.font.semibold};
  margin: 0 0.25rem;
`;

const EditButton = styled.button<{ col: string }>`
  color: ${props =>
    props.col === 'r' ? props.theme.dangerRed : props.theme.subHeading};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;
const RemoveButton = styled.button<{ col: string }>`
  color: ${props =>
    props.col === 'r' ? props.theme.dangerRed : props.theme.subHeading};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.btnPrimaryDark};
  padding: 0.25rem;
  border-radius: 6px;
  color: ${props => props.theme.btnText};
`;

const Label = styled.p`
  font-weight: ${props => props.theme.font.bold};
  display: block;
  font-size: 1rem;
  color: ${props => props.theme.subHeading};
`;

const LocationTypeContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LocationType = styled.p`
  font-weight: ${props => props.theme.font.bold};
  margin: 0 0.25rem;
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
