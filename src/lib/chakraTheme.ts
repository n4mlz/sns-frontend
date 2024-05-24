import { mode } from "@chakra-ui/theme-tools";
import { type StyleFunctionProps } from "@chakra-ui/styled-system";

export default {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: { 100: "#fed7e2", 200: "#fbb6ce", 300: "#f687b3", 400: "#ed64a6" },
    gray: {
      50: "#f7fafc",
      100: "#eef2f6",
      200: "#e4e8ee",
      300: "#cfd5dc",
      400: "#a5aebb",
      500: "#778090",
      600: "#525561",
      700: "#343740",
      800: "#202026",
      900: "#191921",
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("gray.700", "whiteAlpha.900")(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
        _disabled: {
          bg: "primary.200",
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: "primary.300",
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: "primary.300",
      },
    },
  },
};
