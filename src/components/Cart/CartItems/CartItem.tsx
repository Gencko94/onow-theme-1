import { m, Variants } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartItem as CartItemT } from '../../../interfaces/cartitem';
import { deleteCartItem } from '../../../utils/queries';

interface Props {
  product: CartItemT;
}
const addons = [
  { name: 'Extra Cheese', price: '0.500 KD' },
  { name: 'Extra Onions', price: '0.750 KD' },
];
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exited: {
    x: 300,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};
const CartItem = ({ product }: Props) => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutation } = useMutation(deleteCartItem, {
    onSuccess: () => {
      queryClient.setQueryData<CartItemT[] | undefined>('cart', prev => {
        return prev?.filter(i => i.id !== product.id);
      });
    },
  });
  const { mutateAsync: editItem } = useMutation(deleteCartItem, {
    onSuccess: () => {
      queryClient.setQueryData<CartItemT[] | undefined>('cart', prev => {
        return prev?.filter(i => i.id !== product.id);
      });
    },
  });
  const [quantity, setQuantity] = useState<number>(() => {
    return product.quantity;
  });
  const [quantityChanged, setQuantityChanged] = useState(false);
  const handleIncrementQuantity = () => {
    setQuantity(prev => prev + 1);
    if (quantity + 1 === product.quantity) {
      setQuantityChanged(false);
    } else {
      setQuantityChanged(true);
    }
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    if (quantity - 1 === product.quantity) {
      setQuantityChanged(false);
    } else {
      setQuantityChanged(true);
    }
    setQuantity(prev => prev - 1);
  };
  const handleDeleteItem = async () => {
    try {
      await deleteMutation({ id: product.id });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
    >
      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} alt={product.name} />
        </ImageContainer>
        <Details>
          <ProductName to={`products/${product.id}`}>
            {product.name}
          </ProductName>
          <Price>{product.price}</Price>
          {addons.map(addon => (
            <>
              <AddonName>{addon.name}</AddonName>
              <AddonPrice>+{addon.price}</AddonPrice>
            </>
          ))}
          {/* <SpecialInstructions>Extra Cheese</SpecialInstructions> */}
        </Details>
        <QuantityWrapper>
          <QuantityContainer>
            <QuantityButton onClick={() => handleIncrementQuantity()}>
              <FiPlus size={17} />
            </QuantityButton>
            <QuantityText>{quantity}</QuantityText>
            <QuantityButton onClick={() => handleSubstractQuantity()}>
              <FiMinus size={17} />
            </QuantityButton>
          </QuantityContainer>
          <ButtonsContainer>
            {quantityChanged && <EditButton>Edit</EditButton>}
            <DeleteButton onClick={() => handleDeleteItem()}>
              <AiFillDelete size={23} color="#b72b2b" />
            </DeleteButton>
          </ButtonsContainer>
        </QuantityWrapper>
      </ProductContainer>
    </Container>
  );
};

export default CartItem;

const Container = styled(m.div)(
  ({ theme: { breakpoints, border, overlayColor, bodyColor, shadow } }) => ` 
  background:${overlayColor};
  align-self:flex-start;
  border-radius:6px;
  box-shadow:${shadow};
  padding: 0.5rem;
  @media ${breakpoints.md}{
    background:${overlayColor};
    margin-bottom:1rem;
  }
`
);
const ProductContainer = styled.div(
  ({ theme: { breakpoints } }) => ` 

  display: grid;
  gap: 0.5rem;
  @media ${breakpoints.xs}{
    grid-template-columns: 0.3fr 1fr;
   
  }
  @media ${breakpoints.md}{
    grid-template-columns: 0.3fr 1fr 0.1fr;

 }

`
);
const ImageContainer = styled.div`
  /* display: flex; */
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  /* align-items: center; */
  /* justify-content: center; */
`;
const Image = styled.img(
  ({ theme: { breakpoints } }) => ` 
height:100%;
width:100%;
object-fit:contain;
object-position:center;

// @media ${breakpoints.xs} {
//   width:60px;
//   height:60px;
// }
// @media ${breakpoints.md} {
//   width:100px;
//   height:100px;
// }
// @media ${breakpoints.lg} {
//   width:140px;
//   height:140px;
// }
`
);

const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  gap: 0.25rem;
  align-self: flex-start;
`;
const ProductName = styled(Link)(
  ({ theme: { breakpoints, headingColor, font } }) => ` 
  display: block;
  color: ${headingColor};
  font-weight: ${font.bold};
  @media ${breakpoints.xs}{
    font-size:1rem;
  }
  @media ${breakpoints.md}{
    font-size:1rem;
  }
  @media ${breakpoints.lg}{
    font-size:1.1rem;
  }
`
);
const AddonName = styled.p(
  ({ theme: { breakpoints, subHeading, font } }) => ` 
  font-size: 0.9rem;
  color: ${subHeading};
  font-weight: ${font.regular};
  @media ${breakpoints.md}{
    font-size: 0.9rem;
  }
`
);
const AddonPrice = styled.p(
  ({ theme: { breakpoints, subHeading, font } }) => ` 
  color: ${subHeading};
  font-size: 0.8rem;
  font-weight: ${font.regular};
  text-align:right;
  @media ${breakpoints.md}{
    font-size: 0.9rem;
  }
`
);
const Price = styled.p`
  /* font-size: 0.9rem; */
  color: ${props => props.theme.headingColor};
  font-weight: ${props => props.theme.font.semibold};
  display: flex;
  /* align-items: center; */
  justify-content: flex-end;
`;

const QuantityWrapper = styled.div(
  ({ theme: { breakpoints } }) => ` 
  display: flex;
  
  align-items: center;
 
  justify-content: center;
  @media ${breakpoints.xs}{
    grid-column:span 3;
    flex-direction: row;
    justify-content: space-between;
  }
  @media ${breakpoints.md}{
    grid-column:span 1;
    flex-direction: column;
  } 
  `
);
const QuantityText = styled.p`
  font-size: 1rem;
  margin: 0 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
  color: ${props => props.theme.subHeading};
`;
const QuantityContainer = styled.div(
  ({ theme: { breakpoints } }) => ` 
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media ${breakpoints.xs}{
    
    flex-direction: row;
  }
  @media ${breakpoints.md}{
    
    flex-direction: column;
  }
  `
);
const Quantity = styled.p`
  margin: 0 0.7rem;
  width: 10px;
  text-align: center;
`;
const QuantityButton = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 0.15rem;
  display: flex;
  align-items: center;
  /* border: 1px solid #222; */
  justify-content: center;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const EditButton = styled.button`
  padding: 0 0.25rem;
  background-color: ${props => props.theme.btnPrimaryLight};
  color: ${props => props.theme.btnText};
  border: 1px solid ${props => props.theme.btnBorder};
  font-size: 0.9rem;
  border-radius: 6px;
  margin: 0 0.25rem;
`;
