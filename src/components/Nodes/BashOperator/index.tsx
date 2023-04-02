import {
  Box,
  Button,
  FormControl,
  FormLabel,
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

function BashOperatorNode({ data }: NodeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const formik = useFormik({
    initialValues: data.params || args.BashOperator,
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
      <Text textAlign={"center"}>
        <Text as="span" fontSize="0.8em" color="green">
          {data.id}
        </Text>
      </Text>
      <Text textAlign={"center"}>Bash Operator</Text>
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <VStack spacing={4} align="flex-start">
                {Object.keys(args.BashOperator).map((op) => {
                  if (op === "bash_command") {
                    return (
                      <FormControl>
                        <FormLabel htmlFor={op}>{op}</FormLabel>
                        <CodeEditor
                          value={formik.getFieldMeta(op).value}
                          language="bash"
                          placeholder="Please enter bash code."
                          onChange={(evn) => {
                            formik.setFieldValue(op, evn.target.value);
                          }}
                          padding={15}
                          style={{
                            fontSize: 12,
                            fontFamily:
                              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                          }}
                        />
                      </FormControl>
                    );
                  } else {
                    return (
                      <FormControl>
                        <FormLabel htmlFor={op}>{op}</FormLabel>
                        <Input
                          id={op}
                          name={op}
                          type="text"
                          variant="filled"
                          onChange={formik.handleChange}
                          value={formik.getFieldMeta(op).value}
                        />
                      </FormControl>
                    );
                  }
                })}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Save</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BashOperatorNode;
