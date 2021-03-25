import { useContext } from 'react';
import ReactPlaceholder from 'react-placeholder';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { CartItem as CartItemT } from '../../../interfaces/cartitem';
import CartItem from './CartItem';
import { AnimatePresence, AnimateSharedLayout, m } from 'framer-motion';

interface IProps {
  data: CartItemT[] | undefined;
  isLoading: boolean;
}

const CartItems = ({ data, isLoading }: IProps) => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  return (
    <AnimateSharedLayout>
      <Container layout mode={mode}>
        {!data && (
          <LoadingGrid>
            {[0, 1, 2].map(() => (
              <ReactPlaceholder
                type="textRow"
                style={{
                  width: '100%',
                  height: '119px',
                  borderRadius: '6px',
                  marginTop: 0,
                }}
                color="#E0E0E0"
                showLoadingAnimation
                ready={Boolean(data)}
              >
                <></>
              </ReactPlaceholder>
            ))}
          </LoadingGrid>
        )}

        {data && (
          <ItemsWrapper layout>
            <AnimatePresence>
              {data.map(product => (
                <CartItem product={product} key={product.id} />
              ))}
            </AnimatePresence>
          </ItemsWrapper>
        )}
      </Container>
    </AnimateSharedLayout>
  );
};

export default CartItems;

const Container = styled(m.div)<{ mode: string | undefined }>`
  background-color: ${props =>
    props.mode === 'dark' ? props.theme.bodyColor : props.theme.bodyColor};
`;

const LoadingGrid = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  @media ${breakpoints.md}{
    
   padding:0;
  }
`
);

const ItemsWrapper = styled(m.div)(
  ({ theme: { breakpoints } }) => `

  @media ${breakpoints.xs}{
    
    min-height:calc(100vh - 353px);
    max-height:calc(100vh - 353px);
    overflow:auto
  }
  @media ${breakpoints.md}{
    min-height:unset;
    max-height:unset;
    overflow:hidden;
    padding:5px;
  }
  `
);
