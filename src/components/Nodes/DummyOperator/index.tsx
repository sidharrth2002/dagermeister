import { Box, Text } from '@chakra-ui/react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import { useCallback } from 'react';

const handleStyle = { left: 10 };

function DummyOperatorNode({ data }: NodeProps) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box onClick={() => {
      data.newProperty = "1234"
    }} fontSize={10} padding={3}
    border="0.5px solid"
    borderRadius={5}
    >
    <Handle type="target" position={Position.Top} />
    <Text textAlign={"center"}>
        {data.id}
      </Text>

      <Text textAlign={"center"}>Dummy Operator</Text>
      <Text
        style={{ fontSize: 8 }}
        fontStyle="italic"
      >I am supposed to do nothing.</Text>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </Box>
  );
}

export default DummyOperatorNode;
