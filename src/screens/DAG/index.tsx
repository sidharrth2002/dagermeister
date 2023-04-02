import { Box, Button, HStack, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import ReactFlow, {
  Background,
  Connection,
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "react-flow-renderer";
import { useCallback, useEffect, useState } from "react";

import BashOperatorNode from "../../components/Nodes/BashOperator";
import Crontab from "../../components/Crontab";
import DummyOperatorNode from "../../components/Nodes/DummyOperator";
import EmailOperatorNode from "../../components/Nodes/EmailOperator";
import NodeSelector from "../../components/NodeSelector";
import PythonOperatorNode from "../../components/Nodes/PythonOperator";
import { getDag } from "../../api/dag";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "BashOperator",
    data: { id: "2", label: "Bash Operator" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "DummyOperator",
    data: { label: "Dummy Operator" },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    type: "PythonOperator",
    data: { label: "Python Operator" },
    position: { x: 400, y: 200 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  { id: "e1-3", source: "1", target: "3" },
];

let nodeId = 0;

const nodeTypes = {
  BashOperator: BashOperatorNode,
  Email: EmailOperatorNode,
  PythonOperator: PythonOperatorNode,
  DummyOperator: DummyOperatorNode,
};

const DAG = () => {
  const [dagData, setDagData] = useState({});
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
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
    console.log("Creating node");
    console.log(type);
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
    console.log(reactFlowInstance.getNodes());
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
    console.log(nodes);
    // show state in modal
  }, [nodes, edges]);

  const defaultEdgeOptions = { animated: true };

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
        <NodeSelector
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          createNode={createNode}
        />

        <Drawer onClose={draweronClose} isOpen={drawerisOpen} size={"lg"}>
          <DrawerOverlay />
          <DrawerContent zIndex={100000}>
            <DrawerCloseButton />
            <DrawerHeader>{`DAG Engineering ⚙️`}</DrawerHeader>
            <DrawerBody>
              <Crontab setDagData={setDagData} />
              <Box backgroundColor={"gray.100"} p={4} borderRadius={10}>
                <pre>
                  {JSON.stringify(reactFlowInstance.toObject(), null, 2)}
                </pre>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
  );
};

export default DAG;
