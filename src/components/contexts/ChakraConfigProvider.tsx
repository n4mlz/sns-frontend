"use client";

import chakraTheme from "@/lib/chakraTheme";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme(chakraTheme);

const ChakraConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraConfigProvider;
