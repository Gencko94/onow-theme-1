import { useContext } from 'react';
import ReactPlaceholder from 'react-placeholder';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { CartItem as CartItemT } from '../../../interfaces/cartitem';
import CartItem from './CartItem';

interface IProps {
  data: CartItemT[] | undefined;
  isLoading: boolean;
}

const CartItems = ({ data, isLoading }: IProps) => {
  const { t } = useTranslation();
  const { mode } = useContext(ThemeContext);
  return (
    <Container mode={mode}>
      {/* {isLoading && (
        <LoadingGrid>
          {[0, 1, 2].map(() => (
            <ContentLoader
              speed={2}
              width="100%"
              height="126px"
              viewBox="0 0 400 126"
              backgroundColor="#5B5B5B"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="6" ry="6" width="100%" height="100%" />
            </ContentLoader>
          ))}
        </LoadingGrid>
      )} */}
      {!data && (
        <LoadingGrid>
          {[0, 1, 2].map(() => (
            <ReactPlaceholder
              type="textRow"
              style={{ width: '100%', height: '119px', borderRadius: '6px' }}
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
        <ItemsWrapper>
          {data.map(product => (
            <CartItem product={product} key={product.id} />
          ))}
        </ItemsWrapper>
      )}
    </Container>
  );
};

export default CartItems;

const Container = styled.div<{ mode: string | undefined }>`
  background-color: ${props =>
    props.mode === 'dark' ? props.theme.bodyColor : '#eee'};
`;

const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const ItemsWrapper = styled.div(
  ({ theme: { breakpoints, headingColor } }) => `

  @media ${breakpoints.xs}{
    
    min-height:calc(100vh - 333px);
    max-height:calc(100vh - 333px);
    overflow:auto
  }
  @media ${breakpoints.md}{
    min-height:auto;
    max-height:auto;
    overflow:auto
  }
  `
);
