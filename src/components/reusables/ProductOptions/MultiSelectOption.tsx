import Checkbox from "../Checkbox";
import { useTranslation } from "react-i18next";

import RadioButton from "../RadioButton";
import { PRODUCT_OPTION } from "../../../interfaces/product";
import Flex from "../Flex";
import Paragraph from "../Paragraph";
import styled from "styled-components";

interface IProps {
  option: PRODUCT_OPTION;
}

const MultiSelectOption = ({ option }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div>
      {option.values.map((value) => {
        return (
          <Container>
            <Checkbox
              onChange={() => {}}
              checked={true}
              small
              id={value.id.toString()}
              label={value.name[language]}
            />
          </Container>
        );
      })}
    </div>
  );
};

export default MultiSelectOption;
const Container = styled.div`
  margin: 1rem;
`;
