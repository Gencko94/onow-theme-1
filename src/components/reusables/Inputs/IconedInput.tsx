import { RefCallBack } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";

import styled, { css } from "styled-components";
import useResponsive from "../../../hooks/useResponsive";
import { up } from "../../../utils/themes";
import InputErrorMessage from "./InputErrorMessage";
interface BaseInput {
  isError?: boolean;
  error?: any;
  /**
   * 	The icon to show.
   */
  Icon: IconType;
  /**
   * 	The label of the input.
   */
  label?: string;

  /**
   * 	Optional description shown in a smaller size text below the input.
   */
  desc?: string;

  /**
   * 	Optional placeholder for the input.
   */
  placeholder?: string;
  /**
   * Default Value
   */
  defaultValue?: any;
  /**
   * ```onChange``` handler
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Input value
   */
  value: string;

  ref?: RefCallBack;
}
interface RequiredInput extends BaseInput {
  /**
   * 	Optional. Marks the input as ```required```.
   */
  required: boolean;
  /**
   * The Message text to show when the field is ```required```.
   *
   * Required when ```required``` is provided.
   */
  requiredMessage: string;
}
interface NotRequiredInput extends BaseInput {
  required?: never;
  requiredMessage?: never;
}

type IProps = RequiredInput | NotRequiredInput;

const IconedInput = ({
  Icon,
  isError,
  required,
  label,
  requiredMessage,
  placeholder,
  desc,
  defaultValue,
  value,
  onChange,
  error,
  ref,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { isDesktop } = useResponsive();
  return (
    <Container rtl={language === "ar"} error={isError}>
      {label && <label>{label}</label>}
      <div className="input-container">
        <span className="icon">
          <Icon size={isDesktop ? 20 : 19} />
        </span>

        <input
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      {desc && <p className="desc">{desc}</p>}
      <InputErrorMessage msg={error?.message} />
    </Container>
  );
};

export default IconedInput;
const Container = styled.div<{ rtl: boolean; error?: boolean }>(
  ({
    theme: {
      breakpoints,
      font,
      headingColor,
      border,
      inputColorLight,
      mainColor,
      borderHovered,
      dangerRed,
    },
    error,
    rtl,
  }) => `


  label {
    color: ${headingColor};
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    font-weight: ${font.regular};
    display: block;
  };
  .input-container {
    display: flex;
    position: relative;

    justify-content: center;

    background-color: #fff;
    color: ${headingColor};
    border: ${border};
    overflow: hidden;
    border-radius: 6px;
    transition: all 150ms ease;
    .icon {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${mainColor};
      
      
    };

    input {
      flex: 1;
      padding: 0.4rem;
      font-size: 0.8rem;
      width: 50px;
    };
    &:hover,
    &:focus-within {
      border-color: ${borderHovered};
   
    }
    ${
      error &&
      css`
        border-color: ${dangerRed} !important;
      `
    }
  };

  .desc {
    font-size: 0.7rem;
    padding-top: 0.25rem;
    height: 22px;

    color: ${mainColor};
  };
  ${up(breakpoints.md)}{
    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    };
    .input-container{
      
      input {
        font-size: 0.9rem;
      }
    }

  };
  `
);
