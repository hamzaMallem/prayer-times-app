// استيراد React واستخدام المكونات
import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// مكون التطبيق الرئيسي
function App() {
  return (
    <Container
      maxWidth="xl" // أقصى عرض للحاوية
      sx={{
        padding: 0, // بدون تباعد خارجي
        display: "flex", // استخدام الفليكس
        justifyContent: "center", // محاذاة أفقية للوسط
        alignItems: "center", // محاذاة عمودية للوسط
        minHeight: "100vh", // ارتفاع الشاشة بالكامل
        width: "100%",
        bgcolor: "background.default", // لون الخلفية الأساسي من الثيم
        p: 2, // تباعد داخلي
      }}
    >
      {/* استدعاء صفحة الرئيسية */}
      <Home />
    </Container>
  );
}

export default App;