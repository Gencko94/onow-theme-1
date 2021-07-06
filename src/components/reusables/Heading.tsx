import { CSSProperties, FC } from "react";
import styled from "styled-components";

interface IProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mb?: string;
  color?:
    | "textPrimary"
    | "textPrimaryContrast"
    | "textSecondary"
    | "textSecondaryContrast"
    | "green";
  padding?: string;
  margin?: string;
  weight?: "light" | "regular" | "semibold" | "bold" | "xbold";
  decoration?: "line-through" | "underline";
}

const Heading: FC<IProps> = ({
  tag,
  padding,
  children,
  mb,
  color = "textPrimary",
  margin,
  weight = "regular",
  decoration,
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
      as={tag}
      color={color}
      mb={mb}
      weight={weight}
      decoration={decoration}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
export const Wrapper = styled.h1<{
  color?:
    | "textPrimary"
    | "textPrimaryContrast"
    | "textSecondary"
    | "textSecondaryContrast"
    | "green";
  mb?: string;
  weight: "light" | "regular" | "semibold" | "bold" | "xbold";
  decoration?: "line-through" | "underline";
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
    decoration,
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
  text-decoration:${decoration};
  `
);
