"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import chakraTheme from "@/lib/chakraTheme";

const theme = extendTheme(chakraTheme);

const ChakraConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraConfigProvider;
