"use client";

import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Card,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Link from "next/link";
import { BaseUrlfe } from "@/service/apis";
import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

const fetchTotalEnquiries = async (): Promise<number> => {
  const response = await fetch("http://localhost:5000/enquiries/");
  if (!response.ok) {
    throw new Error("Failed to fetch total enquiries");
  }
  const data = await response.json();
  console.log(data, length);
  // toast.success("datafetched")
  return data.length;
};

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchTotalEnquiries,
  });


  if (isLoading)
    // toast.warning("loading")
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box p={4}>
      {/* <ToastContainer position="top-right" autoClose={10000} /> */}
      <Flex justify="center" align="center" minHeight="100vh">
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Card.Title mt="2">Total Number of Enquiries: </Card.Title>
            <Card.Description>Queries: {data}</Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end"> 
            <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
            <Button variant="outline">View</Button>
            </Link>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </Box>
  );
};

export default Dashboard;


