import { mode } from "@chakra-ui/theme-tools";
import { createMultiStyleConfigHelpers, type StyleFunctionProps } from "@chakra-ui/styled-system";

export default {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    primary: { 100: "#fed7e2", 200: "#fbb6ce", 300: "#f687b3", 400: "#ed64a6" },
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
  },
};
