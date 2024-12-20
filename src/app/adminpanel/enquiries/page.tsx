"use client";

import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { BaseUrl, BaseUrlfe } from "@/service/apis";
import { TableList } from "@/components/adminpanel/TableList";
import { noOfLimit } from "@/service/collection";
import { Filters } from "@/components/adminpanel/Filters";
import Navbar from "@/components/adminpanel/Navbar";
import { FieldAddingCheckBox } from "@/components/adminpanel/FieldAddingCheckBox";
import { FieldResetButton } from "@/components/adminpanel/FieldResetButton";
import { GiArchiveResearch } from "react-icons/gi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrNext, GrPrevious } from "react-icons/gr";

import {
  Box,
  Button,
  Center,
  Flex,
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
import { Order } from "@/components/adminpanel/Order";

export interface Enquiry {
  _id: string;
  studentName: string;
  grade: string;
  contactDetails: {
    contactMain: string;
    email: string;
  };
  enquirySource: string;
  createdAt: Date;

  guardianName: string;
  relation: string;
  address: {
    state: string;
  };
}

const fetchEnquiries = async (params: {
  limit: number;
  page: number;
  state: string;
  enquirySource: string;
  searchedName: string;
  sortingOrder: string;
  nameSortOrder: string;
}) => {
  const {
    limit,
    page,
    state,
    enquirySource,
    searchedName,
    sortingOrder,
    nameSortOrder,
  } = params;
  const response = await axios.get(
    `${BaseUrl}/enquiries/paginate?limit=${limit}&page=${page}&state=${state}&enquirySource=${enquirySource}&searchedName=${searchedName}&sort=${sortingOrder}&nameSort=${nameSortOrder}`
  );
  return response.data;
};

const AdminEnquiriesPage: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [mPage, setMPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [sortingOrder, setSortingOrder] = useState("desc");
  const [stnState, setStnState] = useState(searchParams.get("state") || "");
  const [enqSource, setEnqSource] = useState(searchParams.get("source") || "");
  const [searchedStnName, setSearchedStnName] = useState(
    searchParams.get("searchedname") || ""
  );
  const [nameSortOrder, setNameSortOrder] = useState("desc");
  const [appliedClick, setAppliedClick] = useState(0);
  const [addEmail, setAddEmail] = useState(
    searchParams.get("emailField") === "true" || false
  );
  const [addState, setAddState] = useState(
    searchParams.get("stateField") === "true" || false
  );
  const [addGuardianName, setAddGuardianName] = useState(
    searchParams.get("guardianNameField") === "true" || false
  );
  const [addRelation, setAddRelation] = useState(
    searchParams.get("relationField") === "true" || false
  );
  const [addStnName, setAddStnName] = useState(
    searchParams.get("stnNameField") === "true" || true
  );
  const [addGrade, setAddGrade] = useState(
    searchParams.get("gradeField") === "true" || true
  );
  const [addGuardianContact, setAddGuadianContact] = useState(
    searchParams.get("guardianContactField") === "true" || true
  );
  const [addSource, setAddSource] = useState(
    searchParams.get("sourceField") === "true" || true
  );
  const [addAsked, setAddAsked] = useState(
    searchParams.get("askedField") === "true" || true
  );

  useEffect(()=>{
    setPage(1)
  },[limit])

  const handleClearFilter = () => {
    setStnState("");
    setEnqSource("");
    setLimit(7);
    setPage(1);
    setSearchedStnName("");
    setAppliedClick(0);
  };

  const extFields = {
    addEmail,
    addState,
    addGuardianName,
    addRelation,
    addStnName,
    addGrade,
    addGuardianContact,
    addSource,
    addAsked,
    setAddEmail,
    setAddState,
    setAddGuardianName,
    setAddRelation,
    setAddStnName,
    setAddGrade,
    setAddGuadianContact,
    setAddSource,
    setAddAsked,
  };

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
  const orderObj = {
    sortingOrder,
    setSortingOrder,
    nameSortOrder,
    setNameSortOrder,
  };

  useEffect(() => {
    setPage(1);
  }, [searchedStnName]);

  useEffect(() => {
    router.push(
      `?searchedname=${searchedStnName}&state=${stnState}&source=${enqSource}&stnNameField=${addStnName}&gradeField=${addGrade}&guardianContactField=${addGuardianContact}&sourceField=${addSource}&emailField=${addEmail}&stateField=${addState}&guardianNameField=${addGuardianName}&relationField=${addRelation}&askedField=${addAsked}`,
      {
        scroll: false,
      }
    );
  }, [
    searchedStnName,
    stnState,
    enqSource,
    router,
    addStnName,
    addGrade,
    addGuardianContact,
    addSource,
    addEmail,
    addState,
    addGuardianName,
    addRelation,
    addAsked,
  ]);
  // console.log(enqOrder)
  const { data, isLoading } = useQuery(
    [
      "enquiries",
      {
        page,
        limit,
        appliedClick,
        searchedStnName,
        sortingOrder,
        nameSortOrder,
      },
    ],
    () =>
      fetchEnquiries({
        limit,
        page,
        state: stnState,
        enquirySource: enqSource,
        searchedName: searchedStnName,
        sortingOrder: sortingOrder,
        nameSortOrder: nameSortOrder,
      }),
    {
      keepPreviousData: true,
      staleTime: 30000,
    }
  );

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

  // console.log(data);
  // console.log(
  //   addEmail,
  //   addState,
  //   addGuardianName,
  //   addRelation,
  //   addStnName,
  //   addGrade,
  //   addGuardianContact,
  //   addSource,
  //   addAsked
  // );

  return (
    <Box>
      <Navbar />
      <Box p="5">
        <Text fontSize="2xl" mb="4">
          Enquiries List
        </Text>
        <Flex justifyContent="space-between">
          <Flex gap="1rem">
            <Filters filterObj={filterObj} />
            <Text fontSize="lg" mb="4" fontWeight={"medium"}>
              Total Enquiries : {data.total}
            </Text>
            {searchedStnName != "" || stnState != "" || enqSource != "" ? (
              <Text>
                Filters:{" "}
                {` Searched: ${searchedStnName}> State: ${stnState}> Source: ${enqSource}`}
              </Text>
            ) : (
              ""
            )}
          </Flex>
          <Flex>
            <FieldAddingCheckBox extFields={extFields} />
            <FieldResetButton extFields={extFields} />
          </Flex>
        </Flex>
        <Box overflowX="auto" border="1px solid #E2E8F0" borderRadius="lg">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <TableList
              enqList={data?.enquiries || []}
              sortingObj={orderObj}
              queryKey={[
                "enquiries",
                { page, limit, searchedStnName, appliedClick },
              ]}
              extFields={extFields}
            />
          )}
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
                {noOfLimit.items.map((num) => (
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
              <GrPrevious />
            </Button>
            <Text display="inline" mx="2">
              Page {page} / {data?.totalPages || 1}
            </Text>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= (data?.totalPages || 1)}
              mt="4"
            >
              <GrNext />
            </Button>
            <Box>
              <Input
                type="number"
                value={mPage}
                onChange={(e) => {
                  setMPage(+e.target.value);
                }}
                width="52px"
                justifyContent="center"
                alignContent="center"
              />
              <br />
              <Button
                onClick={() => handleManuallyPageSet(mPage)}
                variant={"subtle"}
              >
                <GiArchiveResearch />
              </Button>
            </Box>
          </Box>
          <Box justifyItems="right" alignItems="right"></Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminEnquiriesPage;
