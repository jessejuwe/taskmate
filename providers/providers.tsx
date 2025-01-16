"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "@/app/get-query-client";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { TaskProvider } from "@/contexts/task-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <ChakraProvider>
          <Toaster />
          {children}
        </ChakraProvider>
      </TaskProvider>
    </QueryClientProvider>
  );
}
