import styled from "styled-components";
import { PRODUCT_OPTION } from "../../interfaces/product";
import Heading from "../reusables/Heading";
import MultiSelectOption from "../reusables/ProductOptions/MultiSelectOption";
import SingleSelectOption from "../reusables/ProductOptions/SingleSelectOption";
import { useTranslation } from "react-i18next";

interface IProps {
  options: PRODUCT_OPTION[];
}

const ProductOptions = ({ options }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div>
      {options.map((option) => {
        if (option.select_type === "single") {
          return (
            <>
              <Heading tag="h5" margin="1rem 0">
                {option.name[language]}
              </Heading>
              <Container>
                <SingleSelectOption option={option} />
              </Container>
            </>
          );
        } else {
          return (
            <div>
              <Heading tag="h5" margin="1rem 0">
                {option.name[language]}
              </Heading>
              <Container>
                <MultiSelectOption option={option} />
              </Container>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProductOptions;
const Container = styled.div`
  border-radius: 6px;
  background-color: #fff;
  border: ${(props) => props.theme.border};
`;
