import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Field,
  Form,
  Formik,
  FieldProps,
  FormikFormProps,
  FieldInputProps,
  FormikProps,
  useFormik,
} from "formik";

export interface ModalProps {
  isOpen: boolean;
  defaultIsOpen?: boolean;
  onClose(): void;
  onOpen(): void;
  id?: string;
}

function NodeSelector({ isOpen, onOpen, onClose }: ModalProps) {
  useEffect(() => {
    onOpen();
  }, []);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [operators, setOperators] = useState([
    "BashOperator",
    "PythonOperator",
    "KubernetesPodOperator",
    "BQToBQOperator",
  ]);

  const formik = useFormik({
    initialValues: {
      id: "",
      operator: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
                    value={formik.values.id}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="operator">Operator</FormLabel>
                  <Select
                    id="operator"
                    name="operator"
                    value={formik.values.operator}
                    onChange={formik.handleChange}
                  >
                    {operators.map((operator) => (
                      <option key={operator} value={operator}>
                        {operator}
                      </option>
                    ))}
                  </Select>
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
