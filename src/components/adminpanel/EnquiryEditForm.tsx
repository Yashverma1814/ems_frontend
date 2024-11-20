"use client";
import moment from "moment";
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
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerActionTrigger,
  DrawerCloseTrigger,
  createListCollection,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BaseUrl } from "@/service/apis";
import { useParams } from "next/navigation";
import { Toaster, toaster } from "@/components/ui/toaster";
import { SelectContent, SelectTrigger, SelectValueText } from "../ui/select";

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
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (updatedData: EnquiryFormData) =>
      axios.put(`${BaseUrl}/enquiries/${id}`, updatedData),
    {
      onSuccess: () => {
        toaster.create({
          title: "Enquiry updated successfully.",
          type: "success",
        });
        queryClient.invalidateQueries(["enquiry", id]);
      },
      onError: (err) => {
        toaster.create({
          title: "Failed to update enquiry.",
          type: "error",
        });
      },
    }
  );

  const onSubmit = (data: EnquiryFormData) => {
    console.log("Submitting Data:", data);
    updateMutation.mutate(data, {
      onSuccess: () => {
        console.log("Data updated successfully");
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
    });
  };
  const relations = createListCollection({
    items: [
      { label: "Father", value: "father" },
      { label: "Mother", value: "mother" },
      { label: "Guardian", value: "guardian" },
      { label: "Other", value: "other" },
    ],
  })

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
    <DrawerRoot placement="bottom" size="lg">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button colorPalette={"green"} variant="subtle">
          Edit Enquiry
        </Button>
      </DrawerTrigger>
      <DrawerContent
        offset="4"
        rounded="md"
        style={{
          transform: "translate(0rem,-92%)",
        }}
      >
        <DrawerBody>
          <Box w="full" p="4">
            <Toaster />
            <Box>
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
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
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
                      <strong>D.O.B.:</strong> Current:{" "}
                      {moment(data.dateOfBirth).format("YYYY-MM-DD")}
                    </Text>
                    <Input
                      type="date"
                      placeholder="Date of Birth"
                      {...register("dateOfBirth")}
                      defaultValue="2020-11-05"
                    />
                    {errors.dateOfBirth && (
                      <Text color="red.500">{errors.dateOfBirth.message}</Text>
                    )}
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
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
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
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
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
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
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
                <DrawerActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerActionTrigger>
                <DrawerActionTrigger asChild>
                  <Button
                    variant={"surface"}
                    type="submit"
                    colorPalette={"green"}
                  >
                    Update
                  </Button>
                </DrawerActionTrigger>
              </form>
            </Box>
          </Box>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
