import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PRODUCT_OPTION } from "../../../interfaces/product";
import { ProductProvider } from "../../../pages/Product";
import RadioButton from "../RadioButton";

interface IProps {
  option: PRODUCT_OPTION;
}

const SingleSelectOption = ({ option }: IProps) => {
  const { formValues, setFormValues } = useContext(ProductProvider);
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div>
      {option.values.map((value) => {
        return (
          <Container>
            <RadioButton
              onChange={() => {
                setFormValues?.((prev) => ({
                  ...prev,
                  options: {
                    ...prev.options,
                    [option.id]: value.id,
                  },
                }));
              }}
              label={value.name[language]}
              checked={formValues?.options[option.id] === value.id}
            />
          </Container>
        );
      })}
    </div>
  );
};

export default SingleSelectOption;
const Container = styled.div`
  margin: 1rem;
`;
