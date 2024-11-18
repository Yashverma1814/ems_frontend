"use client";

import React from "react";
import {
  Box,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import Link from "next/link";
import { BaseUrlfe } from "@/service/apis";

// Dummy API call (replace this with the actual API endpoint)
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

  if (isLoading)
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box p={4}>
      <Flex justify="center" align="center" minHeight="100vh">
        {/* <Card
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          background={cardBackground}
          shadow="xl"
        >
          <CardHeader>
            <Heading size="md" color="gray.600">Total Enquiries</Heading>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <Text fontSize="4xl" fontWeight="bold">Loading...</Text>
            ) : error ? (
              <Text fontSize="md" color="red.500">Error: {error.message}</Text>
            ) : (
              <Text fontSize="4xl" fontWeight="bold">{totalEnquiries}</Text>
            )}
          </CardBody>
        </Card> */}
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
