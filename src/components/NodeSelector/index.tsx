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
import React, { useEffect, useState } from "react";

import Select from "react-select";
import operatorOptions from "../Nodes/alloperators";

export interface ModalProps {
  isOpen: boolean;
  defaultIsOpen?: boolean;
  onClose(): void;
  onOpen(): void;
  id?: string;
  createNode(id: string, type: string): void;
  existingIds: string[];
}

function NodeSelector({
  isOpen,
  onOpen,
  onClose,
  createNode,
  existingIds,
}: ModalProps) {
  useEffect(() => {
    onOpen();
  }, []);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [operators, setOperators] = useState(Object.keys(operatorOptions));

  const formik = useFormik({
    initialValues: {
      id: "",
      operator: "",
    },
    onSubmit: (values) => {
      createNode(values.id, values.operator);
      onClose();
    },
  });

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an Operator</ModalHeader>
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
                    value={formik.values.id}
                    required
                    // validate by checking if id is already in use
                    isInvalid={existingIds.includes(formik.values.id)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="operator">Operator</FormLabel>
                  <Select
                    options={operators.map((operator) => ({
                      label: operator,
                      value: operator,
                    }))}
                    onChange={(value) => {
                      console.log(value);
                      formik.setFieldValue("operator", value?.value);
                    }}
                  />
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full">
                  Create
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NodeSelector;
