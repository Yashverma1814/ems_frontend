// "use client"

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Flex,
//   HStack,
//   Link,
//   IconButton,
//   Stack,
//   Heading,
//   Button,
//   Avatar,
//   Grid,
//   GridItem,
//   Image,
// } from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import { BaseUrlfe } from "@/service/apis";
// import { RxAvatar } from "react-icons/rx";

// const Links = ["Dashboard", "Enquiries"];


// const token = localStorage.getItem("token");
// const username = localStorage.getItem("username");

// const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
// };

// const Navbar = () => {
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   return (
//     <Box bg={"gray.100"} px={4}>
//       <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//         <IconButton
//           size="md"
//           //   icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
//           aria-label="Toggle Navigation"
//           display={{ md: "none" }}
//           onClick={() => setMenuOpen(!isMenuOpen)}
//         />
//         <HStack spaceX={8} alignItems={"center"}>
//           <HStack
//             spaceX={4}
//             w="full"
//             px={{ base: "6", md: "10" }}
//             justifyContent="space-between"
//             alignItems="center"
//             mb={{ base: "50", md: "50" }}
//           >
//             <Image
//               src="https://logowik.com/content/uploads/images/ems3178.logowik.com.webp"
//               alt="EMS Logo"
//               boxSize={{ base: "75px", sm: "90px" }}
//               objectFit="contain"
//             />
//           </HStack>
//           <HStack as={"nav"} spaceX={4} display={{ base: "none", md: "flex" }}>
//             <Link href={`${BaseUrlfe}/adminpanel/dashboard`}>Dashboard</Link>
//             <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>Enquiries</Link>
//           </HStack>
//         </HStack>
//         <Flex alignItems={"center"}>
//           {token ? (
//             <>
//               <Grid
//                 gridTemplate={{ base: "1fr", md: "repeat(1, 1fr)" }}
//                 p={4}
//                 justifyItems="center"
//                 alignItems="center"
//               >
//                 <GridItem>
//                   <RxAvatar
//                     style={{
//                       fontSize: "35px",
//                     }}
//                   />
//                 </GridItem>
//                 <GridItem>
//                   <div>
//                     <label htmlFor="">{username}</label>
//                   </div>
//                 </GridItem>
//               </Grid>
//               <Button
//                 variant="surface"
//                 colorPalette="red"
//                 size="sm"
//                 onClick={() => logout()}
//               >
//                 <Link href={`${BaseUrlfe}/adminpanel/login`}>Log Out</Link>
//               </Button>
//             </>
//           ) : (
//             ""
//           )}
//         </Flex>
//       </Flex>

//       {isMenuOpen && (
//         <Box pb={4} display={{ md: "none" }}>
//           <Stack as={"nav"} spaceX={4}>
//             <Link href={`${BaseUrlfe}/adminpanel/dashboard`}>Dashboard</Link>
//             <Link href={`${BaseUrlfe}/adminpanel/enquiries`}>
//               Enquiries
//             </Link>{" "}
//           </Stack>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Navbar;



"use client";

import React, { useState, useEffect } from "react";
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
import { HamburgerIcon } from "@chakra-ui/icons";
import { BaseUrlfe } from "@/service/apis";
import { RxAvatar } from "react-icons/rx";

const Links = ["Dashboard", "Enquiries"];

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>("");

  // Only access localStorage on the client side
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
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        {/* Logo */}
        <Image
          src="https://logowik.com/content/uploads/images/ems3178.logowik.com.webp"
          alt="EMS Logo"
          boxSize={{ base: "75px", sm: "90px" }}
          objectFit="contain"
        />

        {/* Desktop Navigation */}
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
