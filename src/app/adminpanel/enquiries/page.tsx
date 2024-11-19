"use client";

import { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Grid,
  Input,
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
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { TableList } from "@/components/adminpanel/TableList";
import { noOfLimit, states, source } from "@/service/collection";
import { Filters } from "@/components/adminpanel/Filters";

export interface Enquiry {
  _id: string;
  studentName: string;
  grade: string;
  contactDetails: {
    contactMain: string;
  };
  enquirySource: string;
}

const AdminEnquiriesPage: FC = () => {
  const [page, setPage] = useState(1);
  const [mPage, setMPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [data, setData] = useState<Enquiry[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [stnState, setStnState] = useState("");
  const [enqSource, setEnqSource] = useState("");


  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/enquiries/paginate?limit=${limit}&page=${page}&state=${stnState}&enquirySource=${enqSource}`
      );
      setData(response.data.enquiries);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch enquiries", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setStnState("");
    setEnqSource("");
    setLimit(5);
    setPage(1);
  };

  const handleManuallyPageSet = (val: number) => {
    if (val > totalPages || val <= 0) {
      setMPage(1);
    } else {
      setPage(val);
    }
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

  if (loading)
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );

  if (!token) {
    return (
      <center>
        <div>
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
      </center>
    );
  }

  const filterObj = {
    open,
    stnState,
    enqSource,
    setOpen,
    setStnState,
    setEnqSource,
    handleClearFilter,
    fetchEnquiries,
    setPage,

}

  return (
    <Box p="5">
      
      <Filters filterObj={filterObj}/>
      <Text fontSize="2xl" mb="4">
        Admin Enquiries Dashboard
      </Text>

      <Box overflowX="auto" border="1px solid #E2E8F0" borderRadius="lg">
        {loading ? <div>Loading...</div> : <TableList enqList={data} />}
      </Box>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}>
        <Stack gap="5" width="150px" height={100}>
          <SelectRoot
            collection={noOfLimit}
            onValueChange={(e) => setLimit(+e.value)}
          >
            <SelectLabel>limit</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder={`${limit}`} />
            </SelectTrigger>
            <SelectContent>
              {noOfLimit.items.map((num: any) => (
                <SelectItem item={num} key={num.value}>
                  {num.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Stack>
        <Box justifyItems="center" alignItems="center">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            mt="4"
            mr="2"
          >
            Previous
          </Button>
          <Text display="inline" mx="2">
            Page {page} / {totalPages}
          </Text>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            mt="4"
          >
            Next
          </Button>
          <Box>
            <Input
              type="number"
              value={mPage}
              onChange={(e) => {
                setMPage(+e.target.value);
              }}
              width="75px"
              justifyContent="center"
              alignContent="center"
            />
            <br />
            <Button
              onClick={() => handleManuallyPageSet(mPage)}
              variant={"subtle"}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminEnquiriesPage;
