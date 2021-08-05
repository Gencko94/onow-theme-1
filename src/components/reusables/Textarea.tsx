import { SetStateAction } from "react";
import { Dispatch } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

interface IProps {
  rows?: number;
  value: string;
  onChange: (value: string) => void;
  desc?: string;
}

const Textarea = ({ rows = 4, onChange, value, desc }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
      />

      {desc && <p className="desc">{desc}</p>}
    </Container>
  );
};

export default Textarea;
const Container = styled.div`
  textarea {
    width: 100%;
    padding: 0.4rem;
    font-size: 0.8rem;
    background-color: #fff;
    color: ${(props) => props.theme.headingColor};
    border: ${(props) => props.theme.border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;

    &:hover,
    &:focus-within {
      border-color: ${(props) => props.theme.borderHovered};
      background-color: ${(props) => props.theme.inputColorLight};
    }
  }
`;
