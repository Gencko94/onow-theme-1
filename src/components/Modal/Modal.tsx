import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

import { CSSTransition } from 'react-transition-group';
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
      <CSSTransition
        in={modalOpen}
        classNames="modal"
        unmountOnExit
        mountOnEnter
        timeout={300}
      >
        <Container>
          <ModalHead>
            <CloseIcon onClick={() => closeModal()}>
              <GrClose size={18} />
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
                  key={b.value}
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
      </CSSTransition>
      <CSSTransition
        in={modalOpen}
        classNames="backdrop"
        unmountOnExit
        mountOnEnter
        timeout={300}
      >
        <Backdrop />
      </CSSTransition>
    </>
  );
};

export default Modal;

const Container = styled.div(
  ({ theme: { breakpoints, bodyColor } }) => `
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
  top:0;
  bottom:0;
  border-radius:20px;
  margin: auto;
  background-color:#fff;
  @media ${breakpoints.xs} {
      width:90%;
      height:257px
    };
  @media ${breakpoints.sm} {
      width:70%
    }
  }
`
);
const CloseIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h5``;

const ModalHead = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const ModalFooter = styled.div`
  padding: 0.25rem 0.5rem;
`;
const ModalBody = styled.div`
  padding: 0.5rem 0;
`;

const Backdrop = styled.span`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const BranchesListContainer = styled.ul`
  max-height: 140px;
  overflow-y: auto;
`;
const BranchContainer = styled.li<{ selected: boolean }>`
  padding: 0.75rem;
  background-color: ${props =>
    props.selected ? props.theme.mainColor : '#fff'};
  color: ${props => (props.selected ? '#fff' : props.theme.secondaryColor)};
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
  font-weight: 600;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ConfirmButton = styled.button`
  border-radius: 15px;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  padding: 0.25rem 0.75rem;
`;
