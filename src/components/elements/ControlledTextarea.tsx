"use client";

import { useState } from "react";
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
  Textarea,
  TextareaProps,
  Box,
} from "@chakra-ui/react";
import { RichTextarea, createRegexRenderer } from "rich-textarea";

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
} & Omit<TextareaProps, "isRequired">;

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
      ...rest
    }: Omit<ControlledTextareaProps, "ref">,
    ref
  ) => {
    const [blue400] = useToken("colors", ["blue.400"]);
    const [fontMd] = useToken("fontSizes", ["md"]);
    const [space2, space4] = useToken("space", ["2", "4"]);
    const [radiiMd] = useToken("radii", ["md"]);
    const renderer = createRegexRenderer([[/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, { color: blue400 }]]);

    const [inputValue, setInputValue] = useState<string>("");

    return (
      <FormControl isInvalid={Boolean(errors[name])} isRequired={isRequired} {...formControlProps}>
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        {!isLoaded ? (
          <Skeleton height={10} />
        ) : (
          <Box position="relative">
            <RichTextarea
              defaultValue={rest.defaultValue}
              value={inputValue ? inputValue : rest.defaultValue}
              style={{
                position: "relative",
                width: "100%",
                height: "88.5px",
                fontSize: fontMd,
                WebkitPaddingStart: space4,
                paddingInlineStart: space4,
                WebkitPaddingEnd: space4,
                paddingInlineEnd: space4,
                borderRadius: radiiMd,
                minWidth: "0px",
                outline: "none",
                outlineOffset: "2px",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                paddingTop: space2,
                paddingRight: space4,
                paddingBottom: space2,
                paddingLeft: space4,
                border: "none",
                lineHeight: "1.15",
                margin: "0",
                resize: "none",
                top: "0",
                left: "0",
              }}>
              {renderer}
            </RichTextarea>
            <Textarea
              name={name}
              {...rest}
              ref={ref}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="88.5px"
              resize="none"
              color="transparent"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <FormErrorMessage {...formErrorMessageProps}>{errors[name]?.message}</FormErrorMessage>
          </Box>
        )}
      </FormControl>
    );
  }
);
