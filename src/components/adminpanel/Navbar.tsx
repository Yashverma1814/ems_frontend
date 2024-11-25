"use client";

import React, { useState, useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { BaseUrlfe } from "@/service/apis";

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Image,
  Heading,
} from "@chakra-ui/react";

const Links = ["Dashboard", "Enquiries"];

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  return (
    <Box bg="gray.100" px={4} boxShadow="md">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        {/* Logo */}
        <Image
          src="https://logowik.com/content/uploads/images/ems3178.logowik.com.webp"
          alt="EMS Logo"
          boxSize={{ base: "75px", sm: "90px" }}
          objectFit="contain"
        />

        <HStack as="nav" spaceX={6} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <Link
              key={link}
              href={`${BaseUrlfe}/adminpanel/${link.toLowerCase()}`}
              fontSize="lg"
              fontWeight="medium"
              _hover={{ textDecoration: "underline", color: "blue.500" }}
            >
              {link}
            </Link>
          ))}
        </HStack>

        {/* User Section */}
        <Flex alignItems="center">
          {token ? (
            <HStack spaceX={4} align="center">
              {/* Custom Avatar */}
              <Box
                width="40px"
                height="40px"
                bg="gray.300"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="sm"
              >
                <RxAvatar size={25} color="gray.600" />
              </Box>
              <Heading as="h5" size="sm" color="gray.700">
                {username || "Guest"}
              </Heading>
              <Button
                size="sm"
                bg="red.500"
                color="white"
                _hover={{ bg: "red.600" }}
                onClick={logout}
              >
                <Link href={`${BaseUrlfe}/adminpanel/login`} color="white">
                  Log Out
                </Link>
              </Button>
            </HStack>
          ) : null}
        </Flex>

        {/* Mobile Menu Toggle */}
        <IconButton
          size="md"
          aria-label="Toggle Navigation"
          display={{ md: "none" }}
          bg="gray.200"
          _hover={{ bg: "gray.300" }}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      </Flex>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <HStack as="nav" spaceX={4}>
            {Links.map((link) => (
              <Link
                key={link}
                href={`${BaseUrlfe}/adminpanel/${link.toLowerCase()}`}
                fontSize="lg"
                fontWeight="medium"
                _hover={{ textDecoration: "underline", color: "blue.500" }}
              >
                {link}
              </Link>
            ))}
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
