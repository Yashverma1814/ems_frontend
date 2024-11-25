import moment from "moment";
import { Box, Flex, Heading, Stack, Text, Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const AddRemark = ({ addRemarkObj }: any) => {
  const handleAddRemark = () => {
    addRemarkObj.onSubmit({
      message: addRemarkObj.message,
      addedBy: addRemarkObj.username,
    });
    addRemarkObj.setMessage("");
  };
  return (
    <>
      <Box
        p={6}
        borderWidth={1}
        borderRadius="lg"
        height="500px"
        bg="gray.50"
        boxShadow="md"
        overflowY="auto"
      >
        <Text>
          <strong>Remarks:</strong>{" "}
        </Text>
        {addRemarkObj.data.remark.map((remark: any) => (
          <Box
            key={remark._id}
            p={4}
            mb={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Heading as="h4" size="sm" color="gray.700">
                {remark.addedBy}
              </Heading>
              <Text>{moment(remark.date).fromNow()}</Text>
            </Flex>
            <Text>{remark.message}</Text>
          </Box>
        ))}
      </Box>

      <DrawerRoot size={"lg"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="lg">
            Add remark
          </Button>
        </DrawerTrigger>
        <DrawerContent
          offset="20"
          rounded="md"
          style={{
            transform: "translate(-50%,0)",
          }}
        >
          <DrawerHeader>
            <DrawerTitle>Add Your Remark here</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Stack gap="4">
              <Text>
                <Textarea
                  placeholder="Start typing your Remark..."
                  value={addRemarkObj.message}
                  onChange={(e) => addRemarkObj.setMessage(e.target.value)}
                />
              </Text>
            </Stack>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <DrawerActionTrigger asChild>
              <Button onClick={() => handleAddRemark()}>Add</Button>
            </DrawerActionTrigger>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};
