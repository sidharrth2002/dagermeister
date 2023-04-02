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
  useDisclosure,
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

  const formik = useFormik({
    initialValues: data.params || args.PythonOperator,
    onSubmit: (values) => {
      onClose();
      console.log("printing values");
      console.log(values);
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
      <Text textAlign={"center"}>
        <Text as="span" fontSize="0.8em" color="green">
          {data.id}
        </Text>
      </Text>
      <Text textAlign={"center"}>Python Operator 🐍</Text>
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
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <VStack spacing={4} align="flex-start">
                {Object.keys(args.PythonOperator).map((key) => {
                  if (key === "python_callable" || key === "op_kwargs") {
                    return (
                      <Box key={key} width="100%">
                        <Text mb={3}>{key}</Text>
                        <CodeEditor
                          language={
                            key === "python_callable" ? "python" : "json"
                          }
                          value={formik.getFieldMeta(key).value}
                          onChange={(evn) => {
                            formik.setFieldValue(key, evn.target.value);
                          }}
                          name={key}
                          style={{
                            fontSize: 14,
                            fontFamily:
                              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                          }}
                        />
                      </Box>
                    );
                  }
                  return (
                    <Box key={key}>
                      <Text>{key}</Text>
                      <Input
                        value={formik.getFieldMeta(key).value}
                        onChange={formik.handleChange}
                        name={key}
                      />
                    </Box>
                  );
                })}
              </VStack>
            </ModalBody>
            <ModalFooter display={"flex"} justifyContent={"space-between"}>
              <Button type="submit" onClick={onClose}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PythonOperatorNode;
