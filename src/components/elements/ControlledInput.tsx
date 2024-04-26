import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  forwardRef,
  FormControlProps,
  FormLabelProps,
  FormErrorMessageProps,
} from "@chakra-ui/react";
import { FieldErrors, FieldErrorsImpl, Ref } from "react-hook-form";

export type ControlledInputProps = {
  label: string;
  errors: Partial<FieldErrors<Record<string, unknown>>>;
  name: string;
  ref: Ref;
  isRequired?: boolean;
  formControlProps?: Omit<FormControlProps, "isInvalid" | "isRequired">;
  formLabelProps?: FormLabelProps;
  formErrorMessageProps?: FormErrorMessageProps;
} & Omit<InputProps, "isRequired">;

export const ControlledInput = forwardRef<ControlledInputProps, "input">(
  (
    {
      label,
      errors,
      name,
      isRequired,
      formControlProps,
      formLabelProps,
      formErrorMessageProps,
      ...rest
    }: Omit<ControlledInputProps, "ref">,
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(errors[name])} isRequired={isRequired} {...formControlProps}>
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        <Input name={name} {...rest} ref={ref} />
        <FormErrorMessage {...formErrorMessageProps}>{errors[name]?.message}</FormErrorMessage>
      </FormControl>
    );
  }
);
