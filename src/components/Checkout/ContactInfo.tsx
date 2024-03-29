import { DeepMap, FieldError } from "react-hook-form";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { CHECKOUT_FORM } from "../../interfaces/checkoutForm";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface IProps {
  register: any;
  errors: DeepMap<CHECKOUT_FORM, FieldError>;
}

const ContactInfo = ({ register, errors }: IProps) => {
  const { t, i18n } = useTranslation(["checkout"]);
  const { mode } = useContext(ThemeContext);
  return (
    <Container>
      {/* <StepNumber isDark={mode === "dark"}>1</StepNumber> */}
      {/* <SectionTitle>{t("contact-info")}</SectionTitle> */}
      {/* <DashedLine rtl={i18n.language === "ar"} /> */}
      <SectionBody>
        <InputContainer>
          <Label>{t("first-name")}</Label>
          <Input colored border name="first_name" ref={register} />
          <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Label>{t("last-name")}</Label>
          <Input colored border name="last_name" ref={register} />
          <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Label>{t("phone-number")}</Label>
          <PhoneInputContainer>
            <PhoneKey>+965</PhoneKey>
            <Input name="phone_number" ref={register} />
          </PhoneInputContainer>
          <ErrorMessage>{errors.phone_number?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Label>{t("email")}</Label>
          <Input colored border name="email" ref={register} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </InputContainer>
      </SectionBody>
    </Container>
  );
};

export default ContactInfo;
const StepNumber = styled.span<{ isDark: boolean }>`
  padding: 0.5rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${(props) =>
    props.isDark ? props.theme.overlayColor : props.theme.mainColor};
  color: #fff;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
`;
const DashedLine = styled.span<{ rtl: boolean }>(
  ({ theme: { breakpoints, font, seperator }, rtl }) => `
  border-right: ${rtl ? "none" : `2px dashed ${seperator}`};
  border-left: ${rtl ? `2px dashed ${seperator}` : "none"};
  margin-right: ${rtl ? "0" : "17px"};
  margin-left: ${rtl ? "17px" : "0"};
 
  `
);
const SectionTitle = styled.h5(
  ({ theme: { breakpoints, font } }) => `
  font-weight:${font.bold};
 
 
 font-size:1.05rem;
  @media ${breakpoints.md} {
    font-size:1.25rem;
    }
  }
`
);
const Container = styled.div(
  ({ theme: { breakpoints } }) => `
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 0.25rem;
  row-gap: 0.5rem;
  @media ${breakpoints.md}{
    
    row-gap: 1rem;
    gap: 0.5rem;
  }
  `
);

const InputContainer = styled.div`
  margin-bottom: 0.75rem;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${(props) => props.theme.font.semibold};
  display: block;
`;
const PhoneInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.btnBorder};
  background-color: ${(props) => props.theme.inputColorLight};
`;
const PhoneKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => props.theme.font.semibold};
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  color: ${(props) => props.theme.dangerRed};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;
const SectionBody = styled.div(
  ({ theme: { breakpoints, overlayColor, border, shadow } }) => `
  padding: 0.5rem;
  padding-top:0.75rem;
 
  background: ${overlayColor};
  display:grid;
  gap:0.5rem;
  border-radius:6px;
  grid-template-columns:1fr;
  border: ${border};
  box-shadow:${shadow};
  @media ${breakpoints.md}{
    
    grid-template-columns:1fr 1fr;
  }
  `
);
const Input = styled.input<{ border?: boolean; colored?: boolean }>`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  color: ${(props) => props.theme.subHeading};
  border: ${(props) => props.border && `1px solid ${props.theme.btnBorder}`};
  border-radius: ${(props) => props.border && "5px"};
  background-color: ${(props) => props.colored && props.theme.inputColorLight};
`;
