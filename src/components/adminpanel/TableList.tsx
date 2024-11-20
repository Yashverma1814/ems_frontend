import { Enquiry } from "@/app/adminpanel/enquiries/page";
import { BaseUrl, BaseUrlfe } from "@/service/apis";
import { Button, Center, Spinner, Table } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { toaster, Toaster } from "../ui/toaster";

export const TableList = ({ enqList, queryKey }: { enqList: Enquiry[]; queryKey: any }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (id: string) => axios.delete(`${BaseUrl}/enquiries/${id}`),
    {
      onSuccess: () => {
        toaster.create({
          title: "Enquiry deleted successfully.",
          type: "success",
        });

        queryClient.invalidateQueries(queryKey);
      },
      onError: (err) => {
        toaster.create({
          title: "Failed to delete enquiry.",
          type: "error",
        });
      },
    }
  );

  const {isLoading} = deleteMutation

  if(isLoading){
    return(
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Table.ScrollArea borderWidth="1px">
      <Table.Root size="sm" variant="outline">
        <Toaster />
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign={"center"}>Student Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Grade</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Guardian Contact</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Enquiry Source</Table.ColumnHeader>
            <Table.ColumnHeader colSpan={2} textAlign={"center"}>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {enqList.map((enquiry: Enquiry) => (
            <Table.Row key={enquiry._id}>
              <Table.Cell textAlign={"center"}>{enquiry.studentName}</Table.Cell>
              <Table.Cell textAlign={"center"}>{enquiry.grade}</Table.Cell>
              <Table.Cell textAlign={"center"}>
                {enquiry.contactDetails.contactMain || ""}
              </Table.Cell>
              <Table.Cell textAlign={"center"}>{enquiry.enquirySource}</Table.Cell>
              <Table.Cell textAlign={"center"} width={"5px"}>
                <Link href={`${BaseUrlfe}/adminpanel/enquiries/${enquiry._id}`}>
                  <Button variant={"subtle"} colorPalette="green">
                    View More
                  </Button>
                </Link>
              </Table.Cell>
              <Table.Cell textAlign={"center"} width={"5px"}>
                <Button
                  variant={"subtle"}
                  colorPalette="red"
                  onClick={() => deleteMutation.mutate(enquiry._id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};
