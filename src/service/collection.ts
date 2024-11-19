import { createListCollection } from "@chakra-ui/react";

export const noOfLimit = createListCollection({
  items: [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
  ],
});

export const states = createListCollection({
  items: [
    { label: "Delhi", value: "delhi" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Banglore", value: "banglore" },
    { label: "Kerala", value: "kerala" },
  ],
});

export const source = createListCollection({
  items: [
    { label: "Website", value: "website" },
    { label: "School Fair", value: "school_fair" },
    { label: "Referral", value: "referral" },
    { label: "Other", value: "other" },
  ],
});
