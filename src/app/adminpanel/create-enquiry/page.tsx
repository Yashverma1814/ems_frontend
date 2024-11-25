"use client";

import Navbar from "@/components/adminpanel/Navbar";
import EnquiryForm from "@/components/userPanel/EnquiryForm";
import { Box, Image } from "@chakra-ui/react";

const CreateEnquiry = () => {
  return (
    <Box>
      <Navbar />
      <Box paddingTop="10rem">
        <EnquiryForm />
      </Box>
    </Box>
  );
};

export default CreateEnquiry;
