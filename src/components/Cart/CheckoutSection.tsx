import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlaceholder from 'react-placeholder/lib';

import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ApplicationProvider } from '../../contexts/ApplicationContext';
import { GET_CART_RESPONSE } from '../../interfaces/Cart';
import Modal from '../Modal/Modal';
interface IProps {
  data: GET_CART_RESPONSE | undefined;
  isLoading: boolean;
}

const CheckoutSection = ({ isLoading, data }: IProps) => {
  const { branch, globalOrderMode } = useContext(ApplicationProvider);

  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
      {!data && (
        <StickyContainer>
          <>
            {[0, 1, 2].map(i => (
              <ReactPlaceholder
                key={i}
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

      {data && (
        <StickyContainer>
          <SmallBlock>
            <BlockText>{t('order-total')}</BlockText>
            <Number>{data.cart_total}</Number>
          </SmallBlock>
          <SmallBlock>
            <BlockText>{t('delivery-cost')}</BlockText>
            <Number>{data.delivery_cost}</Number>
          </SmallBlock>

          <hr />

          <MediumBlock>
            <BlockText>{t('subtotal')}</BlockText>
            <Number bold>{data.cart_subtotal}</Number>
          </MediumBlock>

          <CheckoutButtonContainer>
            <CheckoutButton
              type="button"
              onClick={() => {
                if (globalOrderMode) {
                  history.push('/checkout');
                }
              }}
            >
              {globalOrderMode ? 'Checkout' : 'Please Select Order mode'}
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

const StickyContainer = styled.div(
  ({ theme: { breakpoints, overlayColor, shadow } }) => ` 
  padding: 0.5rem 1rem;
  background: ${overlayColor};
  box-shadow:${shadow};
  width: 100%;
  z-index: 3;
  align-self: flex-start;
  @media ${breakpoints.xs} {
    // border-top: 1px solid rgba(0, 0, 0, 0.5);
    position: fixed;
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

const SmallBlock = styled.div`
  padding: 0.5rem 0;
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
const BlockText = styled.h5(
  ({ theme: { breakpoints, font, subHeading } }) => ` 
  font-weight: ${font.semibold};
  color:${subHeading};
  font-size:1.2rem;
  @media ${breakpoints.md}{
    font-size:1rem;
  }
`
);
const Number = styled.h5<{ bold?: boolean }>(
  ({ theme: { breakpoints, font, headingColor, subHeading }, bold }) => ` 
  font-weight: ${bold ? font.xbold : font.bold};
  // color:${bold ? headingColor : subHeading};
  font-size:${bold ? '1.2rem' : '1.1rem'};
  @media ${breakpoints.md}{
    font-size:1rem;
  }
`
);

const CheckoutButtonContainer = styled.div`
  padding: 0.5rem 0 0.25rem 0;
`;
const CheckoutButton = styled.button`
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.btnText};
  border: ${props => `1px solid ${props.theme.btnBorder}`};
  padding: 0.7em;
  font-weight: ${props => props.theme.font.semibold};
  /* text-transform: uppercase; */
  font-size: 1rem;
  letter-spacing: 1px;
  width: 100%;
  border-radius: 5px;
`;
