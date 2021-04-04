import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import styled from 'styled-components';
import { DELIVERY_LOCATION_TYPE } from '../DeliveryMode';

interface IProps {
  deliveryLocationType: DELIVERY_LOCATION_TYPE;
  setDeliveryLocationType: Dispatch<SetStateAction<DELIVERY_LOCATION_TYPE>>;
}

const DeliveryTypePicker = ({
  deliveryLocationType,
  setDeliveryLocationType,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Container>
      <DeliveryTypeContainer
        selected={deliveryLocationType === 'select'}
        onClick={() => {
          setDeliveryLocationType('select');
        }}
      >
        <TitleContainer>
          <Title>{t('select-from-list')}</Title>
        </TitleContainer>
        <IconContainer>
          {deliveryLocationType === 'select' ? (
            <BiRadioCircleMarked size={25} />
          ) : (
            <BiRadioCircle size={25} />
          )}
        </IconContainer>
      </DeliveryTypeContainer>
      <OrContainer>
        <SpanLine />
        <OrText>{t('or')}</OrText>
        <SpanLine />
      </OrContainer>
      <DeliveryTypeContainer
        selected={deliveryLocationType === 'map'}
        onClick={() => {
          setDeliveryLocationType('map');
        }}
      >
        <TitleContainer>
          <Title>{t('select-from-map')}</Title>
        </TitleContainer>
        <IconContainer>
          {deliveryLocationType === 'map' ? (
            <BiRadioCircleMarked size={25} />
          ) : (
            <BiRadioCircle size={25} />
          )}
        </IconContainer>
      </DeliveryTypeContainer>
    </Container>
  );
};

export default DeliveryTypePicker;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  align-self: flex-start;
  padding: 1rem 0;
`;

const DeliveryTypeContainer = styled.button<{
  selected: boolean;
}>`
  width: 100%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: ${props =>
    props.selected ? props.theme.highlightColor : props.theme.accentColor};
  color: ${props =>
    props.selected
      ? props => props.theme.highlightColorText
      : props.theme.headingColor};
  border-radius: 5px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: ${props => props.theme.shadow};
`;
const IconContainer = styled.span`
  margin: 0 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  text-align: center;
  font-weight: ${props => props.theme.font.bold};
`;

const OrContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SpanLine = styled.span`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  flex: auto;
`;
const OrText = styled.p`
  font-size: 0.8rem;
  margin: 0 0.5rem;
  font-weight: ${props => props.theme.font.regular};
`;
