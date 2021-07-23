import ClickAwayListener from "react-click-away-listener";
import styled from "styled-components";

interface IProps {
  /**
   * Transform Origin
   */
  origin?: string;
  /**
   * Close function
   */
  closeFunction: () => void;
  bottom?: string;
  top?: string;
  right?: string;
  left?: string;
}

const Popover: React.FC<IProps> = ({
  children,
  origin = "right",
  closeFunction,
  bottom,
  left,
  right,
  top,
}) => {
  return (
    <ClickAwayListener onClickAway={() => closeFunction()}>
      <Container
        top={top}
        right={right}
        left={left}
        bottom={bottom}
        origin={origin}
      >
        {children}
      </Container>
    </ClickAwayListener>
  );
};

export default Popover;

const Container = styled.div<{
  origin: string;
  bottom?: string;
  top?: string;
  right?: string;
  left?: string;
}>`
  position: absolute;
  overflow: hidden;
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  top: ${(props) => props.top};

  z-index: 10;
  background-color: #fff;
  transform-origin: ${(props) => props.origin};
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 6px;
`;
