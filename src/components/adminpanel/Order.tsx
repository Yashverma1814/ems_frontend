"use client"

import { Tabs } from "@chakra-ui/react"

export const Order= ({orderObj}:any) => {

  return (
    <Tabs.Root variant="enclosed" value={orderObj.sortingOrder} onValueChange={(e) => orderObj.setSortingOrder(e.value)}>
      <Tabs.List>
        <Tabs.Trigger value="asc">Ascending</Tabs.Trigger>
        <Tabs.Trigger value="desc">Descending</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  )
}
