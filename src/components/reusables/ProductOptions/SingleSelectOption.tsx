import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PRODUCT_OPTION } from "../../../interfaces/product";
import RadioButton from "../RadioButton";

interface IProps {
  option: PRODUCT_OPTION;
}

const SingleSelectOption = ({ option }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div>
      {option.values.map((value) => {
        return (
          <Container>
            <RadioButton
              onChange={() => {}}
              label={value.name[language]}
              checked={true}
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
