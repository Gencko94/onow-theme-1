import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { MdSmartphone } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import ModalHead from "../components/Modal/ModalHead";
import { ModalWrapper } from "../components/Modal/ModalWrapper";
import Button from "../components/reusables/Button";
import Flex from "../components/reusables/Flex";
import Grid from "../components/reusables/Grid";
import Hr from "../components/reusables/Hr";
import IconedInput from "../components/reusables/Inputs/IconedInput";
import PasswordInput from "../components/reusables/Inputs/PasswordInput";
import Paragraph from "../components/reusables/Paragraph";
import { ApplicationProvider } from "../contexts/ApplicationContext";
import { LOGIN_FORM } from "../interfaces/auth";
import extractError from "../utils/extractError";
import { userLogin } from "../utils/queries";
import { up } from "../utils/themes";

const LoginModal = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation(["auth"]);
  const queryClient = useQueryClient();
  const location = useLocation<string>();
  const history = useHistory();
  const {
    setToastStatus,
    handleCloseToast,
    handleCloseAuthModal,
    setAuthModalStatus,
  } = useContext(ApplicationProvider);
  const {
    control,
    handleSubmit,

    setError,
    formState: { isSubmitting, errors },
  } = useForm<LOGIN_FORM>();

  // Login Mutation
  const { mutateAsync: login } = useMutation(userLogin, {
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("tpid", data.token);
        queryClient.setQueryData("auth", data.user);
        if (location.state) {
          history.replace(location.state);
        } else {
          history.replace("/");
        }
      }
    },
    onError: (error) => {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        if (
          responseError.data.message === "Phone Number or Password is Missing"
        ) {
          setError("password", {
            message: t("fields-missing-response"),
          });
          setError("phone_number", {
            message: t("fields-missing-response"),
          });
        } else if (responseError.data.message === "Invalid Credentials") {
          setError("password", {
            message: t("invalid-credentials"),
          });
          setError("phone_number", {
            message: t("invalid-credentials"),
          });
        }
      } else {
        setToastStatus?.({
          open: true,
          fn: handleCloseToast!,
          text: "Something Went Wrong",
          type: "error",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<LOGIN_FORM> = async (data) => {
    await login(data);
  };
  return (
    <Modal>
      <ModalHead closeFunction={handleCloseAuthModal!} title="Log in" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid cols="1fr" gap="1rem">
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { value, onChange, ref } }) => {
              return (
                <IconedInput
                  Icon={MdSmartphone}
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  label="Email"
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, ref } }) => {
              return (
                <PasswordInput
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  label="Password"
                />
              );
            }}
          />
        </Grid>
        <Flex justify="center" margin="0.5rem 0">
          <Paragraph fontSize="0.9rem" color="textSecondary">
            <Trans i18nKey="auth:forgot-password">
              Forgot Password ?
              <InlineLink
                onClick={() => {
                  setAuthModalStatus?.({
                    mode: "register",
                    open: true,
                  });
                }}
              >
                Reset Here
              </InlineLink>
            </Trans>
          </Paragraph>
        </Flex>
        <Flex>
          <Button
            width="100%"
            type="submit"
            bg="green"
            text="Login"
            padding="0.5rem"
            withRipple
            withTransition
          />
        </Flex>
        <Hr />
        <Flex justify="center" margin="2rem 0">
          <Paragraph fontSize="0.9rem" color="textSecondary">
            <Trans i18nKey="auth:no-account">
              Don't have an account ?
              <InlineLink
                onClick={() => {
                  setAuthModalStatus?.({
                    mode: "register",
                    open: true,
                  });
                }}
              >
                Register here
              </InlineLink>
            </Trans>
          </Paragraph>
        </Flex>
        <Flex justify="space-between" margin="0.5rem 0">
          <span style={{ borderTop: "1px solid rgba(0,0,0,0.2)", flex: "1" }} />
          <Paragraph margin="0 0.5rem" fontSize="0.9rem" color="textSecondary">
            Or Login using
          </Paragraph>
          <span style={{ borderTop: "1px solid rgba(0,0,0,0.2)", flex: 1 }} />
        </Flex>
        <Flex justify="center">
          <Button
            textSize="0.9rem"
            Icon={AiFillFacebook}
            iconSize={20}
            bg="blue"
            text="Facebook"
            padding="0.5rem"
            withRipple
            withTransition
          />
          <Button
            textSize="0.9rem"
            Icon={AiOutlineTwitter}
            iconSize={20}
            bg="blue"
            text="Twitter"
            padding="0.5rem"
            margin="0 0.5rem"
            withRipple
            withTransition
          />
        </Flex>
      </Form>
    </Modal>
  );
};

export default LoginModal;
const Modal = styled(ModalWrapper)(
  ({ theme: { breakpoints, shadow, accent1 } }) => `
  position: fixed;
  z-index: 20;
  inset:100px 20px;
  position:fixed;
  border:none;
  outline:none;
  z-index:20;
  background-color:${accent1};

  ${up(breakpoints.md)}{
    inset:200px 250px;
    min-width:350px;
  }
  ${up(breakpoints.lg)}{
      inset:200px 350px;
  }
  ${up(breakpoints.xl)}{
    inset:200px 550px;
  }
  `
);
const Form = styled.form`
  background-color: ${(props) => props.theme.accent1};
  padding: 1rem;
`;
const InlineLink = styled.span`
  color: ${(props) => props.theme.dangerRed};
  font-weight: ${(props) => props.theme.font.regular};
  text-decoration: underline;
  cursor: pointer;
`;
