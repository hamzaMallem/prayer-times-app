// نقطة الدخول للتطبيق
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import theme from "./theme.js";
import { ThemeProvider, CssBaseline } from "@mui/material";

// إنشاء جذر التطبيق وربطه مع الثيم
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* إعادة ضبط أنماط CSS حسب MUI */}
      <App  />
    </ThemeProvider>
  </StrictMode>
);