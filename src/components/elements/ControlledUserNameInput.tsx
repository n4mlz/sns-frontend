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

export type ControlledUserNameInputProps = {
  label: string;
  errors: Partial<FieldErrors<Record<string, unknown>>>;
  name: string;
  ref: Ref;
  isRequired?: boolean;
  formControlProps?: Omit<FormControlProps, "isInvalid" | "isRequired">;
  formLabelProps?: FormLabelProps;
  formErrorMessageProps?: FormErrorMessageProps;
  isLoaded?: boolean;
  isCheckingUserName?: boolean;
  isCheckedUserName?: boolean;
  disableRightElement?: boolean;
} & Omit<InputProps, "isRequired">;

export const ControlledUserNameInput = forwardRef<ControlledUserNameInputProps, "input">(
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
      isCheckingUserName,
      isCheckedUserName,
      disableRightElement,
      ...rest
    }: Omit<ControlledUserNameInputProps, "ref">,
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(errors[name])} isRequired={isRequired} {...formControlProps}>
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        {!isLoaded ? (
          <Skeleton height={10} />
        ) : (
          <>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.300" />
              </InputLeftElement>
              <Input name={name} {...rest} ref={ref} />
              {disableRightElement ? null : isCheckingUserName ? (
                <InputRightElement>
                  <Tooltip label="ユーザー名が使用可能か検証しています..." bg={useColorModeValue("gray.500", "white")}>
                    <Spinner size="sm" />
                  </Tooltip>
                </InputRightElement>
              ) : isCheckedUserName ? (
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
            <FormErrorMessage {...formErrorMessageProps}>{errors[name]?.message}</FormErrorMessage>
          </>
        )}
      </FormControl>
    );
  }
);
