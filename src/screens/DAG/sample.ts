import { Edge, MarkerType, Node } from "react-flow-renderer";

export const initialNodes: Node[] = [
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
    id: "4",
    type: "PythonOperator",
    data: { label: "Python Operator" },
    position: { x: 400, y: 200 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
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
  },
  { id: "e1-3", source: "1", target: "3" },
];
