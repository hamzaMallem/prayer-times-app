import dayjs from "dayjs";

// دالة تحديد الصلاة القادمة حسب الوقت الحالي
export function getNextPrayerIndex(now, timings) {
  const fajrTime = dayjs(`${now.format("YYYY-MM-DD")} ${timings.Fajr}`, "YYYY-MM-DD HH:mm");
  const dhuhrTime = dayjs(`${now.format("YYYY-MM-DD")} ${timings.Dhuhr}`, "YYYY-MM-DD HH:mm");
  const asrTime = dayjs(`${now.format("YYYY-MM-DD")} ${timings.Asr}`, "YYYY-MM-DD HH:mm");
  const maghribTime = dayjs(`${now.format("YYYY-MM-DD")} ${timings.Maghrib}`, "YYYY-MM-DD HH:mm");
  const ishaTime = dayjs(`${now.format("YYYY-MM-DD")} ${timings.Isha}`, "YYYY-MM-DD HH:mm");

  if (now.isAfter(fajrTime) && now.isBefore(dhuhrTime)) return 1;
  if (now.isAfter(dhuhrTime) && now.isBefore(asrTime)) return 2;
  if (now.isAfter(asrTime) && now.isBefore(maghribTime)) return 3;
  if (now.isAfter(maghribTime) && now.isBefore(ishaTime)) return 4;
  return 0; // إما قبل الفجر أو بعد العشاء
}

// دالة حساب الوقت المتبقي للصلاة القادمة
export function getTimeRemaining(now, nextPrayerTime) {
  let nextPrayerDateTime = dayjs(`${now.format("YYYY-MM-DD")} ${nextPrayerTime}`, "YYYY-MM-DD HH:mm");
  if (now.isAfter(nextPrayerDateTime)) {
    nextPrayerDateTime = nextPrayerDateTime.add(1, "day");
  }
  const remainingMs = nextPrayerDateTime.diff(now);
  const diffInSec = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(diffInSec / 3600);
  const minutes = Math.floor((diffInSec % 3600) / 60);
  const seconds = diffInSec % 60;
  return {
    totalSeconds: diffInSec,
    formatted: `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
  };
}
