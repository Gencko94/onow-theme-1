import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BiCheckCircle, BiCircle } from 'react-icons/bi';
import { branches } from '../../data/branches';
import { useHistory } from 'react-router-dom';
import { Branch } from '../../interfaces/branch';
import { useContext, useState } from 'react';
import { ApplicationProvider } from '../../contexts/ApplicationContext';

interface ModalProps {
  title: string;
  closeModal: () => void;
  modalOpen: boolean;
}

const Modal = ({ title, closeModal, modalOpen }: ModalProps) => {
  const history = useHistory();
  const [highlightedBranch, setHighlightedBranch] = useState<Branch | null>(
    null
  );

  const { handleBranchChange } = useContext(ApplicationProvider);
  return (
    <>
      <Container>
        <ModalHead>
          <CloseIcon onClick={() => closeModal()}>
            <IoMdClose size={25} />
          </CloseIcon>
          <TitleContainer>
            <Title>{title}</Title>
          </TitleContainer>
        </ModalHead>
        <ModalBody>
          <BranchesListContainer>
            {branches.map(b => (
              <BranchContainer
                onClick={() => {
                  setHighlightedBranch(b);
                }}
                selected={highlightedBranch?.name === b.name}
                key={b.id}
              >
                <BranchName>{b.name}</BranchName>
                <IconsContainer>
                  <IconContainer onClick={() => history.push('/branches')}>
                    <AiOutlineInfoCircle size={25} />
                  </IconContainer>
                  <IconContainer>
                    {b.name === highlightedBranch?.name ? (
                      <BiCheckCircle size={25} />
                    ) : (
                      <BiCircle size={25} />
                    )}
                  </IconContainer>
                </IconsContainer>
              </BranchContainer>
            ))}
          </BranchesListContainer>
        </ModalBody>
        <ModalFooter>
          <ButtonContainer>
            <ConfirmButton
              onClick={() => {
                if (highlightedBranch && handleBranchChange) {
                  handleBranchChange(highlightedBranch);
                  closeModal();
                }
              }}
            >
              Confirm
            </ConfirmButton>
          </ButtonContainer>
        </ModalFooter>
      </Container>

      <Backdrop onClick={() => closeModal()} />
    </>
  );
};

export default Modal;

const Container = styled.div(
  ({ theme: { breakpoints, overlayColor, bodyColor, headingColor } }) => `
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
 
  top:50%;
  transform:translateY(-50%);
  border-radius:6px;
  margin: auto;
  background-color:${overlayColor};
  
  @media ${breakpoints.xs} {
      width:90%;
    
    };
  @media ${breakpoints.md} {
      width:70%
    }
  }
`
);
const CloseIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.btnText};
`;
const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h5`
  font-weight: ${props => props.theme.font.bold};
`;

const ModalHead = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const ModalFooter = styled.div`
  padding: 0.5rem;
`;
const ModalBody = styled.div`
  /* padding:  0; */
  padding: 0.5rem;
`;

const Backdrop = styled.span`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const BranchesListContainer = styled.ul`
  border: 1px solid ${props => props.theme.btnBorder};
  border-radius: 5px;
  overflow: hidden;
`;
const BranchContainer = styled.li<{ selected: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${props =>
    props.selected ? props.theme.highlightColor : props.theme.overlayColor};
  color: ${props =>
    props.selected ? props.theme.highlightColorText : props.theme.headingColor};
  transition: background-color 150ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;
`;
const BranchName = styled.p`
  font-weight: 500;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ConfirmButton = styled.button`
  border-radius: 15px;
  background-color: ${props => props.theme.btnPrimaryDark};
  color: ${props => props.theme.btnText};
  padding: 0.25rem 0.75rem;
  border: 1px solid ${props => props.theme.btnBorder};
`;
