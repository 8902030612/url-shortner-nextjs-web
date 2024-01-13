// app/providers.tsx
"use client";

import queryClient from "@/services/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "react-query";




export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextUIProvider>
  );
}
