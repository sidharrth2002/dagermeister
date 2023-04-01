import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { useCallback, useRef } from "react";

import CodeEditor from "@uiw/react-textarea-code-editor";
import args from "../../../extra/args";
import { useFormik } from "formik";

const handleStyle = { left: 10 };

function PythonOperatorNode({ data }: NodeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  const formik = useFormik({
    initialValues: data.params || args.PythonOperator,
    onSubmit: (values) => {
      onClose();
      // set properties on data
      data.params = values;
    },
  });

  return (
    <Box
      onClick={onOpen}
      fontSize={10}
      padding={3}
      border="0.5px solid"
      borderRadius={5}
    >
      <Handle type="target" position={Position.Top} />
      <Text textAlign={"center"}>Python Operator</Text>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
      <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Python Operator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="flex-start">
              {Object.keys(args.PythonOperator).map((key) => {
                if (key === "python_callable") {
                  return (
                    <Box key={key} width="100%">
                      <Text mb={3}>{key}</Text>
                      <CodeEditor
                        language="python"
                        value={formik.getFieldMeta(key).value}
                        onChange={formik.handleChange}
                        name={key}
                        style={{ height: 200, width: '100%', border: '1px solid #ccc' }}
                      />
                    </Box>
                  );
                }
                return (
                  <Box key={key}>
                    <Text>{key}</Text>
                    <Input
                      value={formik.values[key]}
                      onChange={formik.handleChange}
                      name={key}
                    />
                  </Box>
                );
              })}
            </VStack>
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
