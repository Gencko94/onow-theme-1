import { useTranslation } from "react-i18next";
import Flex from "../reusables/Flex";
import Heading from "../reusables/Heading";
import Placeholder from "../reusables/Placeholder";

interface IProps {
  price: string;
  sale: boolean;
  discount: number | null;
}
const ProductPrice = ({ price, discount, sale }: IProps) => {
  const { t } = useTranslation();
  return (
    <Placeholder
      height="28px"
      width="25%"
      ready={Boolean(price)}
      margin="1rem 0"
    >
      {sale ? (
        <Flex>
          <Heading tag="h4" color="green" weight="bold" margin="1rem 0">
            {price} {t("kd")}
          </Heading>
          <Heading
            tag="h6"
            color="textSecondary"
            decoration="line-through"
            weight="bold"
            margin="1rem 0.5rem"
          >
            {price} {t("kd")}
          </Heading>
        </Flex>
      ) : (
        <Heading tag="h4" color="green" weight="bold" margin="1rem 0">
          {price} {t("kd")}
        </Heading>
      )}
    </Placeholder>
  );
};

export default ProductPrice;
