import { Group, HStack, Input, Kbd } from "@chakra-ui/react";

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
      </Group>
    </HStack>
  );
};
