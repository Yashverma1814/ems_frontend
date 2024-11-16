"use client";
import { IoIosArrowBack } from "react-icons/io";

import EnquiryEditForm from "@/components/adminpanel/EnquiryEditForm";
import { BaseUrl, BaseUrlfe } from "@/service/apis";
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
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { RiArrowRightLine } from "react-icons/ri";

type RemarkFormData = {
  message: string;
  addedBy: any;
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
  const { onOpen, onClose } = useDisclosure();
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

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [message, setMessage] = useState("");
  // setAdminName(username)

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

  const deleteMutation = useMutation(
    () => axios.delete(`${BaseUrl}/enquiries/${id}`),
    {
      onSuccess: () => {
        alert("Enquiry deleted successfully.");
      },
      onError: (err) => {
        alert("Failed to delete enquiry.");
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


    if (!token) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          You are Not Logged In{" "}
          <Link href={`${BaseUrlfe}/adminpanel/login`}>
            {" "}
            <Button colorPalette="teal" variant="outline">
              Click Here
              <RiArrowRightLine />
            </Button>
          </Link>{" "}
          to Login
        </div>
      );
    }

  return (
    <Box
      p={8}
      maxW="1400px"
      mx="auto"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
        <IoIosArrowBack
          style={{
            cursor: "pointer",
            fontSize: "30px",
          }}
        />
      </Link>
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
                  <Button size="sm" colorPalette={"green"} variant="subtle">
                    Update
                  </Button>
                </PopoverTrigger>
                <PopoverContent width="600px">
                  <PopoverArrow />
                  <PopoverBody>
                    <EnquiryEditForm />
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
              <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
                <Button
                  colorPalette={"red"}
                  variant="subtle"
                  onClick={() => deleteMutation.mutate()}
                >
                  Delete
                </Button>
              </Link>
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
              <Button size="sm" colorPalette={"pink"} variant="subtle">
                Add Remark
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Stack gap="4">
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
                      onSubmit({ message, addedBy: username });
                      onClose();
                    }}
                    colorPalette={"green"}
                    variant="subtle"
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
