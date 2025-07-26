<<<<<<< HEAD

# 🕌 تطبيق مواقيت الصلاة - Prayer Times App

تطبيق جميل وتفاعلي مبني بتقنية React وواجهة Material UI يعرض أوقات الصلاة اليومية لمدن المغرب مع دعم كامل للغة العربية.

---

## ✨ المميزات - Features

- جلب مواقيت الصلاة مباشرة من [AlAdhan API](https://aladhan.com/prayer-times-api)
- اختيار المدينة وتحديث المواقيت تلقائيًا
- عداد تنازلي للصلاة القادمة
- دعم اللغة العربية والتواريخ المحلية
- تصميم عصري وأنيق باستعمال Material UI

---

## 🖥️ صورة من التطبيق - Screenshot

![App Screenshot](./src/assets/images/img1.png)

---

## 🚀 تقنيات مستخدمة - Tech Stack

- React.js
- Material UI (MUI)
- Axios
- Dayjs

---

## 🛠️ تشغيل المشروع محليًا - Getting Started

1. **انسخ المشروع:**
   ```bash
   git clone https://github.com/hamzaMallem/prayer-times-app.git
   cd prayer-times-app
   ```
   =======

# prayer-times-app

Beautiful React app for displaying Islamic prayer times for Moroccan cities. Uses Material UI, Axios, and AlAdhan API. Responsive, localized, and easy to use.

> > > > > > > c95e194350f26116f0f02d7ff3299b5651aa4266

# Before refacte code =================================================================================>>

<!-- import React, { useState, useEffect, useRef } from "react";

// استيراد المكونات من مكتبة material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayerCard from "../components/PrayerCard";
import CitySelector from "../components/CitySelector";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ar-ma";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

// إعداد dayjs للغة العربية المغربية
dayjs.locale("ar-ma");
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Home() {
// 1. طلب الإذن للإشعارات (يعمل مرة واحدة)
useEffect(() => {
if ("Notification" in window) {
Notification.requestPermission();
}
}, []);

// دالة إرسال الإشعار
const sendNotification = (title, body) => {
if ("Notification" in window && Notification.permission === "granted") {
new Notification(title, { body });
}
};

// حالة لتجنب تكرار الإشعارات لنفس الصلاة
const [notified, setNotified] = useState({
before5min: false,
atTime: false,
});

// حالة لاختيار المدينة
const [selectedCity, setSelectedCity] = useState({
label: "الدار البيضاء",
value: "Casablanca",
});
const [nextPrayerIndex, setNextPrayerIndex] = useState(2);

// أوقات الصلاة
const [timings, setTimings] = useState({
Fajr: "",
Dhuhr: "",
Asr: "",
Maghrib: "",
Isha: "",
});

const parayerArray = [
{ key: "Fajr", displayName: "الفجر" },
{ key: "Dhuhr", displayName: "الظهر" },
{ key: "Asr", displayName: "العصر" },
{ key: "Maghrib", displayName: "المغرب" },
{ key: "Isha", displayName: "العشاء" },
];

// تغيير المدينة
const handleCityChange = (city) => {
setSelectedCity({
label: city.label,
value: city.value,
});
};

// حالة التاريخ واسم اليوم
const [dateApi, setDateApi] = useState({
dayApi: null,
weekdayApi: null,
});

// جلب أوقات الصلاة من API
const getData = async () => {
try {
const resonse = await axios.get(
"http://api.aladhan.com/v1/timingsByCity",
{
params: {
city: selectedCity.value,
country: "Morocco",
method: 5,
},
}
);

      setDateApi({
        dayApi: resonse.data.data.date.gregorian.date,
        weekdayApi: resonse.data.data.date.hijri.weekday.ar,
      });

      const prayerTimes = resonse.data.data.timings;
      setTimings({
        Fajr: prayerTimes.Fajr,
        Dhuhr: prayerTimes.Dhuhr,
        Asr: prayerTimes.Asr,
        Maghrib: prayerTimes.Maghrib,
        Isha: prayerTimes.Isha,
      });
    } catch (error) {
      console.error("حدث خطأ أثناء جلب أوقات الصلاة:", error);
    }

};

// عرض الوقت الحالي
const [timeToday, setTimeToday] = useState("");
useEffect(() => {
getData();
}, [selectedCity]);

// useRef لتخزين أوقات الصلاة الحالية
const timingsRef = useRef(timings);
const [remaining, setRemaining] = useState("");

useEffect(() => {
timingsRef.current = timings;
}, [timings]);

// المؤقت لكل ثانية
useEffect(() => {
const timer = setInterval(getTimerPrayer, 1000);
return () => clearInterval(timer);
// eslint-disable-next-line
}, [timings, nextPrayerIndex, notified]);

// الدالة المسؤولة عن حساب الوقت وإظهار الإشعار
const getTimerPrayer = () => {
const now = dayjs();
setTimeToday(now.format("HH:mm:ss"));

    const currentTimings = timingsRef.current;
    const fajrTime = dayjs(
      now.format("YYYY-MM-DD") + " " + currentTimings["Fajr"],
      "YYYY-MM-DD HH:mm"
    );
    const dhuhrTime = dayjs(
      now.format("YYYY-MM-DD") + " " + currentTimings["Dhuhr"],
      "YYYY-MM-DD HH:mm"
    );
    const asrTime = dayjs(
      now.format("YYYY-MM-DD") + " " + currentTimings["Asr"],
      "YYYY-MM-DD HH:mm"
    );
    const maghribTime = dayjs(
      now.format("YYYY-MM-DD") + " " + currentTimings["Maghrib"],
      "YYYY-MM-DD HH:mm"
    );
    const ishaTime = dayjs(
      now.format("YYYY-MM-DD") + " " + currentTimings["Isha"],
      "YYYY-MM-DD HH:mm"
    );

    let prayerIndex = 0;
    if (now.isAfter(fajrTime) && now.isBefore(dhuhrTime)) prayerIndex = 1;
    else if (now.isAfter(dhuhrTime) && now.isBefore(asrTime)) prayerIndex = 2;
    else if (now.isAfter(asrTime) && now.isBefore(maghribTime)) prayerIndex = 3;
    else if (now.isAfter(maghribTime) && now.isBefore(ishaTime))
      prayerIndex = 4;
    else if (now.isAfter(ishaTime) || now.isBefore(fajrTime)) prayerIndex = 0;

    setNextPrayerIndex(prayerIndex);

    const nextPrayerObject = parayerArray[prayerIndex];
    const nextPrayerTime = currentTimings[nextPrayerObject.key];
    let nextPrayerDateTime = dayjs(
      now.format("YYYY-MM-DD") + " " + nextPrayerTime,
      "YYYY-MM-DD HH:mm"
    );
    if (prayerIndex === 0 && now.isAfter(ishaTime))
      nextPrayerDateTime = nextPrayerDateTime.add(1, "day");

    const remainingMs = nextPrayerDateTime.diff(now);
    const diffInSec = Math.max(0, Math.floor(remainingMs / 1000));
    const hours = Math.floor(diffInSec / 3600);
    const minutes = Math.floor((diffInSec % 3600) / 60);
    const seconds = diffInSec % 60;
    const formatted = `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    setRemaining(formatted);

    // إشعار قبل الصلاة بـ 5 دقائق
    if (diffInSec === 300 && !notified.before5min) {
      sendNotification(
        `الصلاة القادمة: ${nextPrayerObject.displayName}`,
        `باقي 5 دقائق على ${nextPrayerObject.displayName}`
      );
      setNotified((prev) => ({ ...prev, before5min: true }));
    }

    // إشعار عند وقت الصلاة
    if (diffInSec === 0 && !notified.atTime) {
      sendNotification(
        `حان وقت ${nextPrayerObject.displayName}`,
        `قم إلى الصلاة!`
      );
      setNotified((prev) => ({ ...prev, atTime: true }));
    }

    // إعادة ضبط الإشعارات عند الانتقال لصلاة جديدة
    if (diffInSec > 300 && (notified.before5min || notified.atTime)) {
      setNotified({ before5min: false, atTime: false });
    }

};

// معرفة حجم الشاشة
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

return (
<div style={{ width: "100%", padding: "20px" }}>
<Card>
<CardContent>
<Grid container spacing={2}>
{/_ التاريخ واسم المدينة _/}
<Grid item size={6} md={6}>
<Typography variant="h6" color="secondary" fontWeight={600}>
{dateApi.weekdayApi} {" : "}
{dateApi.dayApi}{" "}
<Typography
variant="h5"
color="text.secondary"
sx={{ letterSpacing: 1, mt: 0.5 }} >
{timeToday}
</Typography>
</Typography>
<Typography variant="h3" sx={{ color: "secondary.main" }}>
{selectedCity.label}
</Typography>
</Grid>
{/_ معلومات الصلاة القادمة _/}
<Grid item size={6} md={6}>
<Typography
variant="h6"
color="white"
fontWeight={700}
sx={{ letterSpacing: 1 }} >
الصلاة القادمة:
<span style={{ color: "#fff8c1" }}>
{" "}
{parayerArray[nextPrayerIndex].displayName}
</span>
</Typography>
<Typography
variant="h3"
sx={{
                  color: "#2fc4b2",
                  fontWeight: 800,
                  letterSpacing: 7,
                  textShadow: "0 0 10px #2fc4b260, 0 0 4px #fff3",
                  mt: 1,
                  mb: 2,
                }} >
{remaining}
</Typography>
</Grid>
</Grid>

          {/* خط فاصل */}
          <Divider sx={{ my: 4, borderColor: "secondary.main" }} />
          {/* بطاقات الصلوات */}
          <Stack
            direction={isMobile ? "column" : "row"}
            sx={{
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mt: 4,
            }}
          >
            <PrayerCard
              name="الفجر"
              time={timings.Fajr}
              image="../src/assets/images/img1.png"
            />
            <PrayerCard
              name="الظهر"
              time={timings.Dhuhr}
              image="../src/assets/images/img1.png"
            />
            <PrayerCard
              name="العصر"
              time={timings.Asr}
              image="../src/assets/images/img1.png"
            />
            <PrayerCard
              name="المغرب"
              time={timings.Maghrib}
              image="../src/assets/images/img1.png"
            />
            <PrayerCard
              name="العشاء"
              time={timings.Isha}
              image="../src/assets/images/img1.png"
            />
          </Stack>
          {/* اختيار المدينة */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CitySelector onCityChange={handleCityChange} />
          </div>
        </CardContent>
      </Card>
    </div>

);
} -->
