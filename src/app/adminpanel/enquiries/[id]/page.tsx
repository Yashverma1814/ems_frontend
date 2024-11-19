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
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { RiArrowRightLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toaster } from "@/components/ui/toaster"

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
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const [message, setMessage] = useState("");
  const secondButtonRef = useRef<HTMLButtonElement>(null);


  const mutation = useMutation(
    (remarkData: RemarkFormData) =>
      axios.put(`${BaseUrl}/enquiries/add-remark/${data._id}`, remarkData),
    {
      onSuccess: () => {
        toaster.create({
          title: "Remark added successfully.",
          type:"success"
        })
      },
      onError: (err) => {
        alert("Failed to add remark");
        toaster.create({
          title: "Failed to add remark",
          type:"error"
        })
      },
    }
  );

  const deleteMutation = useMutation(
    () => axios.delete(`${BaseUrl}/enquiries/${id}`),
    {
      onSuccess: () => {
        toaster.create({
          title: "Enquiry deleted successfully.",
          type:"success"
        })
      },
      onError: (err) => {
        toaster.create({
          title: "Failed to delete enquiry.",
          type:"error"
        })
      },
    }
  );

  const onSubmit = (data: RemarkFormData) => {
    mutation.mutate(data);
    onClose();
  };

  if (isLoading){
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );}
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
    <Box p={8} maxW="1200px" mx="auto">
      <Toaster />
      <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
        <IoIosArrowBack
          style={{
            cursor: "pointer",
            fontSize: "30px",
          }}
        />
      </Link>
      <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}>
        <GridItem>
          <Box
            p={6}
            borderWidth={1}
            borderRadius="lg"
            bg="gray.50"
            boxShadow="md"
          >
            <Heading as="h2" size="2xl" mb={6} textAlign="center">
              Enquiry Details
            </Heading>
            <VStack spaceX={4} align="flex-start">
              <Text></Text>
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

              <EnquiryEditForm />
              {/* <EnquiryUpdateDrawer /> */}

              <Button
                colorPalette={"red"}
                variant="subtle"
                onClick={() => deleteMutation.mutate()}
              >
                <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>Delete</Link>
              </Button>
            </VStack>
          </Box>
        </GridItem>
        {/* <GridItem>
          <Box
            p={6}
            borderWidth={1}
            borderRadius="lg"
            height="500px"
            bg="gray.50"
            boxShadow="md"
            overflowY="auto"
          >
            <Text>
              <strong>Remarks:</strong>{" "}
            </Text>
            {data.remark.map((remark: any) => (
              <Box
                key={remark._id}
                p={4}
                mb={4}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                  <Heading as="h4" size="sm" color="gray.700">
                    {remark.addedBy}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {formatDate(remark.date)}
                  </Text>
                </Flex>
                <Text fontSize="md" color="gray.800">
                  {remark.message}
                </Text>
              </Box>
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
                  <PopoverCloseTrigger
                    colorPalette="green"
                    onClick={() => {
                      onSubmit({ message, addedBy: username });
                      setMessage("")
                      onClose();
                    }}
                  >
                    <Box
                      as="div"
                      display="inline-block"
                      padding="8px 16px"
                      borderRadius="md"
                      marginTop="1rem"
                      backgroundColor="white"
                      color="green.700"
                      boxShadow="sm"
                      borderWidth="1px"
                      borderColor="green.200"
                      _hover={{
                        backgroundColor: "green.50",
                        cursor: "pointer",
                      }}
                      _active={{
                        backgroundColor: "green.100",
                      }}
                      textAlign="center"
                    >
                      Add
                    </Box>
                  </PopoverCloseTrigger>
                  <PopoverCloseTrigger />
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </GridItem> */}
      </Grid>
    </Box>
  );
};

export default EnquiryDetail;
