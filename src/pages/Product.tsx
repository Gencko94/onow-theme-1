import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useResponsive from "../hooks/useResponsive";

import Layout from "../layout/Layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useHistory } from "react-router";
import { addToCart, addToGuestCart, getProduct } from "../utils/queries";
import ReactPlaceholder from "react-placeholder";
import Loader from "react-loader-spinner";

import { m, Variants } from "framer-motion";
import { AuthProvider } from "../contexts/AuthContext";
import { ApplicationProvider } from "../contexts/ApplicationContext";
import { Carousel } from "react-responsive-carousel";
import Zoom from "react-medium-image-zoom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-medium-image-zoom/dist/styles.css";
import Breadcrumbs from "../components/reusables/Breadcrumbs";

import QuantityButtons from "../components/reusables/QuantityButtons";

import ProductName from "../components/ProductComponents/ProductName";
import ProductPrice from "../components/ProductComponents/ProductPrice";
import ProductDescription from "../components/ProductComponents/ProductDescription";
import ProductOrdering from "../components/ProductComponents/ProductOrdering";
import Hr from "../components/reusables/Hr";
const containerVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
  },
};
const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { isDesktop } = useResponsive();
  const { user } = useContext(AuthProvider);
  const { globalOrderMode } = useContext(ApplicationProvider);
  const [quantity, setQuantity] = useState(1);
  const [optionalNotes, setOptionalNotes] = useState("");
  const { data: product } = useQuery(["product", id], () => getProduct(id), {
    suspense: true,
  });
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
            quantity,
            id: product.id,
          });
          history.push("/cart");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await addToGuestCartMutation({
            quantity,
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
    <Layout>
      {/* <MobileHeader title="my-addresses" /> */}
      {/* {isDesktop && <Hero />} */}
      <Container
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ContentContainer>
          <ReactPlaceholder
            type="rect"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "236px",
              margin: 0,
              borderRadius: "6px",
            }}
            color="#E0E0E0"
            showLoadingAnimation
            ready={Boolean(product)}
          >
            <Carousel showStatus={false}>
              {product?.gallery.map((link) => (
                <Zoom>
                  <img src={link} />
                </Zoom>
              ))}
            </Carousel>
          </ReactPlaceholder>

          {/* content */}
          <div>
            <ReactPlaceholder
              type="rect"
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "5px",
                margin: 0,
                marginBottom: ".5rem",
              }}
              color="#E0E0E0"
              showLoadingAnimation
              ready={Boolean(product)}
            >
              <Breadcrumbs
                childLabel={product!.name![i18n.language]}
                children={[
                  { name: product!.category!.name!, target: "/category" },
                  { name: product!.name!, target: "" },
                ]}
              />
            </ReactPlaceholder>
            <ProductName name={product!.name} />

            <ProductPrice
              price={product!.price}
              discount={product!.discount}
              sale={product!.sale}
            />
            <ProductDescription description={product!.description} />
            <Hr />
            <ProductOrdering
              setQuantity={setQuantity}
              quantity={quantity}
              loading={!product}
              optionalNotes={optionalNotes}
              setOptionalNotes={setOptionalNotes}
            />
          </div>
        </ContentContainer>
      </Container>
    </Layout>
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
const Container = styled(m.div)(
  ({ theme: { breakpoints } }) => `
  
  max-width:1200px;
  margin:auto;
  @media ${breakpoints.md}{
  min-height:calc(100vh - 200px);
    
    padding: 0.75rem;
  }
`
);

const ContentContainer = styled.div(
  ({ theme: { breakpoints, btnBorder } }) => `
  display:grid;
  @media ${breakpoints.xs}{
    padding: 0.5rem;
    grid-template-columns:1fr;
    row-gap:1rem;
  }
  @media ${breakpoints.md}{
    padding: 1rem;
    margin-top:4rem;
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

const BuyingOptionsContainer = styled.div(
  ({ theme: { breakpoints, btnBorder } }) => `
  display: grid;
  grid-template-columns:1fr;
  gap:1rem;
  @media ${breakpoints.xs}{
    padding: 0.25rem 0 ;
  }
  @media ${breakpoints.md}{
    gap:0.5rem;
    padding: 0.25rem 0;
    grid-template-columns:0.5fr 1fr;
  }
`
);
const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const QuantityText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.subHeading};
`;

const AddButton = styled.button`
  border-radius: 6px;
  background-color: ${(props) => props.theme.btnPrimaryLight};
  color: ${(props) => props.theme.btnText};
  padding: 0.5rem;
  font-weight: ${(props) => props.theme.font.bold};
  flex: 1;
  text-transform: uppercase;
  border: 1px solid ${(props) => props.theme.btnBorder};
`;
const OrderModeButton = styled.button`
  border-radius: 6px;
  background-color: ${(props) => props.theme.dangerRed};
  color: #fff;
  padding: 0.5rem;
  font-weight: ${(props) => props.theme.font.bold};
  flex: 1;
  text-transform: uppercase;
  border: 1px solid ${(props) => props.theme.btnBorder};
`;
