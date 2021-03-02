import { useContext } from 'react';
import styled from 'styled-components';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
import { OMode } from '../../../contexts/ApplicationContext';
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';
import { OrderMode } from '../../../interfaces/orderModes';
interface IProps {
  orderMode: OrderMode;
  small?: boolean;
}

const OrderModeItem = ({ orderMode, small }: IProps) => {
  const { selectedOrderMode, handleOrderModeChange } = useContext(
    ApplicationProvider
  );
  return (
    <Container
      small={small}
      orderMode={selectedOrderMode}
      selected={selectedOrderMode === orderMode.value}
      onClick={() => {
        if (handleOrderModeChange) {
          handleOrderModeChange(orderMode.value);
        }
      }}
    >
      <TitleContainer>
        <Title>{orderMode.title}</Title>
      </TitleContainer>
      <IconContainer>
        {selectedOrderMode === orderMode.value ? (
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
  orderMode: OMode | undefined;
  selected: boolean;
  small?: boolean;
}>`
  padding: ${props => (props.small ? '.5rem' : '.75rem')};
  display: flex;
  align-items: center;
  color: #fff;
  background-color: ${props =>
    props.selected ? props.theme.mainColor : '#e0e0e0'};
  color: ${props => (props.selected ? '#e0e0e0' : props.theme.mainColor)};
  border-radius: 50px;
  font-weight: 500;
  font-size: ${props => (props.small ? '.8rem' : ' .9rem')};
  box-shadow: 6px 6px 11px #bebebe, -6px -6px 11px #ffffff;
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
`;
