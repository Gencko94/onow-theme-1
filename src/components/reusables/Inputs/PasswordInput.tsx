import { useState } from "react";
import { FieldError, RefCallBack, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CgPassword } from "react-icons/cg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import styled, { css } from "styled-components";
import InputErrorMessage from "./InputErrorMessage";
interface BaseInput {
  /**
   * 	An object with field errors. Obtainable from ```formState.errors```
   */
  errors?: FieldError | undefined;

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
  ref?: RefCallBack;
  /**
   * ```onChange``` handler
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Input value
   */
  value: string;
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

const PasswordInput = ({
  errors,
  ref,
  label,
  required,
  requiredMessage,

  placeholder,
  desc,
  onChange,
  value,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <Container rtl={language === "ar"} error={Boolean(errors?.message)}>
      {label && <label>{label}</label>}
      <div className="input-container">
        <span className="icon">
          <CgPassword size={21} />
        </span>
        <Input
          onChange={onChange}
          value={value}
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
        />
        <span className="visibility" onClick={() => handleShowPassword()}>
          {showPassword ? (
            <MdVisibilityOff size={21} />
          ) : (
            <MdVisibility size={21} />
          )}
        </span>
      </div>
      {desc && <p className="desc">{desc}</p>}

      <InputErrorMessage msg={errors?.message} />
    </Container>
  );
};

export default PasswordInput;
const Container = styled.div<{ rtl: boolean; error: boolean }>(
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
      accent1,
      textSecondary,
    },
    error,
    rtl,
  }) => `
  label {
    color: ${headingColor};
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
    font-weight: ${font.regular};
    display: block;
  }
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
    }
    
    &:hover,
    &:focus-within {
      border-color: ${borderHovered};
      background-color: ${accent1};
    }
    ${
      error &&
      css`
        border-color: ${dangerRed} !important;
      `
    }
    }
    .visibility {
      padding: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .desc {
      font-size: 0.7rem;
      padding-top: 0.25rem;
      height: 22px;
      
      color: ${textSecondary};
    }
    @media  ${breakpoints.md}{
      label {
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
      };
  
    };
    `
);
const Input = styled.input(
  ({ theme: { breakpoints } }) => `
  flex: 1;
  padding: 0.4rem;
  font-size: 0.8rem;
  width: 50px;
  @media  ${breakpoints.md}{
  
      
      input {
        font-size: 0.9rem;
      }
    

  };
  `
);
