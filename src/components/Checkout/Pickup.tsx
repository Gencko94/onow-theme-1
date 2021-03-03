import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';

import Modal from '../Modal/Modal';
import OrderTime from './OrderTime';

const Pickup = () => {
  const { branch } = useContext(ApplicationProvider);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box>
      <BoxHead>
        <Title>Pick up Details</Title>
      </BoxHead>
      <PickupContainer>
        <Subtitle>Ordering from :</Subtitle>
        {branch ? (
          <ChangeButton onClick={() => setModalOpen(true)}>Change</ChangeButton>
        ) : (
          <Prompt onClick={() => setModalOpen(true)}>
            Select Pickup branch
          </Prompt>
        )}
      </PickupContainer>
      {branch && <PickupBranch>{branch.name}</PickupBranch>}
      {branch && <OrderTime title="Pickup Time" />}
      <Modal
        title="Select Pickup Branch"
        closeModal={() => setModalOpen(false)}
        modalOpen={modalOpen}
      />
    </Box>
  );
};

export default Pickup;

const Box = styled.div`
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
`;
const BoxHead = styled.div`
  padding: 0.25rem 0;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
`;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
  margin-bottom:.25rem;
  text-align: center;
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const Subtitle = styled.p`
  text-align: center;
  font-size: 1rem;
`;
const PickupContainer = styled.div`
  padding: 0.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ChangeButton = styled.button`
  border-radius: 12px;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  margin: 0 0.25rem;
`;
const PickupBranch = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;
const Prompt = styled.button`
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: underline;
`;
