"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Box, Heading, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { BaseUrl, BaseUrlfe } from "@/service/apis";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  username: string;
}

const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>(
        `${BaseUrl}/auth/login`,
        data
      );
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      window.location.href = `${BaseUrlfe}/adminpanel/enquiries`;
    } catch (error) {
      setErrorMessage("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth="400px"
      mx="auto"
      mt="100px"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      backgroundColor="white"
    >
      <Heading mb="6" textAlign="center" color="green.500">
        Admin Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="6">
          <Text fontWeight="bold" mb="2" color="gray.600">
            Username
          </Text>
          <Input
            id="username"
            placeholder="Enter username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <Text color="red.500" mt="2" fontSize="sm">
              {errors.username.message}
            </Text>
          )}
        </Box>
        <Box mb="6">
          <Text fontWeight="bold" mb="2" color="gray.600">
            Password
          </Text>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Text color="red.500" mt="2" fontSize="sm">
              {errors.password.message}
            </Text>
          )}
        </Box>
        {errorMessage && (
          <Text color="red.500" mt="4" textAlign="center">
            {errorMessage}
          </Text>
        )}
        <Button mt="8" colorScheme="green" type="submit" width="full">
          {loading ? <Spinner size="sm" mr="2" /> : null} Login
        </Button>
      </form>
    </Box>
  );
};

export default AdminLoginPage;
