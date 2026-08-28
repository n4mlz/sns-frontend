import { AtSignIcon, CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";
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
import { FieldErrors, Ref } from "react-hook-form";

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
  checkingTooltipLabel?: string;
  checkedTooltipLabel?: string;
  notCheckedTooltipLabel?: string;
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
      checkingTooltipLabel,
      checkedTooltipLabel,
      notCheckedTooltipLabel,
      ...rest
    }: Omit<ControlledUserNameInputProps, "ref">,
    ref
  ) => {
    const tooltipBackground = useColorModeValue("gray.500", "white");
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
                  <Tooltip label={checkingTooltipLabel} bg={tooltipBackground}>
                    <Spinner size="sm" />
                  </Tooltip>
                </InputRightElement>
              ) : isCheckedUserName ? (
                <InputRightElement>
                  <Tooltip label={checkedTooltipLabel} bg={tooltipBackground}>
                    <CheckCircleIcon color="green.500" />
                  </Tooltip>
                </InputRightElement>
              ) : (
                <InputRightElement>
                  <Tooltip label={notCheckedTooltipLabel} bg={tooltipBackground}>
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
