import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Illustration } from "../../components/Illustration";

export default function Home() {
  return (
    <Container maxW={"5xl"} minH="100vh">
      <Stack
        spacing={{ base: 8, md: 7 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Build{" "}
          <Text as={"span"} color={"orange.400"}>
            powerful{" "}
          </Text>
          and{" "}
          <Text as={"span"} color={"green.400"}>
            scalable{" "}
          </Text>
          DAGs
        </Heading>
        <Text color={"black.500"}
        fontSize="lg"
        maxW={"xl"}>
          If you've ever struggled with visualising DAGs or if you've always
          reached for a pen and paper, this is the tool for you. Daggermeister
          allows you to intuitively build Airflow DAGs through a drag-and-drop
          interface.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Let's build!
          </Button>
        </Stack>
        <Flex w={"full"}>
          <Illustration
            height={{ sm: "20rem", lg: "20rem" }}
            mt={{ base: 8, sm: 8 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
}
