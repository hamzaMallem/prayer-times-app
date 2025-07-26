import React from "react";
import Typography from "@mui/material/Typography";

// مكون عداد تنازلي بسيط
// props:
// - remaining: النص الجاهز للوقت المتبقي (مثال: "01 : 04 : 35")
// - nextPrayerName: اسم الصلاة القادمة (اختياري)
export default function CountdownTimer({ remaining, nextPrayerName }) {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      {/* اسم الصلاة القادمة */}
      {nextPrayerName && (
        <Typography variant="h6" color="primary" fontWeight={600}>
          {`الصلاة القادمة: ${nextPrayerName}`}
        </Typography>
      )}

      {/* الوقت المتبقي */}
      <Typography
        variant="h2"
        sx={{
          color: "#2fc4b2",
          fontWeight: 800,
          letterSpacing: 7,
          textShadow: "0 0 10px #2fc4b260, 0 0 4px #fff3",
        }}
      >
        {remaining}
      </Typography>
    </div>
  );
}
