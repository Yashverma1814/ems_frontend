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
  Avatar,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BaseUrlfe } from "@/service/apis";
import { RxAvatar } from "react-icons/rx";

const Links = ["Dashboard", "Enquiries"];

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

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
          {token ? (
            <>
              <Grid gridTemplate={{ base: "1fr", md: "repeat(1, 1fr)" }} p={4} justifyItems="center" alignItems="center">
                <GridItem   >
                  <RxAvatar
                    style={{
                      fontSize: "35px",
                    }}
                  />
                </GridItem>
                <GridItem>
                  <div>
                    <label htmlFor="">{username}</label>
                  </div>
                </GridItem>
              </Grid>
              <Button
                variant="surface"
                colorPalette="red"
                size="sm"
                onClick={() => logout()}
              >
                <Link href={`${BaseUrlfe}/adminpanel/login`}>Log Out</Link>
              </Button>
            </>
          ) : (
            ""
          )}
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
