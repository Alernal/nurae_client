import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./index.css";
import App from "@/App";

import { Buffer } from "buffer";
window.Buffer = Buffer;

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="bottom-right" />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
