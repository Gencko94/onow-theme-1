import { CSSProperties, FC } from "react";
import styled from "styled-components";

interface IProps {
  mb?: string;
  fontSize?: string;
  color?:
    | "textPrimary"
    | "textPrimaryContrast"
    | "textSecondary"
    | "textSecondaryContrast"
    | "green";
  padding?: string;
  margin?: string;
  weight?: "light" | "regular" | "semibold" | "bold" | "xbold";
}

const Paragraph: FC<IProps> = ({
  padding,
  children,
  fontSize = "1rem",
  mb,
  color = "textPrimary",
  margin,
  weight = "regular",
}) => {
  return (
    <Wrapper
      style={
        {
          "--margin-b": `${mb}`,
          "--color": color,
          "--padding": padding,
          "--margin": margin,
        } as CSSProperties
      }
      color={color}
      mb={mb}
      weight={weight}
      fontSize={fontSize}
    >
      {children}
    </Wrapper>
  );
};

export default Paragraph;
export const Wrapper = styled.p<{
  color?:
    | "textPrimary"
    | "textPrimaryContrast"
    | "textSecondary"
    | "textSecondaryContrast"
    | "green";
  mb?: string;
  weight: "light" | "regular" | "semibold" | "bold" | "xbold";
  fontSize: string;
}>(
  ({
    theme: {
      breakpoints,
      textPrimary,
      textPrimaryContrast,
      textSecondary,
      textSecondaryContrast,
      green,
      font,
    },
    color,
    mb,
    weight,
    fontSize,
  }) => `
  color: ${
    color === "textPrimary"
      ? textPrimary
      : color === "textPrimaryContrast"
      ? textPrimaryContrast
      : color === "textSecondary"
      ? textSecondary
      : color === "textSecondaryContrast"
      ? textSecondaryContrast
      : color === "green"
      ? green
      : textPrimary
  };
  margin:var(--margin,0);
  font-weight:${font[weight]};
  margin-bottom: ${mb ? mb : ""};
  padding:var(--padding,0);
  font-size: calc(${fontSize} -1);
  @media ${breakpoints.md}{
      font-size:${fontSize}

  }
  `
);
