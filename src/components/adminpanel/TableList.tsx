import { Enquiry } from "@/app/adminpanel/enquiries/page";
import { BaseUrl, BaseUrlfe } from "@/service/apis";
import { Box, Button, Center, Spinner, Table } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { toaster, Toaster } from "../ui/toaster";
import moment from "moment";

export const TableList = ({
  enqList,
  queryKey,
  extFields,
}: {
  enqList: Enquiry[];
  queryKey: any;
  extFields: any;
}) => {
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

  const { isLoading } = deleteMutation;

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Table.ScrollArea borderWidth="1px">
      <Table.Root size="sm" variant="outline">
        <Toaster />
        <Table.Header>
          <Table.Row>
            {extFields.addStnName?<Table.ColumnHeader textAlign={"center"}>
              Student Name
            </Table.ColumnHeader>:""}
            {extFields.addGrade?<Table.ColumnHeader textAlign={"center"}>Grade</Table.ColumnHeader>:""}
            
            {extFields.addGuardianContact?<Table.ColumnHeader textAlign={"center"}>
              Guardian Contact
            </Table.ColumnHeader>:""}
            {extFields.addSource?<Table.ColumnHeader textAlign={"center"}>
              Enquiry Source
            </Table.ColumnHeader>:""}
            {extFields.addEmail ? (
              <Table.ColumnHeader textAlign={"center"}>
                Email
              </Table.ColumnHeader>
            ) : (
              ""
            )}
            {extFields.addState ? (
              <Table.ColumnHeader textAlign={"center"}>
                State
              </Table.ColumnHeader>
            ) : (
              ""
            )}
            {extFields.addGuardianName ? (
              <Table.ColumnHeader textAlign={"center"}>
                Guardian Name
              </Table.ColumnHeader>
            ) : (
              ""
            )}
            {extFields.addRelation ? (
              <Table.ColumnHeader textAlign={"center"}>
                Relation
              </Table.ColumnHeader>
            ) : (
              ""
            )}
            {extFields.addAsked?<Table.ColumnHeader textAlign={"center"}>Asked</Table.ColumnHeader>:""}
            <Table.ColumnHeader colSpan={2} textAlign={"center"}>
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {enqList.map((enquiry: Enquiry) => (
            <Table.Row key={enquiry._id}>
              {extFields.addStnName?<Table.Cell textAlign={"center"}>
                {enquiry.studentName}
              </Table.Cell>:""}
              {extFields.addGrade?<Table.Cell textAlign={"center"}>{enquiry.grade}</Table.Cell>:""}
              {extFields.addGuardianContact?<Table.Cell textAlign={"center"}>
                {enquiry.contactDetails.contactMain || ""}
              </Table.Cell>:""}
              {extFields.addSource?<Table.Cell textAlign={"center"}>
                {enquiry.enquirySource}
              </Table.Cell>:""}
              {extFields.addEmail ? (
                <Table.Cell textAlign={"center"}>
                  {enquiry.contactDetails.email}
                </Table.Cell>
              ) : (
                ""
              )}
              {extFields.addState ? (
                <Table.Cell textAlign={"center"}>
                  {enquiry.address.state}
                </Table.Cell>
              ) : (
                ""
              )}
              {extFields.addGuardianName ? (
                <Table.Cell textAlign={"center"}>
                  {enquiry.guardianName}
                </Table.Cell>
              ) : (
                ""
              )}
              {extFields.addRelation ? (
                <Table.Cell textAlign={"center"}>
                  {enquiry.relation}
                </Table.Cell>
              ) : (
                ""
              )}
              {extFields.addAsked?<Table.Cell textAlign={"center"}>
                {moment(enquiry.createdAt).fromNow()}
              </Table.Cell>:""}
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
