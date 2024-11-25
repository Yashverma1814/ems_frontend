"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
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
import { BaseUrl, BaseUrlfe } from "@/service/apis";
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
} from "@chakra-ui/react";

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
        <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
          <IoIosArrowBack
            style={{
              cursor: "pointer",
              fontSize: "30px",
            }}
          />
        </Link>
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
            <Box>
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
                  <strong>D.O.B.:</strong>{" "}
                  {moment(data.dateOfBirth).format("DD-MM-YYYY")}
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
                  <strong>AskedAt: </strong>
                  {moment(data.createdAt).format(
                    "dddd, MMMM Do YYYY, HH:mm:SS"
                  )}
                </Text>

                <EnquiryEditForm />
              </VStack>
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
