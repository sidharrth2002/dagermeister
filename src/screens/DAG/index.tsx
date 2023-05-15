import {
  Box,
  Button,
  HStack,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import ReactFlow, {
  Background,
  Connection,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "react-flow-renderer";
import { useCallback, useEffect, useState } from "react";

import Crontab from "../../components/Crontab";
import NodeSelector from "../../components/NodeSelector";
import NodeFactory from "../../components/Nodes/NodeFactory";
import { getDag } from "../../api/dag";
import operators from "../../components/Nodes/alloperators";
import { NodeTypes } from "../../types";
import { initialEdges, initialNodes } from "./sample";

const nodeTypes: NodeTypes = {};
for (const [key, value] of Object.entries(operators)) {
  nodeTypes[key] = NodeFactory(key);
}

const DAG = () => {
  const [dagData, setDagData] = useState({});
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection: Connection) => setEdges((e) => addEdge(connection, e)),
    [setEdges]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: drawerisOpen,
    onOpen: draweronOpen,
    onClose: draweronClose,
  } = useDisclosure();
  const [downloadURL, setDownloadURL] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const createNode = (id: string, type: string) => {
    const newNode = {
      key: id,
      id,
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      data: {
        label: `Node ${id}`,
        id,
      },
      type: type,
    };
    nodes.push(newNode);
    // reactFlowInstance.addNodes(newNode);
  };

  useEffect(() => {
    // restore state from local storage
    onClose();
  }, []);

  // save state to local storage on change
  useEffect(() => {
    localStorage.setItem(
      "reactflow",
      JSON.stringify(reactFlowInstance.toObject())
    );
  }, [reactFlowInstance]);

  useEffect(() => {
    if (downloadURL) {
      const link = document.createElement("a");
      link.href = downloadURL;
      link.setAttribute("download", "dag.py");
      document.body.appendChild(link);
      link.click();
    }
  }, [downloadURL]);

  const getState = useCallback(() => {
    draweronOpen();

    // show state in modal
  }, [nodes, edges]);

  const defaultEdgeOptions = {
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      color: "green",
    },
    style: {
      strokeWidth: 1.5,
      stroke: "green",
    },
  };

  // add keybindings
  // when cmd + n is pressed, open model through onOpen
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        onOpen();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onOpen]);

  return (
    <Box height={"100vh"} width={"1000"} position={"relative"}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
      <HStack
        width={"90%"}
        position={"absolute"}
        zIndex={1000}
        top={10}
        left={10}
        justifyContent={"space-between"}
      >
        <HStack spacing={10}>
          <Button onClick={() => onOpen()}>Add Node</Button>
          <Button
            // make button download file
            zIndex={100000}
            onClick={async () => {
              setLoading(true);
              toast({
                title: "The engines are running",
                description: "Your DAG is being generated",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
              const url = await getDag(reactFlowInstance.toObject());

              toast({
                title: "Formatting your file",
                description: "Your DAG is being formatted",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
              setDownloadURL(url);
              toast({
                title: "Your file is ready",
                description: "Your DAG is being formatted",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
            }}
          >
            {downloadURL ? "⬇️ Download" : loading ? <Spinner /> : "Download"}
          </Button>
        </HStack>
        <Button onClick={getState}>Settings ⚙️</Button>
      </HStack>
      <HStack position={"absolute"} zIndex={1000} bottom={10} left={10}>
        <HStack>
          <Text
            fontSize={20}
            border={"0.4px solid"}
            borderColor={"green.300"}
            padding={"0.4rem"}
            borderRadius={10}
            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.15)"}
          >
            ⌘
          </Text>
          <Text fontSize={20}>+ K to become a power user</Text>
        </HStack>
      </HStack>
      <NodeSelector
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        createNode={createNode}
        existingIds={nodes.map((node) => node.id)}
      />

      <Drawer onClose={draweronClose} isOpen={drawerisOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent zIndex={100000}>
          <DrawerCloseButton />
          <DrawerHeader>{`DAG Engineering ⚙️`}</DrawerHeader>
          <DrawerBody>
            <Crontab setDagData={setDagData} />
            <Box backgroundColor={"gray.100"} p={4} borderRadius={10}>
              <pre>{JSON.stringify(reactFlowInstance.toObject(), null, 2)}</pre>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DAG;
