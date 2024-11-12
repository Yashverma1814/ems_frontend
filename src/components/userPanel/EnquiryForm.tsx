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
} from "@chakra-ui/react";

type EnquiryFormData = {
  studentName: string;
  guardianName: string;
  relation: string;
  dateOfBirth: string;
  grade: string;
  currentSchool: string;
  contactDetails: {
    contactMain: string;
    contactOpt: string;
    email: string;
    socialMediaHandles: { twitter: string };
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  enquirySource: string;
  description: string;
  wantHostelInfo: boolean;
  wantTransportInfo: boolean;
};

export default function EnquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryFormData>();

  const onSubmit = async (data: EnquiryFormData) => {
    try {
      await axios.post(
        "https://enquiry-mgmt-backend.onrender.com/enquiries",
        data
      );
      alert("Enquiry submitted successfully.");
    } catch {
      alert("Failed to submit enquiry.");
    }
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
          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600">
            Student Information
          </Heading>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
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
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0", 
                  backgroundColor: "white",
                  color: "#2D3748", 
                  fontSize: "16px",
                  lineHeight: "1.5",
                  outline: "none",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.2s ease-in-out",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #319795")
                }
                {...register("relation", { required: "Relation is required" })}
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

              {errors.relation && (
                <Text color="red.500">{errors.relation.message}</Text>
              )}
            </GridItem>

            <GridItem>
              <select
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0", 
                  backgroundColor: "white",
                  color: "#2D3748", 
                  fontSize: "16px",
                  lineHeight: "1.5",
                  outline: "none",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.2s ease-in-out",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #319795")
                }
                {...register("grade", { required: "Grade is required" })}
              >
                <option value="">Grade</option>
                <option value="first class">GRADE 1</option>
              </select>
              {errors.grade && (
                <Text color="red.500">{errors.grade.message}</Text>
              )}
            </GridItem>

            <GridItem>
              <Input
                type="date"
                placeholder="Date of Birth"
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
              {errors.dateOfBirth && (
                <Text color="red.500">{errors.dateOfBirth.message}</Text>
              )}
            </GridItem>
          </Grid>

          <br />
          <br />
          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600">
            Contact Details
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <GridItem>
              <Input
                placeholder="Guardian Phone"
                {...register("contactDetails.contactMain")}
              />
            </GridItem>

            <GridItem>
              <Input
                placeholder="Guardian Phone 2 (Optional)"
                {...register("contactDetails.contactOpt")}
              />
            </GridItem>

            <GridItem>
              <Input
                placeholder="Guardian Email"
                {...register("contactDetails.email")}
              />
            </GridItem>

            <GridItem>
              <Input
                placeholder="Social Media"
                {...register("contactDetails.socialMediaHandles.twitter")}
              />
            </GridItem>
          </Grid>

          <br />
          <br />
          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600">
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
              <select
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0", // Light gray border
                  backgroundColor: "white",
                  color: "#2D3748", // Dark gray text color
                  fontSize: "16px",
                  lineHeight: "1.5",
                  outline: "none",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.2s ease-in-out",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #319795")
                }
                {...register("address.state")}
              >
                <option value="">Select State</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="delhi">Delhi</option>
                <option value="kerala">Kerala</option>
                <option value="karnataka">Karnataka</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </GridItem>
            <GridItem>
              <Input placeholder="Zipcode" {...register("address.zipcode")} />
            </GridItem>
            <GridItem>
              <Input placeholder="Country" {...register("address.country")} />
            </GridItem>
          </Grid>

          <br />
          <br />
          <Heading mb="6" as="h1" size="lg" textAlign="left" color="teal.600">
            Others
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <select
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "white",
                  color: "#2D3748",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  outline: "none",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.2s ease-in-out",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 0 2px #319795")
                }
                {...register("enquirySource")}
              >
                <option value="">Enquiry Source</option>
                <option value="website">Website</option>
                <option value="school_fair">School Fair</option>
                <option value="referral">referral</option>
                <option value="other">other</option>
              </select>
            </GridItem>

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
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#2D3748",
                  gap: "8px",
                }}
              >
                <input
                  type="checkbox"
                  {...register("wantHostelInfo")}
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
                  onChange={(e) =>
                    (e.target.style.backgroundColor = e.target.checked
                      ? "#319795"
                      : "white")
                  }
                />
                Want Hostel?
              </label>
            </GridItem>
            <GridItem>
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
                  {...register("wantTransportInfo")}
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
                  onChange={(e) =>
                    (e.target.style.backgroundColor = e.target.checked
                      ? "#319795"
                      : "white")
                  }
                />
                Want Transport?
              </label>
            </GridItem>
          </Grid>

          <Button type="submit" colorScheme="green" size="lg" w="full" mt="6">
            Submit Enquiry
          </Button>
        </form>
      </Box>
    </Box>
  );
}
