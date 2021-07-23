import { useTranslation } from "react-i18next";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../interfaces/product";
import Flex from "../reusables/Flex";
import Heading from "../reusables/Heading";
import Paragraph from "../reusables/Paragraph";

interface IProps {
  product: Product;
}

const HomeProduct = ({ product }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { t } = useTranslation();
  return (
    <Container>
      <ImageContainer to={`/products/${product.id}`}>
        {product.sale && (
          <DiscountIcon>
            <Flex items="center">
              <Paragraph color="textPrimaryContrast" fontSize="0.7rem">
                {t("off")}
              </Paragraph>
              <Paragraph
                color="textPrimaryContrast"
                fontSize="0.7rem"
                margin="0 0.25rem"
              >
                %{product.discount}
              </Paragraph>
            </Flex>
          </DiscountIcon>
        )}
        {/* <PrepTime>
          <Flex items="center">
            <IoMdTime size={18} />
            <Paragraph
              margin="0 0.25rem"
              color="textPrimaryContrast"
              fontSize="0.7rem"
            >
              00:20
            </Paragraph>
          </Flex>
        </PrepTime> */}
        <img src={product.image} alt={product.name[language]} />
      </ImageContainer>
      <div className="details">
        <Heading tag="h6">{product.name[language]}</Heading>
        <PrepTime>
          <Flex items="center" justify="flex-start">
            <IoMdTime size={17} />
            <Paragraph margin="0 0.15rem" fontSize="0.9rem">
              00:20
            </Paragraph>
          </Flex>
        </PrepTime>
        <Paragraph color="textSecondary" fontSize="0.8rem" margin="0.25rem 0">
          {product.description![language]}
        </Paragraph>
        {product.sale ? (
          <Flex>
            <Heading tag="h5" color="green" weight="bold">
              {product.price} {t("kd")}
            </Heading>
            <Heading
              tag="h6"
              color="textSecondary"
              decoration="line-through"
              weight="bold"
              margin="0 0.5rem"
            >
              {product.price} {t("kd")}
            </Heading>
          </Flex>
        ) : (
          <Heading tag="h5" color="green" weight="bold">
            {product.price} {t("kd")}
          </Heading>
        )}
      </div>
    </Container>
  );
};

export default HomeProduct;

const Container = styled.div`
  &:hover {
    /* box-shadow: ${(props) => props.theme.shadow}; */
  }
  background-color: ${(props) => props.theme.accent1};
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  overflow: hidden;
  .details {
    padding: 0.5rem;
  }
`;
const ImageContainer = styled(Link)`
  display: block;
  position: relative;
  overflow: hidden;
  height: 175px;
  background: #fff;
  img {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
`;

const DiscountIcon = styled.div`
  border-radius: 50px;
  padding: 0.25rem 0.5rem;

  background-color: ${(props) => props.theme.green};

  position: absolute;
  top: 5px;
  left: 5px;
`;

const PrepTime = styled.div`
  color: ${(props) => props.theme.yellow};
  margin: 0.25rem 0;
`;
