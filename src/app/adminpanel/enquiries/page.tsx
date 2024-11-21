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
import { useQuery } from "react-query";
import { TableList } from "@/components/adminpanel/TableList";
import { noOfLimit } from "@/service/collection";
import { Filters } from "@/components/adminpanel/Filters";
import Navbar from "@/components/adminpanel/Navbar";

export interface Enquiry {
  _id: string;
  studentName: string;
  grade: string;
  contactDetails: {
    contactMain: string;
  };
  enquirySource: string;
  createdAt:Date;
}

const fetchEnquiries = async (params: {
  limit: number;
  page: number;
  state: string;
  enquirySource: string;
  searchedName: string;
}) => {
  const { limit, page, state, enquirySource, searchedName } = params;
  const response = await axios.get(
    `${BaseUrl}/enquiries/paginate?limit=${limit}&page=${page}&state=${state}&enquirySource=${enquirySource}&searchedName=${searchedName}`
  );
  return response.data;
};

const AdminEnquiriesPage: FC = () => {
  const [open,setOpen] = useState(false)
  const [page, setPage] = useState(1);
  const [mPage, setMPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [stnState, setStnState] = useState("");
  const [enqSource, setEnqSource] = useState("");
  const [searchedStnName, setSearchedStnName] = useState("");
  const [appliedClick,setAppliedClick] = useState(0)

  const { data, isLoading } = useQuery(
    ["enquiries", { page, limit, appliedClick, searchedStnName }],
    () =>
      fetchEnquiries({
        limit,
        page,
        state: stnState,
        enquirySource: enqSource,
        searchedName: searchedStnName,
      }),
    {
      keepPreviousData: true, 
      staleTime: 30000, 
    }
  );
  
  useEffect(()=>{
    setPage(1)
  },[searchedStnName])

  const handleClearFilter = () => {
    setStnState("");
    setEnqSource("");
    setLimit(7);
    setPage(1);
    setSearchedStnName("");
    setAppliedClick(0)
  };

  const handleManuallyPageSet = (val: number) => {
    if (val > (data?.totalPages || 1) || val <= 0) {
      setMPage(1);
    } else {
      setPage(val);
    }
  };


  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (data?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  const token = localStorage.getItem("token");
  if (isLoading)
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
    searchedStnName,
    appliedClick,
    setOpen,
    setStnState,
    setEnqSource,
    handleClearFilter,
    setPage,
    setSearchedStnName,
    setAppliedClick,
  };
  console.log(data)

  return (
    <Box>
      <Navbar/>
    <Box p="5">
      <Filters filterObj={filterObj} />

      <Text fontSize="2xl" mb="4">
        Admin Enquiries Dashboard
      </Text>
      <Text fontSize="lg" mb="4" fontWeight={"medium"}>
        Total Enquiries : {data.total}
      </Text>

      <Box overflowX="auto" border="1px solid #E2E8F0" borderRadius="lg">
        {isLoading ? <div>Loading...</div> : <TableList enqList={data?.enquiries || []} queryKey={["enquiries", { page, limit,  searchedStnName,appliedClick }]} />
      }
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
            Page {page} / {data?.totalPages || 1}
          </Text>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= (data?.totalPages || 1)}
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
    </Box>
  );
};

export default AdminEnquiriesPage;
