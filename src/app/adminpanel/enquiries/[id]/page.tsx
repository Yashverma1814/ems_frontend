"use client";

import EnquiryEditForm from "@/components/adminpanel/EnquiryEditForm";
import { BaseUrl } from "@/service/apis";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  Button,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Grid,
  GridItem,
  Card,
  Stack,
  Input,
  Textarea,
  PopoverCloseTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";

type RemarkFormData = {
  message: string;
  addedBy: string;
};

const fetchEnquiryDetail = async (id: any) => {
  try {
    const response = await axios.get(`${BaseUrl}/enquiries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch enquiries", error);
  }
};

const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  // console.log([day,month, year].join("-"));
  return [day, month, year].join("-");
};

const EnquiryDetail = () => {
  const { onOpen, onClose } = useDisclosure()
  const { id } = useParams();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  const { data, isLoading, isError } = useQuery(
    ["enquiry", id],
    () => fetchEnquiryDetail(id),
    {
      enabled: !!id,
    }
  );
  const [message, setMessage] = useState("");
  const [adminName, setAdminName] = useState("");
  const mutation = useMutation(
    (remarkData: RemarkFormData) =>
      axios.put(`${BaseUrl}/enquiries/add-remark/${data._id}`, remarkData),
    {
      onSuccess: () => {
        alert("Remark added successfully.");
      },
      onError: (err) => {
        alert("Failed to add remark");
      },
    }
  );

  const onSubmit = (data: RemarkFormData) => {
    mutation.mutate(data);
    onClose();
  };

  if (isLoading)
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  if (isError)
    return (
      <Text color="red.500" textAlign="center">
        Error loading enquiry details.
      </Text>
    );

  return (
    <Box
      p={8}
      maxW="1400px"
      mx="auto"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
        <GridItem>
          <Box>
            <Heading as="h2" size="2xl" mb={6} textAlign="center">
              Enquiry Details
            </Heading>
            <VStack spaceX={4} align="flex-start">
              <Text>
                <strong>Student Name:</strong> {data.studentName}
              </Text>
              <Text>
                <strong>Grade:</strong> {data.grade}
              </Text>
              <Text>
                <strong>Guardian Contact:</strong>{" "}
                {data.contactDetails.contactMain}
              </Text>
              <Text>
                <strong>Enquiry Source:</strong> {data.enquirySource}
              </Text>
              <Text>
                <strong>Guardian Name:</strong> {data.guardianName}
              </Text>
              <Text>
                <strong>Other Contact Number:</strong>{" "}
                {data.contactDetails.contactOpt}
              </Text>
              <Text>
                <strong>Relation with Student:</strong> {data.relation}
              </Text>
              <Text>
                <strong>D.O.B.:</strong> {formatDate(data.dateOfBirth)}
              </Text>
              <Text>
                <strong>Email:</strong> {data.contactDetails.email}
              </Text>
              <Text>
                <strong>Address:</strong>{" "}
                {data.address.street +
                  " " +
                  data.address.city +
                  " " +
                  data.address.state +
                  " " +
                  data.address.country}
              </Text>
              <Text>
                <strong>Wanted Hostel Info?</strong>{" "}
                {data.wantHostelInfo ? "Yes" : "No"}
              </Text>
              <Text>
                <strong>Wanted Transportation Info?</strong>{" "}
                {data.wantTransportInfo ? "Yes" : "No"}
              </Text>
              <Text>
                <strong>Description:</strong> {data.description}
              </Text>
              <Text>
                <strong>Remarks:</strong>{" "}
              </Text>
              <PopoverRoot positioning={{ placement: "bottom-end" }}>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline">
                    Click me
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="600px">
                  <PopoverArrow />
                  <PopoverBody>
                    <EnquiryEditForm />
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            w="full"
            maxW="container.md"
            maxH="400px"
            overflowY="scroll"
            p="4"
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="md"
          >
            {data.remark.map((remark: any) => (
              <Card.Root width="600px" key={remark._id}>
                <Card.Body gap="2">
                  <Card.Title mt="2">{remark.addedBy}</Card.Title>
                  <Card.Description>{remark.message}</Card.Description>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                  <Text>added at: {formatDate(remark.date)}</Text>
                </Card.Footer>
              </Card.Root>
            ))}
          </Box>
          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">
                Add Remark
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Stack gap="4">
                  <Text>
                    Admin Name:
                    <Input
                      value={adminName}
                      placeholder="admin name"
                      onChange={(e) => setAdminName(e.target.value)}
                    />
                  </Text>
                  <Text>
                    Remark:
                    <Textarea
                      placeholder="Start typing your Remark..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Text>
                  <Button
                    onClick={() => {
                      onSubmit({ message, addedBy: adminName })
                      onClose();
                    }}
                  >
                    Add
                  </Button>
                  <PopoverCloseTrigger />
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default EnquiryDetail;
