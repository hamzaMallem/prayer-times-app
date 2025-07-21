import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

// مكون بطاقة الصلاة يعرض اسم الصلاة ووقتها وصورة
export default function PrayerCard({ name, time, image }) {
  return (
    <>
      <Card
        sx={{
          width: { xs: "100%", sm: "160px" },
          backgroundColor: "background.cardBg", // لون خلفية البطاقة
          borderRadius: 2, // تدوير الحواف
          boxShadow: 9, // ظل البطاقة
          "&:hover": {
            boxShadow: 20, // ظل أكبر عند المرور
          },
        }}
      >
        <CardActionArea>
          {/* صورة الصلاة */}
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="green iguana"
          />
          <CardContent sx={{ minHeight: 200 }}>
            {/* اسم الصلاة */}
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "text.primary.contrastText" }}
            >
              {name}
            </Typography>
            {/* وقت الصلاة */}
            <Typography
              variant="h1"
              sx={{
                color: "text.secondary.main",
                mt: 6,
              }}
            >
              {time}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}