/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const queryClient = useQueryClient();

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  // Extracted and Abstracted Custom React Hook Call 🦉🙌🏽
  const { isSubmitting, createCabin } = useCreateCabin();



  // Extracted and Abstracted Custom React Hook Call 🦉🙌🏽
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isSubmitting || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // React query calls the useForm hook reset() here directly on the Mutating function
          onSuccess: (data) => reset(),
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          // React query calls the useForm hook reset() here directly on the Mutating function
          onSuccess: (data) => reset(),
        }
      );
  };

  const onError = (errors) => {
    // console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>
      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isWorking}
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
        <Textarea
          type="number"
          disabled={isWorking}
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
            required: isEditSession
              ? false
              : "This field is required and cannot not be left blank",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
