import OrderModeItem from './OrderModeItem';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { OMode } from '../../../contexts/ApplicationContext';
import { orderModes } from '../../../data/orderModes';

interface IProps {
  orderMode: OMode;
  setOrderMode: Dispatch<SetStateAction<OMode>>;
}

const OrderModePicker = ({ orderMode, setOrderMode }: IProps) => {
  return (
    <Container>
      <GridContainer>
        {orderModes.map(item => (
          <OrderModeItem
            key={item.title}
            item={item}
            orderMode={orderMode}
            setOrderMode={setOrderMode}
          />
        ))}
      </GridContainer>
    </Container>
  );
};

export default OrderModePicker;

const Container = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;
