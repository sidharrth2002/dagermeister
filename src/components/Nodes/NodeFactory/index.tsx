import { Box, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { Handle, Position } from "react-flow-renderer";
import operators from "../alloperators";
import { get } from "lodash";
import { NodePropsExtended } from "../../../types";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { splitCamelCase } from "../../../utils";
import CodeEditor from "@uiw/react-textarea-code-editor";

function Node({ data, type }: { data: NodePropsExtended; type: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const prepareInitialValues = () => {
    let values: any = {};
    Object.keys(get(operators, type, {})).map((op) => {
      let operatorVals = get(operators, type, {});
      values[op] = get(operatorVals, `${op}.defaultValue`, "");
    });
    return values;
  };

  const formik = useFormik({
    initialValues: prepareInitialValues(),
    onSubmit: (values) => {
      data = Object.assign({ params: values }, data);
      onClose();
    },
  });

  return (
    <Box
      onClick={onOpen}
      fontSize={10}
      padding={3}
      borderRadius={5}
      backgroundColor={"green.100"}
    >
      <Handle type="target" position={Position.Top} />
      <Text textAlign={"center"}>{splitCamelCase(type)}</Text>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configure your Operator</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="id">Operator ID</FormLabel>
                  <Input
                    id="id"
                    name="id"
                    type="text"
                    variant="filled"
                    onChange={formik.handleChange}
                    defaultValue={data.id || formik.values.id}
                  />
                </FormControl>
                {Object.keys(get(operators, type, {})).map((op) => {
                  const dataType = get(operators, `${type}.${op}.type`, "text");
                  if (dataType === "textarea") {
                    return (
                      <FormControl>
                        <FormLabel htmlFor={op}>{op}</FormLabel>
                        <Textarea
                          id={op}
                          name={op}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    );
                  } else if (dataType === "code") {
                    return (
                      <FormControl>
                        <FormLabel htmlFor={op}>{op}</FormLabel>
                        <Box width="100%" borderRadius={15}>
                          <CodeEditor
                            language={
                              op === "python_callable" ? "python" : "json"
                            }
                            value={formik.getFieldMeta(op).value}
                            onChange={(evn) => {
                              formik.setFieldValue(op, evn.target.value);
                              console.log(formik.getFieldMeta(op).value);
                            }}
                            name={op}
                            style={{
                              borderRadius: 10,
                              fontSize: 14,
                              fontFamily:
                                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                            }}
                          />
                        </Box>
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
                          value={formik.values[op]}
                        />
                      </FormControl>
                    );
                  }
                })}
                <Button type="submit" colorScheme="purple" width="full">
                  Save
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function NodeFactory(type: string) {
  // build a node based on type (send the type as a prop to Node while data is left empty)
  return (data: NodePropsExtended) => {
    return <Node data={data} type={type} />;
  };
}

export default NodeFactory;
