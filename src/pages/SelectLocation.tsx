import styled from 'styled-components';
import BackNav from '../components/BackNav/BackNav';
import Map from '../components/GoogleMap/Map';

const SelectLocation = () => {
  return (
    <Container>
      <BackNav title="select-location" />
      <Map />
    </Container>
  );
};

export default SelectLocation;
const Container = styled.div`
  height: calc(100vh - 100px);
  position: relative;
`;
