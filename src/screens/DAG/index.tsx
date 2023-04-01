import { Box, Button, useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
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

import BashOperatorNode from "../../components/Nodes/BashOperator";
import DummyOperatorNode from "../../components/Nodes/DummyOperator";
import EmailOperatorNode from "../../components/Nodes/EmailOperator";
import NodeSelector from "../../components/NodeSelector";
import PythonOperatorNode from "../../components/Nodes/PythonOperator";

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
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: drawerisOpen, onOpen: draweronOpen, onClose: draweronClose } = useDisclosure()


  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const createNode = (id: string, type: string) => {
    console.log("Creating node");
    console.log(type);
    const newNode = {
      key: id,
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
        id,
      },
      type: type,
    };
    reactFlowInstance.addNodes(newNode);
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

  const getState = useCallback(() => {
    draweronOpen();
    console.log(reactFlowInstance.toObject());
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
      <Button
        position={"absolute"}
        zIndex={100000}
        top={20}
        left={20}
        onClick={() => onOpen()}
      >
        Add Node
      </Button>
      <Button
        position={"absolute"}
        zIndex={100000}
        top={40}
        left={20}
        onClick={getState}
      >
        Get State
      </Button>
      <NodeSelector
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        createNode={createNode}
      />

      <Drawer onClose={draweronClose} isOpen={drawerisOpen} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`DAG Structure ⚙️`}</DrawerHeader>
          <DrawerBody>
            <Box>
              <pre>{JSON.stringify(reactFlowInstance.toObject(), null, 2)}</pre>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DAG;
