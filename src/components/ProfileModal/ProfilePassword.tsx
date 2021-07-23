import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { ApplicationProvider } from "../../contexts/ApplicationContext";
import { USER } from "../../interfaces/auth";
import extractError from "../../utils/extractError";
import { editCustomer } from "../../utils/queries/customerQueries";
import Button from "../reusables/Button";
import Flex from "../reusables/Flex";
import Grid from "../reusables/Grid";
import Heading from "../reusables/Heading";
import PasswordInput from "../reusables/Inputs/PasswordInput";

const ProfilePassword = () => {
  const { setToastStatus, handleCloseToast } = useContext(ApplicationProvider);
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,

    setError,
    formState: { isSubmitting, errors },
  } = useForm<USER>();

  // Edit Mutation
  const { mutateAsync: editMutation } = useMutation(editCustomer, {
    onSuccess: (data) => {},
    onError: (error) => {
      const { responseError, unknownError } = extractError(error);
      if (responseError) {
        console.log(responseError);
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

  const onSubmit: SubmitHandler<USER> = async (data) => {
    await editMutation(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h4" weight="regular" mb="2rem">
        Change Password
      </Heading>

      <Grid cols="repeat(auto-fit,minmax(250px,1fr))" gap="1rem" borderB>
        <Controller
          control={control}
          name="first_name"
          render={({ field: { value, onChange, ref } }) => {
            return (
              <PasswordInput
                ref={ref}
                value={value}
                onChange={onChange}
                label="Old Password"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field: { value, onChange, ref } }) => {
            return (
              <PasswordInput
                ref={ref}
                value={value}
                onChange={onChange}
                label="New Password"
                desc="Min 6 Charachters"
              />
            );
          }}
        />
      </Grid>

      <Flex justify="flex-end" margin="1rem 0">
        <Button
          // width="100%"
          type="submit"
          bg="green"
          text="Change Password"
          textSize="0.9rem"
          padding="0.5rem"
          withRipple
          withTransition
        />
      </Flex>
    </Form>
  );
};

export default ProfilePassword;
const Form = styled.form`
  background-color: ${(props) => props.theme.accent1};
  padding: 1rem;
`;
