// app/user-panel/page.tsx

import EnquiryForm from "@/components/userPanel/EnquiryForm";
import { Box, Heading, VStack, Image, HStack } from "@chakra-ui/react";

export default function UserPanel() {
  return (
    <Box
      minH="150vh" // Increase the height by 30%
      bgGradient="linear(to-br, teal.500, blue.500)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      py={{ base: "6", md: "8" }} // Increase padding on small screens for more vertical space
    >
      {/* Header Section with Logo */}
      <HStack
        spaceX={4}
        w="full"
        px={{ base: "6", md: "10" }} // Increase horizontal padding
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: "50", md: "50" }} // Increase margin between header and form
      >
        {/* EMS Logo */}
        <Image
          src="https://logowik.com/content/uploads/images/ems3178.logowik.com.webp" // Replace with your actual logo path
          alt="EMS Logo"
          boxSize={{ base: "75px", sm: "90px" }} // Increase logo size slightly
          objectFit="contain"
        />
      </HStack>

      {/* Form Section */}
      <Box
        w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} // Control width for different screen sizes
        maxW="container.md"
        minH="auto"
        p={{ base: "20", md: "20" }} // Increase padding for more space
        bg="white"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <VStack
          spaceX={{ base: "8", md: "8" }} // Increase spacing between form elements
          scaleY={{base:"8", md:"8"}}
          align="center"
          margin="10"
          height="100"
        >
          <Heading
            as="h2"
            size={{ base: "lg", md: "xl", lg: "3xl" }} // Increase heading size on larger screens
            color="teal.600"
            textAlign="center"
            mb={{ base: "6", md: "8" }} // Increase margin from form
          >
            Enquiry Management System
          </Heading>
          <EnquiryForm />
        </VStack>
      </Box>
    </Box>
  );
}
