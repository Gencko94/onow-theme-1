import OrderModeItem from './OrderModeItem';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { BiMap, BiCheckCircle, BiCircle } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { ApplicationProvider } from '../../../contexts/ApplicationContext';
import { gsap } from 'gsap';
import { branches } from '../../../data/branches';
import { Branch } from '../../../interfaces/branch';
import { orderModes } from '../../../data/orderModes';
import { useTranslation } from 'react-i18next';

const OrderMode = () => {
  const { t } = useTranslation<['common', 'home']>(['common', 'home']);
  const {
    selectedOrderMode,
    branch,
    handleBranchChange,
    deliveryAddress,
  } = useContext(ApplicationProvider);
  const [highlightedBranch, setHighlightedBranch] = useState<Branch | null>(
    null
  );
  const [showChangeBranch, setShowChangeBranch] = useState<boolean>(false);
  const pickUpRef = useRef<HTMLUListElement | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (selectedOrderMode === 'pickup' && showChangeBranch) {
      const el = pickUpRef.current;
      if (el) {
        gsap.from(el?.children, {
          stagger: 0.1,
          opacity: 0,
        });
      }
    }
  }, [selectedOrderMode, showChangeBranch]);
  return (
    <Container>
      <Title>{t('order-mode')}</Title>
      <GridContainer>
        {orderModes.map(orderMode => (
          <OrderModeItem orderMode={orderMode} />
        ))}
      </GridContainer>
      {selectedOrderMode === 'delivery' && (
        <>
          {deliveryAddress ? (
            <UserLocationContainer>
              <StyledP>{t('delivery-address')}</StyledP>
              <StyledValue>{deliveryAddress.mapAddress}</StyledValue>
              <ButtonContainer>
                <ChangeButton onClick={() => history.push('/location')}>
                  Change
                </ChangeButton>
              </ButtonContainer>
            </UserLocationContainer>
          ) : (
            <LocationPromptContainer>
              <LocationPrompt to="/location">
                {t('select-delivery-destination')}
              </LocationPrompt>
              <IconContainer>
                <BiMap size={25} />
              </IconContainer>
            </LocationPromptContainer>
          )}
        </>
      )}
      {selectedOrderMode === 'pickup' && (
        <Pickup>
          <>
            {branch && (
              <>
                <SelectedBranchContainer>
                  <OrderingFrom>Ordering from</OrderingFrom>
                  <BranchName>{branch.name}</BranchName>
                  <IconContainer onClick={() => history.push('/branches')}>
                    <AiOutlineInfoCircle size={25} />
                  </IconContainer>
                </SelectedBranchContainer>
                {!showChangeBranch && (
                  <ButtonContainer>
                    <ChangeButton onClick={() => setShowChangeBranch(true)}>
                      Change
                    </ChangeButton>
                  </ButtonContainer>
                )}
              </>
            )}
            {(!branch || showChangeBranch) && (
              <>
                <PickupPromptContainer>
                  <PickupPrompt>Select a branch to pick up from</PickupPrompt>
                </PickupPromptContainer>
                <BranchesListContainer ref={pickUpRef}>
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
                        <IconContainer
                          onClick={() => history.push('/branches')}
                        >
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
                <ButtonContainer>
                  <ConfirmButton
                    onClick={() => {
                      if (highlightedBranch) {
                        handleBranchChange?.(highlightedBranch);
                        setShowChangeBranch(false);
                      }
                    }}
                  >
                    Confirm
                  </ConfirmButton>
                </ButtonContainer>
              </>
            )}
          </>
        </Pickup>
      )}
    </Container>
  );
};

export default OrderMode;

const Container = styled.div`
  margin: 2.5rem 0;
  padding: 1rem;
`;
const Title = styled.h4`
  font-size: 1.075rem;
  line-height: 2.25rem;
  font-weight: ${props => props.theme.font.bold};
  margin-bottom: 0.5rem;
  color: ${props => props.theme.headingColor};
  @media ${({ theme }) => theme.breakpoints.xs} {
    font-size: 1.2rem;
    line-height: 2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;
const LocationPromptContainer = styled.div`
  padding: 0.5rem;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${props => props.theme.mainColor}; */
  /* color: #fff; */
`;
const LocationPrompt = styled(Link)`
  /* font-size: 0.9rem; */
  font-weight: 500;
  display: block;
  text-decoration: underline;
`;

const Pickup = styled.div``;
const PickupPromptContainer = styled.div`
  padding: 0.5rem;
  border-radius: 8px;
`;

const PickupPrompt = styled.h6`
  text-align: center;
`;
const BranchesListContainer = styled.ul`
  max-height: 140px;
  overflow-y: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
`;
const BranchContainer = styled.li<{ selected: boolean }>`
  padding: 0.75rem;
  background-color: ${props =>
    props.selected ? props.theme.mainColor : '#fff'};
  color: ${props => (props.selected ? '#fff' : props.theme.accentColor)};
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

const ButtonContainer = styled.div`
  padding: 0.5rem;
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
const UserLocationContainer = styled.div`
  padding: 0.5rem;
  color: ${props => props.theme.subHeading};
`;
const StyledP = styled.p`
  margin-bottom: 0.5rem;
`;
const StyledValue = styled.p`
  font-weight: 600;
  /* font-size: 0.9rem; */
  margin-bottom: 0.5rem;
`;
const ChangeButton = styled.button`
  border-radius: 15px;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  margin-top: 0.5rem;
`;
const SelectedBranchContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
  color: ${props => props.theme.accentColor};
`;

const OrderingFrom = styled.p``;
const BranchName = styled.p`
  font-weight: 600;
`;
