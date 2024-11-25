import { HStack } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { RiArrowRightLine, RiMailLine } from "react-icons/ri"

const Demo = () => {
  return (
    <HStack>
      <Button colorPalette="teal" variant="solid">
        <RiMailLine /> Email
      </Button>
    </HStack>
  )
}
