import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AdminRouter from "./router/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AdminRouter />
    </QueryClientProvider>
  </StrictMode>
);
