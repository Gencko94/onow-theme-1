import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Address as AddressInterface } from '../../interfaces/Address';
import { BsCheckCircle, BsFillHouseFill } from 'react-icons/bs';
import { BiBuilding } from 'react-icons/bi';
import { IoBusinessSharp } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { AiFillDelete } from 'react-icons/ai';

interface IProps {
  address: AddressInterface;
}

const Address: React.FC<IProps> = ({ address }) => {
  const { t } = useTranslation(['account']);
  const [showDetails, setShowDetails] = useState(false);
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
      <>
        <LocationType>{t(location)}</LocationType>
        <Icon>
          <I size={18} />
        </Icon>
      </>
    );
  };
  return (
    <Container showDetails={showDetails}>
      <AddressHeader>
        <div>
          <AddressTitle>{address.mapAddress}</AddressTitle>
          <LocationTypeContainer>
            <Label>{t('location-type')}</Label> :{getLocationType(address.type)}
          </LocationTypeContainer>
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
        <ShowDetailsButton onClick={() => setShowDetails(prev => !prev)}>
          {t(showDetails ? 'hide' : 'show')} {t('details')}
        </ShowDetailsButton>
        <RemoveButton>
          <AiFillDelete size={20} />
        </RemoveButton>
      </ButtonsContainer>
      <Details>
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
            <Label>{t('location-type')}</Label>
            <Info>{t(address.type)}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Avenue</Label>
            <Info>{address.avenue}</Info>
          </InfoContainer>
        </Block>
        <Label>Additional Details</Label>
        <AdditionalDetails>{address.additionalDetails}</AdditionalDetails>
      </Details>
    </Container>
  );
};

export default Address;

const Container = styled.div<{ showDetails: boolean }>`
  border-radius: 12px;
  background-color: ${props => props.theme.overlayColor};
  border: 1px solid ${props => props.theme.btnBorder};
  padding: 0.5rem;
  max-height: ${props => (props.showDetails ? '500px' : '109px')};
  /* overflow: ${props => (props.showDetails ? 'auto' : 'hidden')}; */
  overflow: hidden;
  transition: max-height 300ms;

  -webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
const AddressTitle = styled.h6`
  font-weight: ${props => props.theme.font.xbold};
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
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
const ShowDetailsButton = styled.button`
  border-radius: 8px;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  padding: 0.25rem 0.5rem;
  border: 1px solid ${props => props.theme.btnBorder};
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.bold};
`;
const RemoveButton = styled.button`
  color: ${props => props.theme.dangerRed};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Details = styled.div`
  margin: 0.5rem 0;
`;
const Label = styled.p`
  font-weight: ${props => props.theme.font.bold};
  display: block;
  font-size: 1rem;
  color: ${props => props.theme.headingColor};
`;
const Info = styled.p`
  font-weight: ${props => props.theme.font.semibold};
  color: ${props => props.theme.subHeading};
`;
const Block = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
`;
const InfoContainer = styled.div``;
const LocationTypeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
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
const AdditionalDetails = styled.p``;
