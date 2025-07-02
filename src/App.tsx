import { BrowserRouter } from "react-router-dom";
import { Router } from "@/router/index";
import { AuthGuard } from "@/guard/AuthGuard";
import "@/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthGuard />
      <Router />
    </BrowserRouter>
  );
}
