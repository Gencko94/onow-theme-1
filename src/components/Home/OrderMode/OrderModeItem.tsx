import { useContext } from 'react';
import styled from 'styled-components';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
import { OMode } from '../../../contexts/ApplicationContext';
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';
import { OrderMode } from '../../../interfaces/orderModes';
import { ThemeContext, ThemeMode } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
interface IProps {
  orderMode: OrderMode;
  small?: boolean;
}

const OrderModeItem = ({ orderMode, small }: IProps) => {
  const { selectedOrderMode, handleOrderModeChange } = useContext(
    ApplicationProvider
  );
  const { t } = useTranslation(['common', 'home']);
  const { mode } = useContext(ThemeContext);
  return (
    <Container
      mode={mode}
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
        <Title>{t(orderMode.title)}</Title>
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
  mode?: ThemeMode;
}>`
  padding: ${props => (props.small ? '.5rem .75rem' : '.75rem')};
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
  font-size: ${props => (props.small ? '.9rem' : ' .9rem')};
  // box-shadow: 6px 6px 11px #bebebe, -6px -6px 11px #ffffff;
  box-shadow: ${props => props.mode === 'light' && props.theme.shadow};
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
