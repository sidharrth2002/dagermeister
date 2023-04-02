import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

import * as React from "react";

import { Box, ChakraProvider } from "@chakra-ui/react";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import DAG from "./screens/DAG";
import Home from "./screens/Home";
import { ReactFlowProvider } from "react-flow-renderer";
import theme from "./theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box>
      <ColorModeSwitcher />
      <Home />
      <ReactFlowProvider>
        <DAG />
      </ReactFlowProvider>
    </Box>
  </ChakraProvider>
);
