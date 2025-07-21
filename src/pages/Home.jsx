import React from "react";
import { useState, useEffect } from "react";

// استيراد المكونات من مكتبة material ui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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
import { useRef } from "react";

dayjs.locale("ar-ma"); // تعيين اللغة العربية المغربية كلغة افتراضية للتواريخ
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

// const now = dayjs();
// console.log(now.format('YYYY-MM-DD HH:mm:ss')); // طباعة الوقت الحالي في الكونسول
// console.log(dayjs().from(dayjs('2025-08-22'))); // "قبل يوم واحد"

export default function Home() {
  // متغير الحالة لاختيار المدينة من CitySelector.jsx
  const [selectedCity, setSelectedCity] = useState({
    label: "الدار البيضاء",
    value: "Casablanca",
  });
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  // متغيرات الحالة لأوقات الصلاة
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const parayerArray = [
    {
      key: "Fajr",
      displayName: "الفجر",
    },
    {
      key: "Dhuhr",
      displayName: "الظهر",
    },
    {
      key: "Asr",
      displayName: "العصر",
    },
    {
      key: "Maghrib",
      displayName: "المغرب",
    },
    {
      key: "Isha",
      displayName: "العشاء",
    },
  ];
  let prayerdisplayName = parayerArray[nextPrayerIndex].displayName;
  console.log(prayerdisplayName);

  // دالة تغيير المدينة المختارة
  const handleCityChange = (city) => {
    setSelectedCity({
      label: city.label,
      value: city.value,
    });
  };

  //  api متغيرات الحالة لتاريخ اليوم واسم اليوم
  const [dateApi, setDateApi] = useState({
    dayApi: null,
    weekdayApi: null,
  });

  // جلب بيانات أوقات الصلاة والتاريخ من API
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

      const responseDateWeekday = {
        // apiجلب التاريخ واسم اليوم من الاستجابة
        dayApi: resonse.data.data.date.gregorian.date,
        weekdayApi: resonse.data.data.date.hijri.weekday.ar,
      };
      console.log(resonse); // طباعة الاستجابة في الكونسول
      setDateApi({
        // تحديث متغيرات التاريخ واسم اليوم
        dayApi: responseDateWeekday.dayApi,
        weekdayApi: responseDateWeekday.weekdayApi,
      });

      const prayerTimes = resonse.data.data.timings;

      // تحديث متغيرات أوقات الصلاة
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

  // متغيرات الحالة لعرض اليوم والوقت الحالي
  const [timeToday, setTimeToday] = useState("");
  useEffect(() => {
    getData(); // جلب البيانات عند تغيير المدينة
  }, [selectedCity]);

  // useRef new function
  const timingsRef = useRef(timings);
  const [remaining, setRemaining] = useState("");
  // const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  // جلب البيانات وفت الصلوات من الاستجابة عند تغيير المدينة أو عند تغيير اوقات الصلاة
  useEffect(() => {
    timingsRef.current = timings;
  }, [timings]);

  // دالة تحديث الوقت الحالي كل وفت صلاة قادم

  useEffect(() => {
    const timer = setInterval(getTimerPrayer, 1000);
    return () => clearInterval(timer);
  }, [timings]);

  const getTimerPrayer = () => {
    // const now = dayjs("2025-07-21 20:20:20", "YYYY-MM-DD HH:mm:ss");
    const now = dayjs();
    const currentTimings = timingsRef.current;
    setTimeToday(now.format("HH:mm:ss"));

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
    const formatted = `${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    setRemaining(formatted);
  };

  // إعدادات الثيم لمعرفة حجم الشاشة (جهاز صغير أم كبير)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {/* عرض التاريخ واسم المدينة */}
            <Grid size={6}>
              <Typography variant="h6" color="secondary" fontWeight={600}>
                {dateApi.weekdayApi} {" : "}
                {dateApi.dayApi}{" "}
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ letterSpacing: 1, mt: 0.5 }}
                >
                  {timeToday}
                </Typography>
              </Typography>
              <Typography variant="h3" sx={{ color: "secondary.main" }}>
                {selectedCity.label}
              </Typography>
            </Grid>
            {/* معلومات عن الصلاة القادمة */}
            <Grid size={6}>
              <Typography
                variant="h6"
                color="white"
                fontWeight={700}
                sx={{ letterSpacing: 1 }}
              >
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
                }}
              >
                {remaining}
              </Typography>
            </Grid>
            {/* نهاية معلومات الصلاة القادمة */}
          </Grid>

          {/* خط فاصل بين الأقسام */}
          <Divider sx={{ my: 4, borderColor: "secondary.main" }} />
          {/* بطاقات أوقات الصلوات */}
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
          {/* مكون اختيار المدينة */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CitySelector onCityChange={handleCityChange} />
          </div>
          {/* نهاية مكون اختيار المدينة */}
        </CardContent>
      </Card>
    </div>
  );
}
