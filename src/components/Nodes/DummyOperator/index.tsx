import { Box, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function DummyOperatorNode({ data }: NodeProps) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box onClick={() => {
      data.newProperty = "1234"
    }} backgroundColor="white" fontSize={10} padding={3}>
    <Handle type="target" position={Position.Top} />
      <Text textAlign={"center"}>Dummy Operator</Text>
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </Box>
  );
}

export default DummyOperatorNode;
