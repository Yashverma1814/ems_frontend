"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Checkbox,
  createListCollection,
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  For,
  Grid,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BaseUrl, BaseUrlfe } from "@/service/apis";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

interface Enquiry {
  _id: string;
  studentName: string;
  grade: string;
  contactDetails: {
    contactMain: string;
  };
  enquirySource: string;
}

const noOfLimit = createListCollection({
  items: [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
  ],
});

const states = createListCollection({
  items: [
    { label: "Delhi", value: "delhi" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Banglore", value: "banglore" },
    { label: "Kerala", value: "kerala" },
  ],
});

const source = createListCollection({
  items: [
    { label: "Website", value: "website" },
    { label: "School Fair", value: "school-fair" },
    { label: "Referral", value: "referral" },
    { label: "Other", value: "other" },
  ],
});

const AdminEnquiriesPage: FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [data, setData] = useState<Enquiry[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("");
  const [enqSource, setEnqSource] = useState("");
  const [wantHostel, setWantHostel] = useState(Boolean);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/enquiries/paginate?limit=${limit}&page=${page}&state=${state}&enquirySource=${enqSource}&hostel=${wantHostel}`
      );
      setData(response.data.enquiries);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch enquiries", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(wantHostel);

  const handleClearFilter = () => {
    setState("");
    setEnqSource("");
    setWantHostel(Boolean);
    setLimit(5);
    setPage(1);
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const token = localStorage.getItem("token");

  if (loading) return <Center height="100vh"><Spinner size="xl"/></Center>

  if (!token) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        You are Not Logged In{" "}
        <Link href={`${BaseUrlfe}/adminpanel/login`}>
          {" "}
          <Button colorPalette="teal" variant="outline">
            Click Here
            <RiArrowRightLine />
          </Button>
        </Link>{" "}
        to Login
      </div>
    );
  }

  return (
    <Box p="5">
      <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent
          style={{
            position: "fixed",
            width: "20vw",
            height: "90vh",
            overflow: "auto",
            zIndex: 150,
          }}
        >
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Stack gap="5" width="250px" height={100}>
              <SelectRoot
                collection={states}
                onValueChange={(e) => setState(e.value.toString())}
              >
                <SelectLabel>Select State</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={`${state || "Select"}`} />
                </SelectTrigger>
                <SelectContent>
                  {states.items.map((s) => (
                    <SelectItem item={s} key={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Stack>

            <Stack gap="5" width="250px" height={100}>
              <SelectRoot
                collection={source}
                onValueChange={(e) => setEnqSource(e.value.toString())}
              >
                <SelectLabel>Select Enquiry Source</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder={`${enqSource || "Select"}`} />
                </SelectTrigger>
                <SelectContent>
                  {source.items.map((s) => (
                    <SelectItem item={s} key={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Stack>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "16px",
                color: "#2D3748",
                gap: "8px",
              }}
            >
              <input
                type="checkbox"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  border: "2px solid #CBD5E0",
                  backgroundColor: "white",
                  appearance: "none",
                  cursor: "pointer",
                  transition:
                    "background-color 0.2s ease, border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#319795")}
                onBlur={(e) => (e.target.style.borderColor = "#CBD5E0")}
                onChange={(e) => {
                  if (wantHostel == null) {
                    setWantHostel(true);
                  }
                  setWantHostel(!wantHostel);
                  e.target.style.backgroundColor = e.target.checked
                    ? "#319795"
                    : "white";
                }}
              />
              Want Hostel?
            </label>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={handleClearFilter}>
              Clear Filter
            </Button>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <DrawerActionTrigger asChild>
              <Button onClick={() => fetchEnquiries()}>Apply</Button>
            </DrawerActionTrigger>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>

      <Text fontSize="2xl" mb="4">
        Admin Enquiries Dashboard
      </Text>

      <Box overflowX="auto" border="1px solid #E2E8F0" borderRadius="lg">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#EDF2F7" }}>
              <tr>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  Student Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  Grade
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  Guardian Contact
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  Enquiry Source
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "bold",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((enquiry) => (
                <tr key={enquiry._id}>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {enquiry.studentName}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {enquiry.grade}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {enquiry.contactDetails.contactMain}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    {enquiry.enquirySource}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #E2E8F0",
                    }}
                  >
                    <Link href={`${BaseUrlfe}/adminpanel/enquiries/${enquiry._id}`}>
                      <Button colorPalette="teal" variant="solid">View Enquiry</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}>
        <Stack gap="5" width="320px" height={100}>
          <SelectRoot
            collection={noOfLimit}
            onValueChange={(e) => setLimit(+e.value)}
          >
            <SelectLabel>Select Number of limit</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder={`${limit}`} />
            </SelectTrigger>
            <SelectContent>
              {noOfLimit.items.map((num) => (
                <SelectItem item={num} key={num.value}>
                  {num.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Stack>
        <Box>
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            mt="4"
            mr="2"
          >
            Previous
          </Button>
          <Text display="inline" mx="2">
            Page {page}
          </Text>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            mt="4"
          >
            Next
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminEnquiriesPage;
