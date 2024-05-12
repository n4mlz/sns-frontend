import { FieldErrors, Ref } from "react-hook-form";
import {
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  forwardRef,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
  FormLabelProps,
  FormErrorMessageProps,
  Skeleton,
  Tooltip,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { AtSignIcon, CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";

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
  isLoadingAvailable?: boolean;
  isAvailableUserName?: boolean;
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
      isLoadingAvailable,
      isAvailableUserName,
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

                {isLoadingAvailable ? (
                  <InputRightElement>
                    <Tooltip
                      label="ユーザー名が使用可能か検証しています..."
                      bg={useColorModeValue("gray.500", "white")}>
                      <Spinner size="sm" />
                    </Tooltip>
                  </InputRightElement>
                ) : isAvailableUserName ? (
                  <InputRightElement>
                    <Tooltip label="このユーザー名は使用できます。" bg={useColorModeValue("gray.500", "white")}>
                      <CheckCircleIcon color="green.500" />
                    </Tooltip>
                  </InputRightElement>
                ) : (
                  <InputRightElement>
                    <Tooltip label="このユーザー名は使用できません。" bg={useColorModeValue("gray.500", "white")}>
                      <NotAllowedIcon color="red.500" />
                    </Tooltip>
                  </InputRightElement>
                )}
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
