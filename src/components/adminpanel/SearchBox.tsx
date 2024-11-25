import { Group, HStack, Input} from "@chakra-ui/react";

export const SearchBox = ({ searchObj }: any) => {
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
