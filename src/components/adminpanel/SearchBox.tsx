import { Button, Group, HStack, Input, Kbd } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";

export const SearchBox = ({ searchObj }: any) => {
    console.log(searchObj)
  return (
    <HStack gap="10" width="md">
      <Group attached>
        <Input
          placeholder="Placeholder"
          value={searchObj.searchedStnName}
          onChange={(e) => {searchObj.setSearchedStnName(e.target.value)}}
        />
        <Button
          variant={"subtle"}
          colorPalette={"green"}
          onClick={() => searchObj.searchedClick()}
        >
          <IoSearch />
        </Button>
      </Group>
    </HStack>
  );
};
