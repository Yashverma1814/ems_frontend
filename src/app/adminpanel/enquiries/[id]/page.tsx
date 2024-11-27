"use client";
import { useEffect, useRef, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { RiArrowRightLine } from "react-icons/ri";
import { SiRemark } from "react-icons/si";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { Toaster, toaster } from "@/components/ui/toaster";
import "react-toastify/dist/ReactToastify.css";
import EnquiryEditForm from "@/components/adminpanel/EnquiryEditForm";
import { BaseUrl } from "@/service/apis";
import { AddRemark } from "@/components/adminpanel/AddRemark";
import Navbar from "@/components/adminpanel/Navbar";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  Button,
  useDisclosure,
  Tabs,
  Stack,
  SimpleGrid,
  Separator,
} from "@chakra-ui/react";
import { fetchEnquiryDetail } from "@/service/queryFn";

type RemarkFormData = {
  message: string;
  addedBy: any;
};

// const fetchEnquiryDetail = async (id: any) => {
//   try {
//     const response = await axios.get(`${BaseUrl}/enquiries/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch enquiries", error);
//   }
// };

export const EnquiryDetail = () => {
  const { onClose } = useDisclosure();
  const { id } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const mutation = useMutation(
    (remarkData: RemarkFormData) =>
      axios.put(`${BaseUrl}/enquiries/add-remark/${data._id}`, remarkData),
    {
      onSuccess: () => {
        toaster.create({
          title: "Remark added successfully.",
          type: "success",
        });
        queryClient.invalidateQueries(["enquiry", id]);
      },
      onError: (err) => {
        alert("Failed to add remark");
        toaster.create({
          title: "Failed to add remark",
          type: "error",
        });
      },
    }
  );

  const deleteMutation = useMutation(
    () => axios.delete(`${BaseUrl}/enquiries/${id}`),
    {
      onSuccess: () => {
        toaster.create({
          title: "Enquiry deleted successfully.",
          type: "success",
        });
      },
      onError: (err) => {
        toaster.create({
          title: "Failed to delete enquiry.",
          type: "error",
        });
      },
    }
  );

  const onSubmit = (data: RemarkFormData) => {
    mutation.mutate(data);
    onClose();
  };

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (isError)
    return (
      <Text color="red.500" textAlign="center">
        Error loading enquiry details.
      </Text>
    );

  if (!token) {
    return (
      <center>
        You are Not Logged In{" "}
        <Link href={`/adminpanel/login`}>
          {" "}
          <Button colorPalette="teal" variant="outline">
            Click Here
            <RiArrowRightLine />
          </Button>
        </Link>{" "}
        to Login
      </center>
    );
  }

  const addRemarkObj = {
    data,
    message,
    setMessage,
    username,
    onSubmit,
  };

  return (
    <Box>
      <Navbar />
      <Box p={8} maxW="1200px" mx="auto">
        <Toaster />
        <Tabs.Root defaultValue="details" variant="plain">
          <Tabs.List bg="bg.muted" rounded="l3" p="1">
            <Tabs.Trigger value="details">
              <TbListDetails />
              Details
            </Tabs.Trigger>
            <Tabs.Trigger value="remarks">
              <SiRemark />
              Remarks
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="details">
            <Box
              p={6}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              maxW="1200px"
              mx="auto"
            >
              <Heading
                as="h2"
                size="xl"
                mb={6}
                textAlign="center"
                color="teal.600"
              >
                Enquiry Details
              </Heading>
              <Separator mb={4} />
              <SimpleGrid columns={{ base: 1, md: 2 }} spaceX={6}>
                <Stack>
                  <Text fontWeight="bold" color="gray.600" marginLeft="1.5rem">
                    Student Name:
                  </Text>
                  <Text marginLeft="1.5rem" marginBottom="0.5rem">
                    {data.studentName}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Guardian Name:
                  </Text>
                  <Text marginBottom="0.5rem">{data.guardianName}</Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Relation with Student:
                  </Text>
                  <Text marginBottom="0.5rem">{data.relation}</Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Grade:
                  </Text>
                  <Text marginBottom="0.5rem">{data.grade}</Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    D.O.B.:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {moment(data.dateOfBirth).format("DD-MM-YYYY")}
                  </Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Current School:
                  </Text>
                  <Text marginBottom="0.5rem">{data.currentSchool}</Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Guardian Contact:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {data.contactDetails.contactMain}
                  </Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Other Contact Number:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {data.contactDetails.contactOpt}
                  </Text>
                </Stack>


                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Email:
                  </Text>
                  <Text marginBottom="0.5rem">{data.contactDetails.email}</Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Social Media:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {data.contactDetails.socialMediaHandles.twitter}
                  </Text>
                </Stack>

                
                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Address:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {data.address.street}, {data.address.city},{" "}
                    {data.address.state}, {data.address.country}
                  </Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Enquiry Source:
                  </Text>
                  <Text marginBottom="0.5rem">{data.enquirySource}</Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Description:
                  </Text>
                  <Text marginBottom="0.5rem">{data.description?data.description:"Not Provided"}</Text>
                </Stack>

                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Wanted Hostel Info?:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {data.wantHostelInfo ? "Yes" : "No"}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Wanted Transportation Info?:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {data.wantTransportInfo ? "Yes" : "No"}
                  </Text>
                </Stack>
                
                <Stack>
                  <Text fontWeight="bold" color="gray.600">
                    Asked At:
                  </Text>
                  <Text marginBottom="0.5rem">
                    {moment(data.createdAt).format(
                      "dddd, MMMM Do YYYY, HH:mm:SS"
                    )}
                  </Text>
                </Stack>
              </SimpleGrid>
              <Separator my={6} />
              <EnquiryEditForm />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="remarks">
            <AddRemark addRemarkObj={addRemarkObj} />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default EnquiryDetail;
