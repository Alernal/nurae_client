import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter } from "react-router-dom";
import { Router } from "@/router";
import { AuthGuard } from "./guard/AuthGuard";
import "@/App.css";
export default function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(AuthGuard, {}), _jsx(Router, {})] }));
}
