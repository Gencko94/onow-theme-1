import { useContext, useMemo } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IconType } from "react-icons/lib";
import styled, { css } from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import useResponsive from "../../hooks/useResponsive";
import Color from "color";
import Ripple from "./Ripple";

interface IProps {
  /**
   * isLoading boolean , Renders a loading state.
   */
  isLoading?: boolean;
  /**
   * Button Disabled
   */
  disabled?: boolean;
  /**
   * ```onClick``` handler
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Button Text
   */
  text: string;
  /**
   * Button Text Size . default is 1rem
   */
  textSize?: string;
  /**
   * Icon
   */
  Icon?: IconType;
  /**
   * Icon size, defaults to 30
   */
  iconSize?: number;
  /**
   * Button ```padding```
   */
  padding: string;
  /**
   * Button Background color , There are presets but you can pass customer hex value
   */
  bg:
    | "primary"
    | "danger"
    | "blue"
    | "green"
    | "accent1"
    | "accent2"
    | "accent3";
  /**
   * Button Text color , defaults to White.
   */
  color?: "primary" | string;
  /**
   * if ```true``` button will be transitioned up
   */
  withTransition?: boolean;
  /**
   * button ```type```
   */
  type?: "submit" | "button";
  /**
   * button ```margin```
   */
  margin?: string;

  /**
   * Button With Ripple Effect.
   */
  withRipple?: boolean;
  /**
   * On Hover background color
   */
  hoverBg?: string;
  /**
   * On Hover text color
   */
  hoverColor?: string;
  /**
   * button shadow
   */
  shadow?: boolean;
  /**
   * With Border
   */
  border?: boolean;
  /**
   * button Width
   */
  width?: string;
  noRadius?: boolean;
  uppercase?: boolean;
}

const Button = ({
  onClick,
  bg,
  padding,
  type = "button",
  text,
  Icon,
  color,
  iconSize = 30,
  withTransition,
  margin = "none",
  withRipple,
  textSize = "1rem",
  hoverBg,
  hoverColor,
  shadow,
  border,
  isLoading,
  disabled,
  width,
  noRadius,
  uppercase,
}: IProps) => {
  const { isDesktop } = useResponsive();
  const { currentTheme } = useContext(ThemeContext);

  const background = useMemo(() => {
    switch (bg) {
      case "blue":
        return currentTheme.blue;
      case "danger":
        return currentTheme.dangerRed;
      case "primary":
        return currentTheme.primary;
      case "green":
        return currentTheme.green;
      case "accent1":
        return currentTheme.accent1;
      case "accent2":
        return currentTheme.accent2;
      case "accent3":
        return currentTheme.accent3;
    }
  }, [
    bg,
    currentTheme.blue,
    currentTheme.dangerRed,
    currentTheme.primary,
    currentTheme.green,
    currentTheme.accent1,
    currentTheme.accent2,
  ]);
  const hover = useMemo(() => {
    return Color(background).darken(0.1).hex();
  }, [background]);
  const textColor = useMemo(() => {
    if (background === currentTheme.primary) {
      return currentTheme.textPrimaryContrast;
    }
    if (Color(background).isDark()) {
      return currentTheme.textPrimaryContrast;
    } else {
      return currentTheme.textPrimary;
    }
  }, [
    background,
    currentTheme.primary,
    currentTheme.textPrimary,
    currentTheme.textPrimaryContrast,
  ]);
  return (
    <ButtonWrapper
      textSize={textSize}
      margin={margin}
      withTransition={withTransition}
      bg={background}
      padding={padding}
      color={color ?? textColor}
      onClick={onClick}
      type={type}
      hoverBg={hoverBg ?? hover}
      hoverColor={hoverColor}
      shadow={shadow}
      border={border}
      disabled={disabled}
      width={width}
      uppercase={uppercase}
      noRadius={noRadius}
    >
      {!isLoading && Icon && (
        <span className="icon">
          <Icon size={isDesktop ? iconSize : iconSize - 5} />
        </span>
      )}
      {isLoading && (
        <span className="loading">
          <ImSpinner2 className="loading" />
        </span>
      )}
      {!isLoading && <p className="text">{text}</p>}
      {withRipple && <Ripple />}
    </ButtonWrapper>
  );
};

export default Button;
export const ButtonWrapper = styled.button<{
  padding: string;
  color: string;
  bg: "primary" | "danger" | "blue" | "green";
  withTransition?: boolean;
  margin: string;
  textSize: string;
  hoverBg?: string;
  hoverColor?: string;
  shadow?: boolean;
  border?: boolean;
  width?: string;
  uppercase?: boolean;
  noRadius?: boolean;
}>(
  ({
    theme: {
      breakpoints,

      shadow,
      mainColor,

      border: themeBorder,
      font,
      primaryDarker,
    },
    padding,
    color,
    bg,
    withTransition,
    margin,
    textSize,
    hoverBg,
    hoverColor,
    border,
    shadow: boxShadow,
    disabled,
    uppercase,
    width,
    noRadius,
  }) => `
      background: ${bg};
      width:${width};
      box-shadow: ${boxShadow && shadow};
      display: flex;
      margin:${margin};
      justify-content:center;
      align-items: center;
      border-radius: ${!noRadius && "6px"};
      padding: ${padding};
      text-transform:${uppercase && "uppercase"};
      position: relative;
      overflow:hidden;
      color: ${color};
      border:${border && themeBorder};
      transition: all 100ms ease;
    .loading {
    animation: spinner 2s infinite linear forwards;
    };
  @keyframes spinner {
    
    100% {
      transform : rotate(360deg);
    }
  }
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p {
        font-size:${`calc(${textSize} - 0.1rem)`}; 
          margin: 0 0.25rem;
      }
      &:hover {
        background:${hoverBg};
        color: ${hoverColor};
      }
      
      ${
        withTransition &&
        css`
          &:hover {
            transform: translateY(-2px);
          }
        `
      }
      ${
        disabled &&
        css`
          background: #a7a2a2;
          color: #fff;
        `
      };
    @media ${breakpoints.md}{
    p {
      font-size:${textSize};
    }
  }
    `
);
