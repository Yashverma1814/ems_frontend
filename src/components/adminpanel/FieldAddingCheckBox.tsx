import { extraFields } from "@/service/collection";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { Flex } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";

export const FieldAddingCheckBox = ({ extFields }: any) => {
  console.log(
    extFields.addEmail,
    extFields.addState,
    extFields.addGuardianName,
    extFields.addRelation
  );

  return (
    <PopoverRoot positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Add More Fields
        </Button>
      </PopoverTrigger>
      <PopoverContent w="200px">
        <PopoverArrow />
        <PopoverBody bgSize="sm">
          {extraFields.map((field) => {
            return (
              <Flex key={field.value}>
                <Checkbox
                  variant="outline"
                  checked={extFields[field.value]}
                  onCheckedChange={(e) => extFields[field.fn](!!e.checked)}
                >
                  {" "}
                  {field.label}
                </Checkbox>
              </Flex>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
