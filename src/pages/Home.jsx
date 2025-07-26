import React, { useState, useEffect } from "react";
// استيراد مكونات الواجهة
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayerCard from "../components/PrayerCard";
import CitySelector from "../components/CitySelector";
import CountdownTimer from "../components/CountdownTimer";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// استيراد الـ hooks والدوال المنطقية
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { useNotification } from "../hooks/useNotification";
import { getNextPrayerIndex, getTimeRemaining } from "../utils/prayerLogic";

// مكتبة اليوميات dayjs لإدارة التواريخ
import dayjs from "dayjs";
import "dayjs/locale/ar-ma";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ar-ma");
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Home() {
  // حالة المدينة المختارة، الافتراضي "الدار البيضاء"
  const [selectedCity, setSelectedCity] = useState({
    label: " سيدي سليمان",
    value: "Sidi Slimane",
  });

  // جلب مواقيت الصلاة والتاريخ مباشرة عبر الـhook
  const { timings, dateApi } = usePrayerTimes(selectedCity.value);

  // جلب دالة الإشعارات عبر الـhook
  const sendNotification = useNotification();

  // حالات التحكم في الإشعارات حتى لا تتكرر
  const [notified, setNotified] = useState({
    before5min: false,
    atTime: false,
  });

  // تخزين معلومات عن الصلاة القادمة والمؤقت
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [remaining, setRemaining] = useState(""); // الوقت المتبقي
  const [timeToday, setTimeToday] = useState(""); // الوقت الحالي

  // مصفوفة الصلوات مرتبة حسب اليوم
  const parayerArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  // عند تغيير المدينة يتم ضبط المدينة المختارة وإعادة ضبط الإشعارات
  const handleCityChange = (city) => {
    setSelectedCity({ label: city.label, value: city.value });
    setNotified({ before5min: false, atTime: false }); // إعادة تعيين حالة الإشعار
  };

  // المؤقت الرئيسي لتحديث العد التنازلي والإشعارات كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs(); // الوقت الحالي
      setTimeToday(now.format("HH:mm:ss"));

      // معرفة أي صلاة قادمة الآن
      const index = getNextPrayerIndex(now, timings);
      setNextPrayerIndex(index);

      // حساب الوقت المتبقي للصلاة القادمة
      const nextPrayerObject = parayerArray[index];
      const { formatted, totalSeconds } = getTimeRemaining(
        now,
        timings[nextPrayerObject.key]
      );
      setRemaining(formatted);

      // إذا تبقى 5 دقائق فقط للصلاة ولم يُرسل إشعار بعد
      if (totalSeconds === 300 && !notified.before5min) {
        sendNotification(
          `الصلاة القادمة: ${nextPrayerObject.displayName}`,
          `باقي 5 دقائق على ${nextPrayerObject.displayName}`
        );
        setNotified((prev) => ({ ...prev, before5min: true }));
      }

      // إذا حان وقت الصلاة ولم يُرسل إشعار بعد
      if (totalSeconds === 0 && !notified.atTime) {
        sendNotification(
          `حان وقت ${nextPrayerObject.displayName}`,
          `قم إلى الصلاة!`
        );
        setNotified((prev) => ({ ...prev, atTime: true }));
      }

      // إذا أصبح الوقت المتبقي أكثر من 5 دقائق، أعِد ضبط حالة الإشعار (للصلاة التالية)
      if (totalSeconds > 300 && (notified.before5min || notified.atTime)) {
        setNotified({ before5min: false, atTime: false });
      }
    }, 1000);

    // تنظيف المؤقت عند مغادرة الصفحة أو تغيير الدوال
    return () => clearInterval(timer);
  }, [timings, notified, parayerArray, sendNotification]);

  // معرفة إذا كان الجهاز موبايل لتغيير اتجاه البطاقات
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // واجهة المستخدم
  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {/* عرض التاريخ واسم المدينة */}
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
                <CountdownTimer
                  remaining={remaining}
                  nextPrayerName={parayerArray[nextPrayerIndex].displayName}
                />
              </Typography>
              {/* <Typography
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
              </Typography> */}
            </Grid>
          </Grid>

          {/* خط فاصل بين الأقسام */}
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
              image="../../public/subh.jpeg"
            />
            <PrayerCard
              name="الظهر"
              time={timings.Dhuhr}
              image="../../public/dhur.jpeg"
            />
            <PrayerCard
              name="العصر"
              time={timings.Asr}
              image="../../public/asr.jpeg"
            />
            <PrayerCard
              name="المغرب"
              time={timings.Maghrib}
              image="../../public/maghreb.png"
            />
            <PrayerCard
              name="العشاء"
              time={timings.Isha}
              image="../../public/isha.png"
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
        </CardContent>
      </Card>
    </div>
  );
}
