import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// function to check if cron expression is valid
const isValidCron = (cron: string) => {
  const cronRegex = /^(\*|[0-5]?\d)(\s(\*|[0-5]?\d)){4}$/;
  return cronRegex.test(cron);
};

// get text explaining cron expression
const getCronText = (cron: string) => {
  const cronRegex = /^(\*|[0-5]?\d)(\s(\*|[0-5]?\d)){4}$/;
  if (!cronRegex.test(cron)) {
    return "Invalid cron expression";
  }
  const [minute, hour, dayOfMonth, month, dayOfWeek] = cron.split(" ");
  const cronText = `At ${hour}:${minute} on ${dayOfMonth} of ${month} on ${dayOfWeek}`;
  return cronText;
};

function Crontab({ setDagData }: { setDagData: any }) {
  const [minute, setMinute] = useState("");
  const [hour, setHour] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [month, setMonth] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [cron, setCron] = useState("");
  const [cronText, setCronText] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (cron) {
      setCronText(getCronText(cron));
      setDagData((f: any) => {
        return {
          minute,
          hour,
          dayOfMonth,
          month,
          dayOfWeek,
          cron,
          description,
        };
      });
    }
  }, [minute, hour, dayOfMonth, month, dayOfWeek, cron, description]);

  return (
    <Box mb={5}>
      <Text mb={3}>Crontab</Text>
      <HStack spacing={4} mb={5}>
        <Input
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          placeholder="Minute"
        />
        <Input
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          placeholder="Hour"
        />
        <Input
          value={dayOfMonth}
          onChange={(e) => setDayOfMonth(e.target.value)}
          placeholder="DOM"
        />
        <Input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month"
        />
        <Input
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
          placeholder="DOW"
        />
      </HStack>
      {cronText && (
        <Alert status="success" mb={5}>
          <AlertIcon /> {cronText}
        </Alert>
      )}
      <HStack mb={5}>
        <Button
          colorScheme={"teal"}
          onClick={() => {
            if (
              isValidCron(
                `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
              )
            ) {
              console.log("Valid cron expression");
              setCron(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`);
            } else {
              console.log("Invalid cron expression");
              toast({
                title: "Invalid cron expression",
                description: "Please check your cron expression",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        >
          Check
        </Button>
        {cron && <Text>✅ {cron}</Text>}
      </HStack>
      <Text mb={4}>Description</Text>
      <Textarea
        placeholder="What does your DAG do?"
        onChange={(e) => setDescription(e.target.value)}
      />
    </Box>
  );
}

export default Crontab;
