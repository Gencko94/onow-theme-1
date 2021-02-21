import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Hero from '../components/Home/Hero/Hero';
import { branches } from '../data/branches';
import Layout from '../layout/Layout';
import MapLazyImage from '../utils/MapLazyImage';
import { Branch } from '../interfaces/branch';
import BranchModal from '../components/Branches/BranchModal';
import { useHistory } from 'react-router-dom';

const Branches = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<null | Branch>(null);
  const handleOpen = (branch: Branch) => {
    setModalOpen(true);
    setSelectedBranch(branch);
  };
  const { push } = useHistory();
  return (
    <Layout>
      <Hero />
      <Container>
        <Title>Our Branches</Title>
        <BranchesContainer>
          {branches.map(branch => (
            <BranchItem>
              <MapLazyImage
                height="200"
                width="200"
                lat={branch.coordinates?.lat}
                lng={branch.coordinates?.lng}
                alt={branch.name}
              />
              <BranchDetails>
                <BranchName>{branch.name}</BranchName>
                <OpeningHours>{branch.openingHours}</OpeningHours>
                <OpenNow isOpen={branch.openNow}>
                  {branch.openNow ? 'Open Now' : 'Closed'}
                </OpenNow>
                <ButtonsContainer>
                  <DetailsButton onClick={() => handleOpen(branch)}>
                    See Details
                  </DetailsButton>
                  <BookButton onClick={() => push('/booking')}>
                    Book Now
                  </BookButton>
                </ButtonsContainer>
              </BranchDetails>
            </BranchItem>
          ))}
        </BranchesContainer>
      </Container>
      <CSSTransition
        in={modalOpen}
        classNames="product-modal"
        timeout={{ enter: 200, exit: 300 }}
        unmountOnExit
        mountOnEnter
      >
        <BranchModal
          selectedBranch={selectedBranch}
          setModalOpen={setModalOpen}
        />
      </CSSTransition>
    </Layout>
  );
};

export default Branches;

const Container = styled.div`
  margin-top: 58px;
  padding: 1rem;
`;

const Title = styled.h1(
  ({ theme: { breakpoints, secondaryColor } }) => `
  font-size: 1.875rem; 
  line-height: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color:${secondaryColor};
  @media ${breakpoints.xs} {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`
);
const BranchesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;
const BranchItem = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;
  padding: 0.25rem;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const BranchDetails = styled.div`
  padding: 0.5rem;
`;
const BranchName = styled.h6``;
const OpeningHours = styled.p`
  color: ${props => props.theme.secondaryColor};
  font-size: 0.9rem;
`;
const OpenNow = styled.p`
  color: ${(props: { isOpen: boolean }) => (props.isOpen ? 'green' : 'red')};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  /* justify-content: center; */
`;
const DetailsButton = styled.button`
  /* display: block; */
  padding: 0.5rem;
  border-radius: 20px;
  color: #fff;
  background-color: ${props => props.theme.secondaryColor};
`;
const BookButton = styled.button`
  /* display: block; */
  margin: 0 0.25rem;
  background-color: ${props => props.theme.mainColor};
  padding: 0.5rem;
  border-radius: 20px;
  color: #fff;
`;
