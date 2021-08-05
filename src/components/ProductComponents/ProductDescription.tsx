import { useTranslation } from "react-i18next";
import Paragraph from "../reusables/Paragraph";
import Placeholder from "../reusables/Placeholder";

const ProductDescription = ({
  description,
}: {
  description?: { [key: string]: string };
}) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Placeholder
      type="text"
      height="70px"
      ready={Boolean(description)}
      margin="1rem 0"
    >
      <Paragraph color="textSecondary" fontSize="1rem" margin="2rem 0 ">
        {description?.[language]}
      </Paragraph>
    </Placeholder>
  );
};

export default ProductDescription;
