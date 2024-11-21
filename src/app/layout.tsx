// app/layout.tsx 

"use client"
import Navbar from "@/components/adminpanel/Navbar";
import { ChakraProvider, defaultSystem, Toaster } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider value={defaultSystem}>
            {children}
          </ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
