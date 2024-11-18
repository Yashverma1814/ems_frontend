"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  Heading,
  Grid,
  GridItem,
  Spinner,
  Center,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { BaseUrl } from "@/service/apis";
import { useParams } from "next/navigation";

type EnquiryFormData = {
  studentName: string;
  guardianName: string;
  relation: string;
  dateOfBirth: Date;
  grade: string;
  currentSchool: string;
  contactDetails: {
    contactMain: string;
    contactOpt?: string;
    email?: string;
    socialMediaHandles?: { twitter?: string };
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  enquirySource: string;
  description: string;
  wantHostelInfo: boolean;
  wantTransportInfo: boolean;
};

const fetchEnquiryDetail = async (id: any) => {
  try {
    const response = await axios.get(`${BaseUrl}/enquiries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch enquiry details", error);
  }
};

const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  console.log([month, day, year].join("-"));
  return [month, day, year].join("-");
};

export default function EnquiryEditForm() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>();

  // console.log(closePopover)

  const { data, isLoading, isError } = useQuery(
    ["enquiry", id],
    () => fetchEnquiryDetail(id),
    {
      enabled: !!id,
      onSuccess: (data) => reset(data),
    }
  );

  const mutation = useMutation(
    (updatedData: EnquiryFormData) =>
      axios.put(`${BaseUrl}/enquiries/${id}`, updatedData),
    {
      onSuccess: () => {
        alert("Enquiry updated successfully.");
      },
      onError: (err) => {
        alert("Failed to update enquiry.");
      },
    }
  );

  const onSubmit = (data: EnquiryFormData) => {
    mutation.mutate(data);
  };

  if (isLoading)
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );

  if (isError)
    return (
      <Text color="red.500" textAlign="center">
        Error loading enquiry details.
      </Text>
    );

  return (
    <PopoverRoot positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger asChild>
        <Button size="sm" colorPalette={"green"} variant="subtle">
          Update
        </Button>
      </PopoverTrigger>
      <PopoverContent width="600px">
        <PopoverArrow />
        <PopoverBody>
          <Box
            w="full"
            h="100vh"
            p="4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
          >
            <Box
              maxW="container.md"
              w="full"
              p="6"
              bg="white"
              borderRadius="lg"
              boxShadow="xl"
            >
              <Heading
                mb="6"
                as="h2"
                size="2xl"
                textAlign="center"
                color="teal.600"
              >
                Enquiry Edit Form
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Heading
                  mb="6"
                  as="h1"
                  size="lg"
                  textAlign="left"
                  color="teal.600"
                >
                  Student Information
                </Heading>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
                  gap={6}
                >
                  <GridItem>
                    <Input
                      placeholder="Student Name"
                      {...register("studentName", {
                        required: "Student Name is required",
                      })}
                    />
                    {errors.studentName && (
                      <Text color="red.500">{errors.studentName.message}</Text>
                    )}
                  </GridItem>

                  <GridItem>
                    <Input
                      placeholder="Guardian Name"
                      {...register("guardianName", {
                        required: "Guardian Name is required",
                      })}
                    />
                    {errors.guardianName && (
                      <Text color="red.500">{errors.guardianName.message}</Text>
                    )}
                  </GridItem>

                  <GridItem>
                    <select
                      {...register("relation", {
                        required: "Relation is required",
                      })}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <option value="">Relation with Child</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.relation && (
                      <Text color="red.500">{errors.relation.message}</Text>
                    )}
                  </GridItem>

                  <GridItem>
                    <Text>
                      <strong>D.O.B.:</strong> {formatDate(data.dateOfBirth)}
                    </Text>
                  </GridItem>

                  <GridItem>
                    <Input
                      placeholder="Current School"
                      {...register("currentSchool")}
                    />
                  </GridItem>
                </Grid>

                <br />
                <Heading
                  mb="6"
                  as="h1"
                  size="lg"
                  textAlign="left"
                  color="teal.600"
                >
                  Contact Details
                </Heading>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
                  gap={6}
                >
                  <GridItem>
                    <Input
                      placeholder="Guardian Phone"
                      maxLength={10}
                      {...register("contactDetails.contactMain", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                    />
                    {errors.contactDetails?.contactMain && (
                      <Text color="red.500">
                        {errors.contactDetails.contactMain.message}
                      </Text>
                    )}
                  </GridItem>

                  <GridItem>
                    <Input
                      placeholder="Guardian Email"
                      {...register("contactDetails.email")}
                    />
                  </GridItem>

                  <GridItem>
                    <Input
                      placeholder="Social Media (Twitter)"
                      {...register("contactDetails.socialMediaHandles.twitter")}
                    />
                  </GridItem>
                </Grid>

                <br />
                <Heading
                  mb="6"
                  as="h1"
                  size="lg"
                  textAlign="left"
                  color="teal.600"
                >
                  Address
                </Heading>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
                  gap={6}
                >
                  <GridItem>
                    <Input
                      placeholder="Street"
                      {...register("address.street")}
                    />
                  </GridItem>
                  <GridItem>
                    <Input placeholder="City" {...register("address.city")} />
                  </GridItem>
                  <GridItem>
                    <select
                      {...register("address.state")}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <option value="">Select State</option>
                      <option value="uttarakhand">Uttarakhand</option>
                      <option value="delhi">Delhi</option>
                      {/* Additional states */}
                    </select>
                  </GridItem>
                  <GridItem>
                    <Input
                      placeholder="Country"
                      {...register("address.country")}
                    />
                  </GridItem>
                </Grid>

                <br />
                <Heading
                  mb="6"
                  as="h1"
                  size="lg"
                  textAlign="left"
                  color="teal.600"
                >
                  Additional Information
                </Heading>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
                  gap={6}
                >
                  <GridItem>
                    <Textarea
                      placeholder="Description"
                      {...register("description")}
                    />
                  </GridItem>
                  <GridItem>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input type="checkbox" {...register("wantHostelInfo")} />
                      Want Hostel?
                    </label>
                  </GridItem>
                  <GridItem>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="checkbox"
                        {...register("wantTransportInfo")}
                      />
                      Want Transport?
                    </label>
                  </GridItem>
                </Grid>
                {/* <Button
                    type="submit"
                    colorPalette={"green"}
                    variant="subtle"
                    size="lg"
                    mt="6"
                    w="full"
                  > */}
                <PopoverCloseTrigger type="submit">
                  <Box
                    as="div"
                    display="inline-block"
                    padding="8px 16px"
                    borderRadius="md"
                    marginTop="1rem"
                    backgroundColor="white"
                    color="green.700"
                    boxShadow="sm"
                    borderWidth="1px"
                    borderColor="green.200"
                    _hover={{
                      backgroundColor: "green.50",
                      cursor: "pointer",
                    }}
                    _active={{
                      backgroundColor: "green.100",
                    }}
                    textAlign="center"
                  >
                    Update Enquiry
                  </Box>
                </PopoverCloseTrigger>

                {/* </Button> */}
              </form>
            </Box>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
