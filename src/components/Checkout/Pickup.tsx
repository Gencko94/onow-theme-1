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
  background-color: ${props => props.theme.overlayColor};
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* padding: 0.5rem; */
  overflow: hidden;
`;
const BoxHead = styled.div`
  padding: 0.5rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
`;
const Title = styled.h5(
  ({ theme: { breakpoints } }) => `
  text-align: center;
 
 
  @media ${breakpoints.xs} {
     
    }
  }
`
);
const Subtitle = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: ${props => props.theme.font.semibold};
`;
const PickupContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ChangeButton = styled.button`
  border-radius: 12px;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-weight: ${props => props.theme.font.bold};
  margin: 0 0.25rem;
`;
const PickupBranch = styled.p`
  font-size: 1.1rem;
  font-weight: ${props => props.theme.font.bold};
  padding: 0 0.5rem;
`;
const Prompt = styled.button`
  font-weight: ${props => props.theme.font.semibold};
  font-size: 0.9rem;
  text-decoration: underline;
`;
