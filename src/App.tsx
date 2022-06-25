import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import DAG from "./screens/DAG"
import { ReactFlowProvider } from "react-flow-renderer"
import Home from "./screens/Home"

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
)
