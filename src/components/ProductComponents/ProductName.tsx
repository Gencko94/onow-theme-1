import { useTranslation } from "react-i18next";
import Heading from "../reusables/Heading";
import Placeholder from "../reusables/Placeholder";

const ProductName = ({ name }: { name: { [key: string]: string } }) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Placeholder height="40px" ready={Boolean(name)} margin="1rem 0">
      <Heading tag="h2" color="textPrimary" weight="bold" margin="1.5rem 0">
        {name[language]}
      </Heading>
    </Placeholder>
  );
};

export default ProductName;
