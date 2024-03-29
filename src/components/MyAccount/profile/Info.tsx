import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdSubtitles } from "react-icons/md";
import styled from "styled-components";
import { AuthProvider } from "../../../contexts/AuthContext";
import { up } from "../../../utils/themes";
import Grid from "../../reusables/Grid";
import Heading from "../../reusables/Heading";
import IconedInput from "../../reusables/Inputs/IconedInput";
interface FormProps {
  first_name: string;
  last_name: string;
}

const Info = () => {
  const { user } = useContext(AuthProvider);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormProps>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });
  const { t } = useTranslation(["profile"]);
  // useEffect(() => {
  //   console.log(user);
  //   if (user) {
  //     reset({
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       email: user.email,
  //       phone_number: user.phone_number,
  //     });
  //   }
  // }, [user]);
  return (
    <div>
      <Heading tag="h4" color="textPrimary">
        {t("your-info")}
      </Heading>
      <Grid cols="1fr 1fr" gap="2rem">
        <Controller
          name="first_name"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <IconedInput
                value={value}
                onChange={onChange}
                Icon={MdSubtitles}
                label={t("first-name")}
              />
            );
          }}
        />
        {/* <InputContainer>
          <Label>{t("first-name")}</Label>
          <Input colored border name="first_name" ref={register} />
        </InputContainer> */}
        {/* <InputContainer>
          <Label>{t("last-name")}</Label>
          <Input colored border name="last_name" ref={register} />
         
        </InputContainer>
        <InputContainer>
          <Label>{t("email")}</Label>
          <Input colored border readOnly defaultValue={user?.email} />
        
        </InputContainer>
        <InputContainer>
          <Label>{t("phonenumber")}</Label>
          <Input
            colored
            border
            readOnly
            disabled
            defaultValue={user?.phone_number}
          />
        
        </InputContainer> */}
      </Grid>
    </div>
  );
};

export default Info;
const Head = styled.div`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;
const Title = styled.h5`
  color: ${(props) => props.theme.headingColor};
  font-weight: ${(props) => props.theme.font.bold};
`;

const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Input = styled.input<{ border?: boolean; colored?: boolean }>`
  padding: 0.5rem;
  width: 100%;
  font-size: 0.9rem;

  color: ${(props) => props.theme.subHeading};
  border: ${(props) => props.border && `1px solid ${props.theme.btnBorder}`};
  border-radius: ${(props) => props.border && "5px"};
  background-color: ${(props) => props.colored && props.theme.inputColorLight};
`;
const Label = styled.label`
  color: ${({ theme }) => theme.subHeading};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${(props) => props.theme.font.bold};
  display: block;
`;
