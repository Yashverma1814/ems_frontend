import { HStack } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { GrPowerReset } from "react-icons/gr";

export const FieldResetButton = ({ extFields }: any) => {
  const handleReset = () => {
    extFields.setAddEmail(false)
    extFields.setAddState(false)
    extFields.setAddGuardianName(false)
    extFields.setAddRelation(false)
    extFields.setAddStnName(true)
    extFields.setAddGrade(true)
    extFields.setAddGuadianContact(true)
    extFields.setAddSource(true)
    extFields.setAddAsked(true)
  }
  return (
    <HStack>
      <Button colorPalette="yellow" variant="outline" size="sm" marginBottom="10px" onClick={()=>handleReset()}>
        <GrPowerReset />Reset
      </Button>
    </HStack>
  )
}
