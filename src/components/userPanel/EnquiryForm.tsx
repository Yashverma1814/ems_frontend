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
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { BaseUrl } from "@/service/apis";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { enqSource, grade, relation, statesIndia } from "@/service/collection";
import { EnquiryFormData } from "@/service/typesForSubmission";

export default function EnquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>();

  const mutation = useMutation(
    (data: EnquiryFormData) => axios.post(`${BaseUrl}/enquiries`, data),
    {
      onSuccess: () => {
        toaster.create({
          title: "Enquiry submitted successfully.",
          type: "success",
        });
        reset();
      },
      onError: (err: unknown) => {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 409) {
            toaster.create({
              title: "An enquiry already exists with this contact number",
              type: "error",
            });
          } else {
            toaster.create({
              title: "Failed to submit enquiry.",
              type: "error",
            });
          }
        } else {
          toaster.create({
            title: "An unexpected error occurred..",
            type: "error",
          });
        }
      },
    }
  );
  const { isLoading } = mutation;
  const onSubmit = (data: EnquiryFormData) => {
    mutation.mutate(data);
  };

  return (
    <Box
      w="full"
      h="100vh"
      p="4"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Toaster />
      <Box
        maxW="container.md"
        w="full"
        p="6"
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
      >
        <Heading mb="6" as="h2" size="2xl" textAlign="center" color="teal.600">
          Enquiry Form
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600" marginTop="3rem">
            Student Information
          </Heading>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <GridItem>
              <Input
                placeholder="Student Name *"
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
                placeholder="Guardian Name *"
                {...register("guardianName", {
                  required: "Guardian Name is required",
                })}
              />
              {errors.guardianName && (
                <Text color="red.500">
                  required{errors.guardianName.message}
                </Text>
              )}
            </GridItem>

            <GridItem>
              <SelectRoot
                collection={relation}
                size="md"
                {...register("relation", { required: "Relation is required" })}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select Relation *" />
                </SelectTrigger>
                <SelectContent>
                  {relation.items.map((rel) => (
                    <SelectItem item={rel} key={rel.value}>
                      {rel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              {errors.relation && (
                <Text color="red.500">{errors.relation.message}</Text>
              )}
            </GridItem>

            <GridItem>
              <SelectRoot
                collection={grade}
                size="md"
                {...register("grade", { required: "Grade is required" })}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select Grade of Student" />
                </SelectTrigger>
                <SelectContent>
                  {grade.items.map((gra) => (
                    <SelectItem item={gra} key={gra.value}>
                      {gra.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              {errors.grade && (
                <Text color="red.500">{errors.grade.message}</Text>
              )}
            </GridItem>

            <GridItem>
              <Input
                type="date"
                placeholder="Date of Birth *"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
              />
              {errors.dateOfBirth && (
                <Text color="red.500">{errors.dateOfBirth.message}</Text>
              )}
            </GridItem>
            <GridItem>
              <Input
                type="text"
                placeholder="Current School"
                {...register("currentSchool")}
              />
            </GridItem>
          </Grid>

          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600" marginTop="2rem">
            Contact Details
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <GridItem>
              <Input
                placeholder="Guardian Phone *"
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
                <Text color="red.500">Phone Number is Required</Text>
              )}
            </GridItem>

            <GridItem>
              <Input
                placeholder="Guardian Phone 2 (Optional)"
                maxLength={10}
                {...register("contactDetails.contactOpt", {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
            </GridItem>

            <GridItem>
              <Input
                placeholder="Guardian Email *"
                {...register("contactDetails.email", {
                  required: "Email is required",
                })}
              />
            </GridItem>

            <GridItem>
              <Input
                placeholder="Social Media"
                {...register("contactDetails.socialMediaHandles.twitter")}
              />
            </GridItem>
          </Grid>

          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600" marginTop="2rem">
            Address
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <GridItem>
              <Input placeholder="Street" {...register("address.street")} />
            </GridItem>
            <GridItem>
              <Input placeholder="City" {...register("address.city")} />
            </GridItem>
            <GridItem>
              <SelectRoot
                collection={statesIndia}
                size="md"
                {...register("address.state")}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select states" />
                </SelectTrigger>
                <SelectContent>
                  {statesIndia.items.map((sta) => (
                    <SelectItem item={sta} key={sta.value}>
                      {sta.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </GridItem>
            <GridItem>
              <Input placeholder="Zipcode" {...register("address.zipCode")} />
            </GridItem>
            <GridItem>
              <Input placeholder="Country" {...register("address.country")} />
            </GridItem>
          </Grid>

          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600" marginTop="2rem">
            Others
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <SelectRoot
                collection={enqSource}
                size="md"
                {...register("enquirySource")}
                width="250px"
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent>
                  {enqSource.items.map((sou) => (
                    <SelectItem item={sou} key={sou.value}>
                      {sou.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </GridItem>

            <GridItem>
              <Textarea
                placeholder="Description"
                {...register("description")}
              />
            </GridItem>

            <GridItem>
              <Stack align="flex-start">
                <Checkbox
                  variant={"outline"}
                  {...register("wantHostelInfo")}
                  value="true"
                >
                  Want Hostel?
                </Checkbox>
                <Checkbox
                  variant={"outline"}
                  {...register("wantTransportInfo")}
                  value="true"
                >
                  Want Transportation?
                </Checkbox>
              </Stack>
            </GridItem>
          </Grid>

          <Button type="submit" colorScheme="green" size="lg" w="full" mt="6">
            {isLoading ? <Spinner /> : ""}
            Submit Enquiry
          </Button>
        </form>
      </Box>
    </Box>
  );
}
