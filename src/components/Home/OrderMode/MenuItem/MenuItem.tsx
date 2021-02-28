import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../../../contexts/ApplicationContext';
import { OMode } from '../../../../contexts/ApplicationContext';
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';
interface IProps {
  menu: {
    title: string;
    // icon?: any;
    value: OMode;
  };
}

const MenuItem = ({ menu }: IProps) => {
  const { orderMode, handleOrderModeChange } = useContext(ApplicationProvider);
  return (
    <Container
      orderMode={orderMode}
      selected={orderMode === menu.value}
      onClick={() => {
        if (handleOrderModeChange) {
          handleOrderModeChange(menu.value);
        }
      }}
    >
      <TitleContainer>
        <Title>{menu.title}</Title>
      </TitleContainer>
      <IconContainer>
        {orderMode === menu.value ? (
          <BiRadioCircleMarked size={25} />
        ) : (
          <BiRadioCircle size={25} />
        )}
      </IconContainer>
    </Container>
  );
};

export default MenuItem;

const Container = styled.button<{
  orderMode: OMode | undefined;
  selected: boolean;
}>`
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: ${props =>
    props.selected ? props.theme.mainColor : '#e0e0e0'};
  color: ${props => (props.selected ? '#e0e0e0' : props.theme.mainColor)};
  border-radius: 50px;
  font-weight: 500;
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
  font-size: 0.9rem;
  text-align: center;
`;
