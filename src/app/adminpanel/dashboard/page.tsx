"use client";

import React, { useEffect } from "react";
import { Box, Flex, Card, Button, Center, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Link from "next/link";
import { BaseUrlfe } from "@/service/apis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/adminpanel/Navbar";

const fetchTotalEnquiries = async (): Promise<number> => {
  const response = await fetch("http://localhost:5000/enquiries/");
  if (!response.ok) {
    throw new Error("Failed to fetch total enquiries");
  }
  const data = await response.json();
  console.log(data, length);
  return data.length;
};

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchTotalEnquiries,
  });

  useEffect(() => {
    toast.success("Welcome to admin dashboard");
  }, []);

  if (isLoading)
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box>
      <Navbar />
      <Box p={4}>
        <ToastContainer />
        <Flex justify="center" align="center" minHeight="100vh">
          <Card.Root width="320px">
            <Card.Body gap="2">
              <Card.Title mt="2">Total Number of Enquiries: </Card.Title>
              <Card.Description>Queries: {data}</Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
                <Button
                  variant="surface"
                  onClick={() => {
                    toast.success("Redirected to enquiry list section");
                  }}
                >
                  View
                </Button>
              </Link>
            </Card.Footer>
          </Card.Root>
        </Flex>
      </Box>
    </Box>
  );
};

export default Dashboard;
