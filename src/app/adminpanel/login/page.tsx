"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Box, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

const AdminLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>('/auth/login', data);
      localStorage.setItem('token', response.data.access_token); // Store JWT token
      window.location.href = '/admin/enquiries'; // Redirect to the admin dashboard
    } catch (error) {
      setErrorMessage('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt="100px" p="5" borderWidth="1px" borderRadius="lg">
      <Heading mb="6">Admin Login</Heading>
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
        {errorMessage && <Text color="red.500" mt="2">{errorMessage}</Text>}
        <Button mt="6" colorScheme="green" type="submit" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default AdminLoginPage;
