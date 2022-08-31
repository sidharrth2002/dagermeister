import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function PythonOperatorNode({ data }: NodeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box onClick={onOpen} backgroundColor="white" fontSize={10} padding={3}>
    <Handle type="target" position={Position.Top} />
      <Text textAlign={"center"}>Python Operator</Text>
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>

            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PythonOperatorNode;
