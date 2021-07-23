import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "react-query";

import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  CART_ITEM,
  DELETE_FROM_CART_RESPONSE,
  GET_CART_RESPONSE,
} from "../../../interfaces/Cart";
// import { ADDON } from '../../../interfaces/product';
import { deleteCartItem } from "../../../utils/queries";
import Flex, { FlexWrapper } from "../../reusables/Flex";
import Grid from "../../reusables/Grid";
import Heading from "../../reusables/Heading";
import Paragraph from "../../reusables/Paragraph";
import QuantityButtons from "../../reusables/QuantityButtons";

interface Props {
  // product: CART_ITEM;
}
const addons = [
  { name: { en: "Extra Cheese", ar: "جبنة زيادة" }, price: "0.500 KD" },
  { name: { en: "Extra Onions", ar: "بصل زيادة" }, price: "0.750 KD" },
  { name: { en: "Extra Onions", ar: "بصل زيادة" }, price: "0.750 KD" },
  { name: { en: "Extra Onions", ar: "بصل زيادة" }, price: "0.750 KD" },
  { name: { en: "Extra Onions", ar: "بصل زيادة" }, price: "0.750 KD" },
];

const CartItem = ({}: Props) => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutation } = useMutation(deleteCartItem, {
    onSuccess: (data) => {
      queryClient.setQueryData<DELETE_FROM_CART_RESPONSE | undefined>(
        "cart",
        data
      );
    },
  });
  // const { mutateAsync: editItem } = useMutation(deleteCartItem, {
  //   onSuccess: () => {
  //     queryClient.setQueryData<CartItemT[] | undefined>('cart', prev => {
  //       return prev?.filter(i => i.id !== product.id);
  //     });
  //   },
  // });
  const [quantity, setQuantity] = useState<number>(() => {
    // return product.quantity;
    return 2;
  });
  const [quantityChanged, setQuantityChanged] = useState(false);
  const handleIncrementQuantity = () => {
    setQuantity((prev) => prev + 1);
    // if (quantity + 1 === product.quantity) {
    //   setQuantityChanged(false);
    // } else {
    //   setQuantityChanged(true);
    // }
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    // if (quantity - 1 === product.quantity) {
    //   setQuantityChanged(false);
    // } else {
    //   setQuantityChanged(true);
    // }
    setQuantity((prev) => prev - 1);
  };
  const handleDeleteItem = async () => {
    try {
      // await deleteMutation({ id: product.id });
    } catch (error) {
      console.log(error);
    }
  };
  const generateAddons = (addons: any) => {
    const names = [];
    for (let addon of addons) {
      names.push(addon.name[i18n.language]);
    }
    return <Paragraph fontSize="0.8rem">{names.join(", ")}</Paragraph>;
  };
  return (
    <Container>
      <Grid cols="75px 1fr minmax(100px,150px)" gap="0.5rem" items="center">
        <ImageContainer>
          <img
            // src={product.image}
            src="/images/burger.jpg"
            // alt={product.name[i18n.language]}
          />
        </ImageContainer>
        <Details>
          {/* <Heading tag="h6">{product.name[i18n.language]}</Heading> */}
          <Heading tag="h6" color="textPrimary">
            Hamburger
          </Heading>

          {generateAddons(addons)}
        </Details>
        <Flex items="center" justify="center" column>
          <Flex items="center" justify="center" margin="0">
            <QuantityContainer>
              <Paragraph>{quantity}</Paragraph>
            </QuantityContainer>
            <QuantityButtons quantity={quantity} setQuantity={setQuantity} />
          </Flex>
          <Paragraph fontSize="1.1rem" weight="bold">
            3.000 {t("kd")}
          </Paragraph>
          {/* <Paragraph fontSize="1.1rem" weight="bold">
            {product.price} {t("kd")}
          </Paragraph> */}
        </Flex>
      </Grid>
      <DeleteButton onClick={() => handleDeleteItem()}>
        <IoMdCloseCircle size={23} color="#b72b2b" />
      </DeleteButton>
    </Container>
  );
};

export default CartItem;

const Container = styled.div(
  ({
    theme: {
      breakpoints,
      border,
      shadow,
      accent1,
      bodyColor,

      seperator,
    },
  }) => ` 
  position:relative;
  align-self:flex-start;
  border-radius:6px;
  padding: 0.5rem;
  border:${border};
  background-color:${bodyColor};
 
  // background:${accent1};
  @media ${breakpoints.md}{
    padding: 1rem;
    
    margin-bottom:1rem;
  }
`
);

const ImageContainer = styled.div(
  ({ theme: { breakpoints, shadow, border } }) => ` 
  
  
  border: ${border};
  border-radius: 50%;
  img {
    border-radius: 50%;
    height: 75px;
    width: 75px;
    object-fit: cover;
    object-position: center;
  }
  

  `
);

const Details = styled.div``;
const ProductName = styled(Link)(
  ({ theme: { breakpoints, textPrimary, font } }) => ` 
  display: block;
  color: ${textPrimary};
  font-weight: ${font.bold};
  margin-bottom:0.25rem;
    font-size:1rem;
  
  @media ${breakpoints.md}{
    font-size:1.1rem;
  }
  @media ${breakpoints.lg}{
    font-size:1.3rem;
  }
`
);
const AddonName = styled.p(
  ({ theme: { breakpoints, subHeading, font } }) => ` 
  font-size: 0.8rem;
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
  font-size: 1.1rem;
  color: ${(props) => props.theme.headingColor};
  font-weight: ${(props) => props.theme.font.bold};
  display: flex;
  white-space: nowrap;
  /* align-items: center; */
  justify-content: flex-end;
`;

const QuantityWrapper = styled.div(
  ({ theme: { breakpoints } }) => ` 
  display: grid;
  
  grid-template-columns: 0.4fr 1fr;
 
  justify-content: center;
  @media ${breakpoints.xs}{
    // grid-column:span 3;
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
  font-weight: ${(props) => props.theme.font.xbold};
  color: ${(props) => props.theme.subHeading};
`;
const QuantityContainer = styled(FlexWrapper)`
  box-shadow: ${(props) => props.theme.shadow};
  /* background-color: ${(props) => props.theme.accent2}; */
  background-color: #fff;
  margin: 0 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;

  right: 5px;
`;
const EditButton = styled.button`
  padding: 0 0.25rem;
  background-color: ${(props) => props.theme.btnPrimaryLight};
  color: ${(props) => props.theme.btnText};
  border: 1px solid ${(props) => props.theme.btnBorder};
  font-size: 0.9rem;
  border-radius: 6px;
  margin: 0 0.25rem;
`;
