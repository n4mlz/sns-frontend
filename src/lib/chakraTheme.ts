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
      100: "#edeff7",
      200: "#eaeaef",
      300: "#dacae3",
      400: "#aca0c2",
      500: "#7d7290",
      600: "#514d64",
      700: "#302d40",
      800: "#1e1b29",
      900: "#171428",
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
