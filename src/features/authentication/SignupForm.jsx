/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { isLoading, signup } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled:() => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isLoading}
          {...register("fullName", {
            required: "Full name is required",
          })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Password is required",
            validate: (value) =>
              value === getValues().password || "The passwords do not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'  disabled={isLoading}>
          Cancel
        </Button>
        <Button  disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
