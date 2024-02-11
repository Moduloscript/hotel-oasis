/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  //    This is necessary to access the Client Cache state Across to Keep in Sync
  const queryClient = useQueryClient();

  const { isLoading: isSubmitting, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin was successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      image: data.image[0],
    });
  };

  const onError = (errors) => {
    // console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isSubmitting}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      {/* Reference code before the Refactoring 💫⭐ */}
      {/* <FormRow2>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
           disabled={isSubmitting}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is required and cannot not be left blank",
            min: {
              value: 1,
              message: "Capacity should be at Least 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow2> */}

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="text"
          disabled={isSubmitting}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="text"
          disabled={isSubmitting}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isSubmitting}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required and cannot not be left blank",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the Price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Input
          type="text"
          disabled={isSubmitting}
          id="description"
          {...register("description", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSubmitting}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
