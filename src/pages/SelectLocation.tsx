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
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
  height: calc(100vh - 50px);
  position: relative;
  margin: 0 auto;
  @media ${breakpoints.md}{
    max-width:960px;
  }
  @media ${breakpoints.lg}{
    max-width:1100px;
  }
  `
);
