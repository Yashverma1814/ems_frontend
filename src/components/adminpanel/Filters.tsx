import { source, states } from "@/service/collection";
import { IoFilterOutline } from "react-icons/io5";
import { SearchBox } from "./SearchBox";
import {
  Button,
  ButtonProps,
  DrawerActionTrigger,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Text,
} from "@chakra-ui/react";

type FilterProps = {
  filterObj: any;
};

export const Filters = ({ filterObj }: FilterProps) => {
  const handleApply: ButtonProps["onClick"] = (e) => {
    filterObj.setPage(1);
    filterObj.setAppliedClick(filterObj.appliedClick + 1);
  };

  const searchObj = {
    searchedStnName: filterObj.searchedStnName,
    setSearchedStnName: filterObj.setSearchedStnName,
    searchedClick: filterObj.searchedClick,
  };
  return (
    <DrawerRoot
      open={filterObj.open}
      onOpenChange={(e) => filterObj.setOpen(e.open)}
      placement={"start"}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <IoFilterOutline />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        style={{
          position: "fixed",
          height: "80vh",
        }}
      >
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="5" width="250px" height={100}>
            <Text fontWeight={"medium"}>Search Student Name</Text>
            <SearchBox searchObj={searchObj} />
          </Stack>

          <Stack gap="5" width="250px" height={100}>
            <SelectRoot
              collection={states}
              onValueChange={(e) => filterObj.setStnState(e.value.toString())}
            >
              <SelectLabel>Select State</SelectLabel>
              <SelectTrigger>
                <SelectValueText
                  placeholder={`${filterObj.stnState || "Select"}`}
                />
              </SelectTrigger>
              <SelectContent>
                {states.items.map((s) => (
                  <SelectItem item={s} key={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Stack>

          <Stack gap="5" width="250px" height={100}>
            <SelectRoot
              collection={source}
              onValueChange={(e) => filterObj.setEnqSource(e.value.toString())}
            >
              <SelectLabel>Select Enquiry Source</SelectLabel>
              <SelectTrigger>
                <SelectValueText
                  placeholder={`${filterObj.enqSource || "Select"}`}
                />
              </SelectTrigger>
              <SelectContent>
                {source.items.map((s) => (
                  <SelectItem item={s} key={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={filterObj.handleClearFilter}>
            Clear Filter
          </Button>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <DrawerActionTrigger asChild>
            <Button onClick={handleApply}>Apply</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
