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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCallback, useRef } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import args from "../../../extra/args";

const handleStyle = { left: 10 };

function BashOperatorNode({ data }: NodeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  const formik = useFormik({
    initialValues: data.params || args.BashOperator,
    onSubmit: (values) => {
      onClose();
      // set properties on data
      data.params = values;
    },
  });

  return (
    <Box onClick={onOpen} backgroundColor="white" fontSize={10} padding={3}>
      <Handle type="target" position={Position.Top} />
      <Text textAlign={"center"} fontStyle="italic">
        # {data.id}
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
