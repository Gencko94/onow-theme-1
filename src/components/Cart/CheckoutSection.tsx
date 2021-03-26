import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder/lib';

import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { CartItem } from '../../interfaces/cartitem';
import Modal from '../Modal/Modal';
interface IProps {
  data: CartItem[] | undefined;
  isLoading: boolean;
}

const CheckoutSection = ({ isLoading, data }: IProps) => {
  const {
    branch,
    deliveryAddress,
    selectedOrderMode,
    handleOrderModeChange,
    orderTime,
    orderTimeType,
    handleSetOrderTimeType,
    handleSetOrderTime,
  } = useContext(ApplicationProvider);

  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
      {!data && (
        <StickyContainer>
          <>
            {[0, 1, 2].map(() => (
              <ReactPlaceholder
                type="textRow"
                style={{
                  width: '100%',
                  height: '27px',
                  borderRadius: '6px',
                  marginTop: 0,
                  margin: '0.8rem 0',
                }}
                color="#E0E0E0"
                showLoadingAnimation
                ready={Boolean(data)}
              >
                <></>
              </ReactPlaceholder>
            ))}
            <ReactPlaceholder
              type="textRow"
              style={{
                width: '100%',
                height: '43px',
                borderRadius: '6px',
                marginTop: '1rem',
              }}
              color="#E0E0E0"
              showLoadingAnimation
              ready={Boolean(data)}
            >
              <></>
            </ReactPlaceholder>
          </>
        </StickyContainer>
      )}
      {/* <CouponContainer>
        <CouponInput placeholder={t('enter-code-or-coupon')} />
        <SubmitButton type="button">{t('submit')}</SubmitButton>
      </CouponContainer> */}
      {/* <Container>
        <ContentWrapper>
          <MediumBlock>
            <OrderModeText>Order Mode</OrderModeText>
            <RadioContainer>
              <InputContainer>
                <Label htmlFor="pickup">Pickup</Label>
                <RadioInput
                  id="pickup"
                  type="radio"
                  value="pickup"
                  name="mode"
                  checked={selectedOrderMode === 'pickup'}
                  onChange={() => {
                    if (handleOrderModeChange) handleOrderModeChange('pickup');
                  }}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="delivery">Delivery</Label>
                <RadioInput
                  id="delivery"
                  checked={selectedOrderMode === 'delivery'}
                  type="radio"
                  value="delivery"
                  onChange={() => {
                    if (handleOrderModeChange)
                      handleOrderModeChange('delivery');
                  }}
                  name="mode"
                />
              </InputContainer>
            </RadioContainer>
          </MediumBlock>
          <MediumBlock>
            <OrderModeText>Order Time</OrderModeText>
            <RadioContainer>
              <InputContainer>
                <Label htmlFor="asap">ASAP</Label>
                <RadioInput
                  id="asap"
                  type="radio"
                  value="asap"
                  name="time"
                  checked={orderTimeType === 'asap'}
                  onChange={() => {
                    handleSetOrderTimeType?.('asap');
                  }}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="schedule">Schedule</Label>
                <RadioInput
                  value="schedule"
                  id="schedule"
                  type="radio"
                  checked={orderTimeType === 'schedule'}
                  onChange={() => {
                    handleSetOrderTimeType?.('schedule');
                  }}
                  name="time"
                />
              </InputContainer>
            </RadioContainer>
          </MediumBlock>
          {orderTimeType === 'schedule' && (
            <SmallBlock>
              <BlockText>Date & Time</BlockText>
              <DateTimePicker
                selectedDate={orderTime || new Date()}
                handleSetOrderTime={handleSetOrderTime}
              />
            </SmallBlock>
          )}
          {selectedOrderMode === 'delivery' && (
            <>
              <SmallBlock>
                <BlockText>Deliver to</BlockText>
                {deliveryAddress ? (
                  <ChangeButton onClick={() => history.push('/location')}>
                    Change
                  </ChangeButton>
                ) : (
                  <LocationPrompt to="/location">
                    Select your Delivery location
                  </LocationPrompt>
                )}
              </SmallBlock>
              {deliveryAddress && (
                <AddressText>{deliveryAddress.physicalAddress}</AddressText>
              )}
            </>
          )}
          {selectedOrderMode === 'pickup' && (
            <SmallBlock>
              <p>Branch</p>

              {branch ? (
                <FlexContainer>
                  <BlockText>{branch?.name}</BlockText>
                  <ChangeButton onClick={() => setModalOpen(true)}>
                    Change
                  </ChangeButton>
                </FlexContainer>
              ) : (
                <PickupPrompt onClick={() => setModalOpen(true)}>
                  Select Branch
                </PickupPrompt>
              )}
            </SmallBlock>
          )}
        </ContentWrapper>
      </Container> */}
      {data && (
        <StickyContainer>
          <SmallBlock>
            <BlockText>{t('order-total')}</BlockText>
            <BlockText bold>2.000 KD</BlockText>
          </SmallBlock>
          <SmallBlock>
            <BlockText>{t('delivery-cost')}</BlockText>
            <BlockText bold>2.000 KD</BlockText>
          </SmallBlock>

          <hr />

          <MediumBlock>
            <BlockText>{t('subtotal')}</BlockText>
            <BlockText bold>2.000 KD</BlockText>
          </MediumBlock>

          <CheckoutButtonContainer>
            <CheckoutButton
              type="button"
              onClick={() => {
                if (deliveryAddress || branch) {
                  history.push('/checkout');
                }
              }}
            >
              {deliveryAddress || branch
                ? 'Checkout'
                : 'Please Select Order mode'}
            </CheckoutButton>
          </CheckoutButtonContainer>
        </StickyContainer>
      )}

      {/* <Modal
        title="Pick up branch"
        closeModal={() => setModalOpen(false)}
        modalOpen={modalOpen}
      /> */}
    </>
  );
};

export default CheckoutSection;

const Container = styled.div`
  background-color: aliceblue;
  position: relative;
`;

const CouponContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
`;

const CouponInput = styled.input`
  flex: 1;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 0.7em;
  min-width: 0;
`;
const SubmitButton = styled.button`
  margin: 0 0.25em;
  padding: 0.7em;
  background-color: ${props => props.theme.mainColor};
  color: #fff;
  border-radius: 5px;
`;
const ContentWrapper = styled.div`
  padding: 0 0.5rem;
`;
const StickyContainer = styled.div(
  ({ theme: { breakpoints, overlayColor, shadow } }) => ` 
  padding: 0.5rem;
  background: ${overlayColor};
  box-shadow:${shadow};
  width: 100%;
  z-index: 3;
  align-self: flex-start;
  @media ${breakpoints.xs} {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    position: sticky;
    bottom: 0;
  };
  @media ${breakpoints.md} {
    position: relative;
    border:none;
    border-radius:6px;
  }
  @media ${breakpoints.lg} {
    // margin-top: 1rem;
  }
`
);

const OrderModeText = styled.h6`
  font-size: large;
`;
const RadioContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  font-weight: 600;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.label`
  margin: 0 0.25em;
`;
const RadioInput = styled.input`
  margin: 0 0.25em;
`;

const SmallBlock = styled.div`
  padding: 0.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MediumBlock = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BlockText = styled.h5<{ bold?: boolean }>(
  ({ theme: { breakpoints, font }, bold }) => ` 
  font-weight: ${bold ? font.bold : font.semibold};
  font-size:1.1rem;
  @media ${breakpoints.md}{
    font-size:1rem;
  }
`
);

const CheckoutButtonContainer = styled.div`
  padding: 0.5rem 0.25rem;
`;
const CheckoutButton = styled.button`
  background-color: ${props => props.theme.btnPrimaryDark};
  color: ${props => props.theme.btnText};
  border: ${props => `1px solid ${props.theme.btnBorder}`};
  padding: 0.7em;
  font-weight: ${props => props.theme.font.semibold};
  /* text-transform: uppercase; */
  font-size: 0.9rem;
  letter-spacing: 1px;
  width: 100%;
  border-radius: 5px;
`;
const LocationPrompt = styled(Link)`
  font-weight: 500;
  display: block;
  font-size: 0.9rem;
  text-decoration: underline;
`;
const PickupPrompt = styled.button`
  font-size: 0.9rem;
  text-decoration: underline;
`;
const FlexContainer = styled.div`
  display: flex;
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

const AddressText = styled.p`
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.8rem;
  /* white-space: nowrap; */
`;
