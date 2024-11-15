import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BaseUrlfe } from "@/service/apis";

const Links = ["Dashboard", "Enquiries"];

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Box bg={"gray.100"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size="md"
          //   icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ md: "none" }}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
        <HStack spaceX={8} alignItems={"center"}>
          <Heading size="lg" color="teal.500">
            Admin Panel
          </Heading>
          <HStack as={"nav"} spaceX={4} display={{ base: "none", md: "flex" }}>
            <Link href={`${BaseUrlfe}/adminpanel/dashboard`}>Dashboard</Link>
            <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>Enquiries</Link>
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button variant="solid" colorScheme="teal" size="sm">
            Sign Up
          </Button>
        </Flex>
      </Flex>

      {isMenuOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spaceX={4}>
            <Link href={`${BaseUrlfe}/adminpanel/dashboard`}>Dashboard</Link>
            <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
              Enquiries
            </Link>{" "}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
