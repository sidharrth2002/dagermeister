import {
  Box,
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
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Field,
  FieldInputProps,
  FieldProps,
  Form,
  Formik,
  FormikFormProps,
  FormikProps,
  useFormik,
} from "formik";
import React, { useEffect, useState } from "react";

import Select from "react-select";

export interface ModalProps {
  isOpen: boolean;
  defaultIsOpen?: boolean;
  onClose(): void;
  onOpen(): void;
  id?: string;
  createNode(id: string, type: string): void;
}
const AVATARS = [
  { name: "Kat", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Kevin", image: "https://randomuser.me/api/portraits/men/86.jpg" },
  { name: "Andy", image: "https://randomuser.me/api/portraits/men/29.jpg" },
  { name: "Jess", image: "https://randomuser.me/api/portraits/women/95.jpg" },
];

function NodeSelector({ isOpen, onOpen, onClose, createNode }: ModalProps) {
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
      console.log('printing values')
      console.log(values);
      console.log(values.id);
      console.log(values.operator);
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
                    options={operators.map((operator) => ({
                      label: operator,
                      value: operator,
                    }))}
                    onChange={(value) => {
                      console.log(value);
                      formik.setFieldValue("operator", value?.value);
                    }}
                  />


                  {/* <Select
                    tagVariant="solid"
                    options={operators.map((operator) => ({
                      label: operator,
                      value: operator,
                    }))}
                    onChange={(value) => {
                      formik.setFieldValue("operator", value?.value);
                    }}
                  /> */}
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
