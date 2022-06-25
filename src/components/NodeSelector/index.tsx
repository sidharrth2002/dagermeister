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
            {/* <Formik
              initialValues={{ name: "Sasuke" }}
              onSubmit={(values, actions) => {
                console.log(values);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="id">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ id: string }>;
                    }) => (
                      <FormControl
                        isInvalid={
                          form.errors.id && form.touched.id ? true : false
                        }
                      >
                        <FormLabel htmlFor="name">DAG ID</FormLabel>
                        <Input {...field} id="name" placeholder="name" />
                        <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="operator">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ operator: string }>;
                    }) => (
                      <FormControl
                        isInvalid={
                          form.errors.operator && form.touched.operator
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="operator">Operator</FormLabel>
                        <Select>
                          {operators.map((operator) => (
                            <option key={operator} value={operator}>
                              {operator}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.operator}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik> */}
            {/* <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl> */}
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NodeSelector;
