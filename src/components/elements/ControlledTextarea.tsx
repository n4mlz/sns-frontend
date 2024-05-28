"use client";

import { FieldErrors, Ref } from "react-hook-form";
import {
  forwardRef,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
  FormLabelProps,
  FormErrorMessageProps,
  Skeleton,
  useToken,
  Box,
} from "@chakra-ui/react";
import { RichTextarea, RichTextareaProps, createRegexRenderer } from "rich-textarea";
import styles from "@components/elements/richTextarea.module.css";

export type ControlledTextareaProps = {
  label: string;
  errors: Partial<FieldErrors<Record<string, unknown>>>;
  name: string;
  ref: Ref;
  isRequired?: boolean;
  formControlProps?: Omit<FormControlProps, "isInvalid" | "isRequired">;
  formLabelProps?: FormLabelProps;
  formErrorMessageProps?: FormErrorMessageProps;
  isLoaded?: boolean;
  isUnstyled?: boolean;
} & Omit<RichTextareaProps, "isRequired" | "style">;

export const ControlledTextarea = forwardRef<ControlledTextareaProps, "input">(
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
      isUnstyled,
      ...rest
    }: Omit<ControlledTextareaProps, "ref">,
    ref
  ) => {
    const [blue400] = useToken("colors", ["blue.400"]);
    const renderer = createRegexRenderer([[/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, { color: blue400 }]]);

    return (
      <FormControl isInvalid={Boolean(errors[name])} isRequired={isRequired} {...formControlProps}>
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        {!isLoaded ? (
          <Skeleton height={10} />
        ) : (
          <Box position="relative">
            <RichTextarea
              name={name}
              {...rest}
              ref={ref}
              className={isUnstyled ? `${styles.richTextarea} ${styles.unstyled}` : styles.richTextarea}
              style={{ width: "100%" }}>
              {renderer}
            </RichTextarea>
            <RichTextarea />
            <FormErrorMessage {...formErrorMessageProps}>{errors[name]?.message}</FormErrorMessage>
          </Box>
        )}
      </FormControl>
    );
  }
);
