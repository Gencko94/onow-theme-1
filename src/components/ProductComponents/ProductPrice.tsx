import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationProvider } from "../../contexts/ApplicationContext";
import Flex from "../reusables/Flex";
import Heading from "../reusables/Heading";
import Placeholder from "../reusables/Placeholder";

interface IProps {
  price?: string;
  sale?: boolean;
  discount?: number | null;
}
const ProductPrice = ({ price, discount, sale }: IProps) => {
  const { country } = useContext(ApplicationProvider);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <Placeholder
      height="25px"
      width="25%"
      ready={Boolean(price)}
      margin="1rem 0"
    >
      {sale ? (
        <Flex>
          <Heading tag="h4" color="green" weight="bold" margin="0.5rem 0">
            {price} {country?.currency[language]}
          </Heading>
          <Heading
            tag="h6"
            color="textSecondary"
            decoration="line-through"
            weight="bold"
            margin="0 0.5rem"
          >
            {price} {country?.currency[language]}
          </Heading>
        </Flex>
      ) : (
        <Heading tag="h4" color="green" weight="bold">
          {price} {country?.currency[language]}
        </Heading>
      )}
    </Placeholder>
  );
};

export default ProductPrice;
