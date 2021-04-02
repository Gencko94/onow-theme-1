import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { OMode } from '../../../contexts/ApplicationContext';
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';
import { OrderMode } from '../../../interfaces/orderModes';
import { useTranslation } from 'react-i18next';
interface IProps {
  item: OrderMode;
  small?: boolean;
  orderMode: OMode;
  setOrderMode: Dispatch<SetStateAction<OMode>>;
}

const OrderModeItem = ({ item, small, orderMode, setOrderMode }: IProps) => {
  const { t } = useTranslation(['common', 'home']);
  return (
    <Container
      selected={orderMode === item.value}
      onClick={() => {
        setOrderMode(item.value);
      }}
    >
      <TitleContainer>
        <Title>{t(item.title)}</Title>
      </TitleContainer>
      <IconContainer>
        {orderMode === item.value ? (
          <BiRadioCircleMarked size={25} />
        ) : (
          <BiRadioCircle size={25} />
        )}
      </IconContainer>
    </Container>
  );
};

export default OrderModeItem;

const Container = styled.button<{
  selected: boolean;
}>`
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
  border-radius: 20px 5px;
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
