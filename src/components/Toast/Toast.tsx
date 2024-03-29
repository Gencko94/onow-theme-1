import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import styled from "styled-components";
import useResponsive from "../../hooks/useResponsive";
import { up } from "../../utils/themes";
import Button from "../reusables/Button";
import Flex from "../reusables/Flex";
import Heading from "../reusables/Heading";

interface IProps {
  text: string;
  btnText: string;
  closeFunction: () => void;
  type: "success" | "error";
}

const Toast = ({ text, btnText, closeFunction, type }: IProps) => {
  const { isDesktop } = useResponsive();
  return (
    <Container type={type}>
      {type === "error" ? (
        <RiErrorWarningLine size={isDesktop ? 40 : 30} />
      ) : (
        <IoIosCheckmarkCircleOutline size={isDesktop ? 40 : 30} />
      )}
      <div className="content">
        <Heading tag="h6">{text}</Heading>
        {/* <h6>{text}</h6> */}
        <Flex justify="flex-end">
          <Button
            withRipple
            text={btnText}
            onClick={(e) => {
              e.stopPropagation();
              closeFunction();
            }}
            bg="accent1"
            hoverBg="#f8f8f83b"
            padding="0.25rem"
            textSize="0.8rem"
          />
        </Flex>
      </div>
    </Container>
  );
};

export default Toast;
const Container = styled.div<{ type: "error" | "success" }>(
  ({ theme: { breakpoints, font }, type }) => `
  background-color: ${
    type === "error" ? "rgba(238, 24, 24, 0.95)" : "rgba(20, 148, 20, 0.95)"
  };
    color: #fff;
    display: grid;
    grid-template-columns: 0.2fr 1fr;
    gap: 0.5rem;
    padding: 0.75rem;
    border-radius: 6px 0 0 6px;
    position: fixed;
    top: 75px;
    right: 0px;
    align-items: center;
    z-index: 1000;
    min-width: 250px;
    
    h6 {
      color:#fff;
      font-size: 0.8rem;
      font-weight: ${font.regular};
    }
    ${up(breakpoints.md)}{
      h6 {
        font-weight: ${font.semibold};
      }
      min-width: 350px;
    }
    `
);
