import { FieldErrors, Ref } from "react-hook-form";
import {
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  forwardRef,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
  FormLabelProps,
  FormErrorMessageProps,
  Skeleton,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

export type ControlledInputProps = {
  label: string;
  errors: Partial<FieldErrors<Record<string, unknown>>>;
  name: string;
  ref: Ref;
  isRequired?: boolean;
  formControlProps?: Omit<FormControlProps, "isInvalid" | "isRequired">;
  formLabelProps?: FormLabelProps;
  formErrorMessageProps?: FormErrorMessageProps;
  isLoaded?: boolean;
  isUserName?: boolean;
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
      isLoaded,
      isUserName,
      ...rest
    }: Omit<ControlledInputProps, "ref">,
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(errors[name])} isRequired={isRequired} {...formControlProps}>
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        {!isLoaded ? (
          <Skeleton height={10} />
        ) : (
          <>
            {isUserName ? (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.300" />
                </InputLeftElement>
                <Input name={name} {...rest} ref={ref} />
              </InputGroup>
            ) : (
              <Input name={name} {...rest} ref={ref} />
            )}
            <FormErrorMessage {...formErrorMessageProps}>{errors[name]?.message}</FormErrorMessage>
          </>
        )}
      </FormControl>
    );
  }
);
