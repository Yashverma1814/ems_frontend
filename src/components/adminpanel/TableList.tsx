import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { BaseUrl } from "@/service/apis";
import { useMutation, useQueryClient } from "react-query";
import { toaster, Toaster } from "../ui/toaster";
import { MdOutlineDoneOutline } from "react-icons/md";
import { Enquiry } from "@/app/adminpanel/enquiries/page";
import { TbSortAscending2, TbSortAscendingLetters, TbSortDescendingLetters } from "react-icons/tb";
import { TbSortDescending2 } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";


import {
  Button,
  Center,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  Spinner,
  Table,
} from "@chakra-ui/react";


export const TableList = ({
  enqList,
  sortingObj,
  queryKey,
  extFields,
}: {
  enqList: Enquiry[];
  sortingObj:any;
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


  const handleCreatedSorting = () =>{
    if(sortingObj.sortingOrder==""){
      sortingObj.setSortingOrder("desc")
    }
    if(sortingObj.sortingOrder=="asc"){
      sortingObj.setSortingOrder("desc")
      sortingObj.setNameSortOrder("")
    }
    else if(sortingObj.sortingOrder=="desc"){
      sortingObj.setSortingOrder("asc")
      sortingObj.setNameSortOrder("")
    }
  }

  const handleNameSorting = () =>{
    if(sortingObj.nameSortOrder==""){
      sortingObj.setNameSortOrder("asc")
    }
    if(sortingObj.nameSortOrder=="asc"){
      sortingObj.setNameSortOrder("desc")
      sortingObj.setSortingOrder("")
    }
    else if(sortingObj.nameSortOrder=="desc"){
      sortingObj.setNameSortOrder("asc")
      sortingObj.setSortingOrder("")
    }
  }


  const router = useRouter();

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
            {extFields.addStnName ? (
              <Table.ColumnHeader textAlign={"center"}>
                Student Name<button onClick={handleNameSorting}>{sortingObj.nameSortOrder=="asc"?<TbSortAscendingLetters />: sortingObj.nameSortOrder=="desc" ?<TbSortDescendingLetters />:<TbSortAscendingLetters />}</button>  
              </Table.ColumnHeader>
            ) : (
              ""
            )}
            {extFields.addGrade ? (
              <Table.ColumnHeader textAlign={"center"}>
                Grade
              </Table.ColumnHeader>
            ) : (
              ""
            )}

            {extFields.addGuardianContact ? (
              <Table.ColumnHeader textAlign={"center"}>
                Guardian Contact
              </Table.ColumnHeader>
            ) : (
              ""
            )}
            {extFields.addSource ? (
              <Table.ColumnHeader textAlign={"center"}>
                Enquiry Source
              </Table.ColumnHeader>
            ) : (
              ""
            )}
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
            {extFields.addAsked ? (
              <Table.ColumnHeader textAlign={"center"}>
                Created <button onClick={handleCreatedSorting}>{sortingObj.sortingOrder=="asc"?<TbSortAscending2 />: sortingObj.sortingOrder=="desc" ?<TbSortDescending2 />:<TbSortDescending2 />}</button>
              </Table.ColumnHeader>
            ) : (
              ""
            )}
            <Table.ColumnHeader colSpan={2} textAlign={"center"}>
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {enqList.map((enquiry: Enquiry) => (
            <Table.Row
              key={enquiry._id}
              onClick={() => router.push(`enquiries/${enquiry._id}`)}
            >
              {extFields.addStnName ? (
                <Table.Cell textAlign={"center"}>
                  {enquiry.studentName}
                </Table.Cell>
              ) : (
                ""
              )}
              {extFields.addGrade ? (
                <Table.Cell textAlign={"center"}>{enquiry.grade}</Table.Cell>
              ) : (
                ""
              )}
              {extFields.addGuardianContact ? (
                <Table.Cell textAlign={"center"}>
                  {enquiry.contactDetails.contactMain || ""}
                </Table.Cell>
              ) : (
                ""
              )}
              {extFields.addSource ? (
                <Table.Cell textAlign={"center"}>
                  {enquiry.enquirySource}
                </Table.Cell>
              ) : (
                ""
              )}
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
                <Table.Cell textAlign={"center"}>{enquiry.relation}</Table.Cell>
              ) : (
                ""
              )}
              {extFields.addAsked ? (
                <Table.Cell textAlign={"center"}>
                  {moment(enquiry.createdAt).fromNow()}
                </Table.Cell>
              ) : (
                ""
              )}

              <Table.Cell textAlign={"center"} width={"5px"}>
                {/*  */}
                <PopoverRoot positioning={{ sameWidth: true }}>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant={"subtle"}
                      colorPalette="red"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MdDeleteSweep />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent width="auto">
                    <PopoverArrow />
                    <PopoverBody>
                      <Button
                        variant="surface"
                        colorPalette="green"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMutation.mutate(enquiry._id);
                        }}
                      >
                        Confirm <MdOutlineDoneOutline/>
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </PopoverRoot>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};
