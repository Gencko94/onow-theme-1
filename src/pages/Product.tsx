import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useResponsive from "../hooks/useResponsive";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router";
import { addToCart, addToGuestCart, getProduct } from "../utils/queries";

import { AuthProvider } from "../contexts/AuthContext";
import { ApplicationProvider } from "../contexts/ApplicationContext";

import Breadcrumbs from "../components/reusables/Breadcrumbs";

import ProductName from "../components/ProductComponents/ProductName";
import ProductPrice from "../components/ProductComponents/ProductPrice";
import ProductDescription from "../components/ProductComponents/ProductDescription";
import ProductOrdering from "../components/ProductComponents/ProductOrdering";
import Hr from "../components/reusables/Hr";
import ProductOptions from "../components/ProductComponents/ProductOptions";
import ProductImage from "../components/ProductComponents/ProductImage";
import { OrderProvider } from "../contexts/OrderContext";
import { up } from "../utils/themes";
import Placeholder from "../components/reusables/Placeholder";
import { createContext } from "react";

export interface ADD_TO_CART {
  quantity: number;
  optionalNotes: string;
  files: File[];
  options: any;
}
export const ProductProvider = createContext<
  Partial<{
    formValues: ADD_TO_CART;
    setFormValues: Dispatch<SetStateAction<ADD_TO_CART>>;
  }>
>({});
const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthProvider);
  const { globalOrderMode } = useContext(OrderProvider);
  const [formValues, setFormValues] = useState<ADD_TO_CART>(() => {
    return {
      quantity: 1,
      optionalNotes: "",
      files: [],
      options: [],
    };
  });

  const { data: product } = useQuery(
    ["product", parseInt(id)],
    () => getProduct(id),
    {
      // suspense: true,
    }
  );
  const history = useHistory();

  const {
    mutateAsync: addToUserCartMutation,
    isLoading: addToUserCartLoading,
  } = useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });
  const {
    mutateAsync: addToGuestCartMutation,
    isLoading: addToGuestCartLoading,
  } = useMutation(addToGuestCart, {
    onSuccess: () => {
      queryClient.invalidateQueries("cart");
    },
  });
  const queryClient = useQueryClient();

  const { t, i18n } = useTranslation();

  const handleAddToCart = async () => {
    if (product) {
      if (user) {
        try {
          await addToUserCartMutation({
            quantity: formValues.quantity,
            id: product.id,
          });
          history.push("/cart");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await addToGuestCartMutation({
            quantity: formValues.quantity,
            id: product.id,
          });
          history.push("/cart");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <ProductProvider.Provider value={{ formValues, setFormValues }}>
      <Container>
        <Placeholder
          height="30px"
          width="60%"
          ready={Boolean(product)}
          margin="1rem 0"
        >
          <Breadcrumbs
            children={[
              { name: product?.category?.name!, target: "/category" },
              { name: product?.name!, target: "" },
            ]}
          />
        </Placeholder>
        <ContentContainer>
          <ProductImage image={product?.image} gallery={product?.gallery} />

          {/* content */}
          <div>
            <ProductName name={product?.name} />

            <ProductPrice
              price={product?.price}
              discount={product?.discount}
              sale={product?.sale}
            />
            <ProductDescription description={product?.description} />

            <ProductOptions options={product?.options} />

            <ProductOrdering loading={!product} />
          </div>
        </ContentContainer>
      </Container>
    </ProductProvider.Provider>
  );
};
// {globalOrderMode && (
//   <AddButton onClick={() => handleAddToCart()}>
//     {addToUserCartLoading || addToGuestCartLoading ? (
//       <Loader
//         type="ThreeDots"
//         color="#fff"
//         height={20}
//         width={30}
//       />
//     ) : (
//       t("add-to-cart")
//     )}
//   </AddButton>
// )}
// {!globalOrderMode && (
//   <OrderModeButton
//     onClick={() =>
//       history.push({
//         pathname: "/mode/delivery",
//         state: `/products/${id}`,
//       })
//     }
//   >
//     {t("select-order-mode")}
//   </OrderModeButton>
// )}
export default Product;
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
  
  
  
  ${up(breakpoints.md)}{
  // min-height:calc(100vh - 200px);
    
  
  }
`
);

const ContentContainer = styled.div(
  ({ theme: { breakpoints, btnBorder } }) => `
  display:grid;
  
   
    grid-template-columns:1fr;
    row-gap:1rem;
  
  ${up(breakpoints.md)}{
   
    grid-template-columns:1fr 1fr;
    gap:1rem;
    // border:1px solid ${btnBorder};
    // border-radius:8px;
    
  }
  
`
);

const LeftBackButton = styled.button`
  border-radius: 50%;
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
const RightBackButton = styled.button`
  border-radius: 50%;
  position: absolute;
  z-index: 3;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
