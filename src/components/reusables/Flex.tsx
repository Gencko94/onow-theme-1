import { CSSProperties, FC } from "react";
import styled from "styled-components";
interface IProps {
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-evenly";
  items?: string;
  padding?: string;
  margin?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  wrap?: boolean;
  column?: boolean;
  borderB?: boolean;
}
const Flex: FC<IProps> = ({
  children,
  items,
  justify,
  padding,
  margin,
  onClick,
  wrap,
  column,
  borderB,
}) => {
  return (
    <FlexWrapper
      onClick={onClick}
      column={column}
      borderb={borderB}
      style={
        {
          "--justify": justify,
          "--items": items,
          "--padding": padding,
          "--margin": margin,
          "--wrap": wrap ? "wrap" : "nowrap",
        } as CSSProperties
      }
    >
      {children}
    </FlexWrapper>
  );
};

export default Flex;
export const FlexWrapper = styled.div<{ column?: boolean; borderb?: boolean }>`
  display: flex;
  justify-content: var(--justify, normal);
  align-items: var(--items, center);
  padding: var(--padding, 0);
  margin: var(--margin, 0);
  flex-wrap: var(--wrap, nowrap);
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  border-bottom: ${(props) => props.borderb && props.theme.border};
`;
