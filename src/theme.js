// إعداد وتخصيص ثيم MUI مع دعم اللغة العربية والاتجاه من اليمين لليسار
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl", // اتجاه الكتابة من اليمين لليسار
  palette: {
    primary: {
      main: "#7b6a58", // لون أساسي للخلفية
    },
    secondary: {
      main: "#FFB74D", // لون ثانوي للأزرار والعناوين
    },
    accent: {
      main: "#26A69A", // لون تمييزي للأيقونات والعناصر التفاعلية
    },
    background: {
      default: "#242424", // لون خلفية أساسي
      paper: "#1C1C1C", // خلفية الورق
      cardBg: "#b5b5b5", // خلفية الكروت الثانوية
    },
    text: {
      primary: {
        main: "#FFFFFF", // لون النص الأساسي
        contrastText: "#000000", // لون النص المتباين
      },
      secondary: {
        main: "#000000", // لون نص ثانوي
      },
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans Arabic", sans-serif', // الخط الافتراضي
    h1: { fontSize: "2.5rem", fontWeight: 700 }, // إعدادات العنوان الرئيسي
    h2: { fontSize: "2rem", fontWeight: 600 },  // إعدادات العنوان الفرعي
    h5: { fontSize: "1.5rem", fontWeight: 600 }, // إعدادات عنوان صغير
    body1: { fontSize: "1rem" }, // إعدادات النص الأساسي
  },
});
export default theme;