"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Box, Heading, Text, Table, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { BaseUrl, BaseUrlfe } from '@/service/apis';
import { toaster, Toaster } from '@/components/ui/toaster';

interface RegisterFormData {
  username: string;
  password: string;
}   

interface RegisterResponse{
    message: string
}

const AdminRegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const response = await axios.post<RegisterResponse>(`${BaseUrl}/auth/register`, data);
      toaster.create({
        title: "Registered Successfully",
        type: "success",
      });
      window.location.href = `${BaseUrlfe}/adminpanel/login`; 
    } catch (error) {
      toaster.create({
        title: "Failed to Regsister",
        type: "error",
      });
      setErrorMessage('Unable to Register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt="100px" p="5" borderWidth="1px" borderRadius="lg">
      <Heading mb="6">Admin Register</Heading>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="4">
          <Text fontWeight="bold" mb="1">Username</Text>
          <Input
            id="username"
            placeholder="Enter username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <Text color="red.500" mt="1" fontSize="sm">{errors.username.message}</Text>}
        </Box>
        <Box mb="4">
          <Text fontWeight="bold" mb="1">Password</Text>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <Text color="red.500" mt="1" fontSize="sm">{errors.password.message}</Text>}
        </Box>
        <Table.Root>

        </Table.Root>
        {errorMessage && <Text color="red.500" mt="2">{errorMessage}</Text>}
        <Button mt="6" colorScheme="green" type="submit" width="full">
        {loading ? <Spinner size="sm" mr="2" /> : null}Register
        </Button>
      </form>
    </Box>
  );
};

export default AdminRegisterPage;
