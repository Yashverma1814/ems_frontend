import { Enquiry } from "@/app/adminpanel/enquiries/page";
import { BaseUrlfe } from "@/service/apis";
import { Button, Table } from "@chakra-ui/react";
import Link from "next/link";

export const TableList = ({ enqList }: any) => {
  return (
    <Table.ScrollArea borderWidth="1px">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Student Name</Table.ColumnHeader>
            <Table.ColumnHeader>Grade</Table.ColumnHeader>
            <Table.ColumnHeader>Guardian Contact</Table.ColumnHeader>
            <Table.ColumnHeader>Enquiry Source</Table.ColumnHeader>
            <Table.ColumnHeader>Details</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {enqList.map((enquiry: Enquiry) => (
            <Table.Row key={enquiry._id}>
              <Table.Cell>{enquiry.studentName}</Table.Cell>
              <Table.Cell>{enquiry.grade}</Table.Cell>
              <Table.Cell>{enquiry.contactDetails.contactMain}</Table.Cell>
              <Table.Cell>{enquiry.enquirySource}</Table.Cell>
              <Table.Cell>
                <Link href={`${BaseUrlfe}/adminpanel/enquiries/${enquiry._id}`}>
                <Button variant={"subtle"} colorPalette="green">
                  View More
                </Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};


