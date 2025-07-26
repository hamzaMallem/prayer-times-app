// hook لجلب مواقيت الصلاة والتاريخ
import { useState, useEffect } from "react";
import { fetchPrayerTimes } from "../utils/api";

export function usePrayerTimes(city) {
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [dateApi, setDateApi] = useState({
    dayApi: null,
    weekdayApi: null,
  });

  useEffect(() => {
    if (!city) return; // إذا لم يتم تحديد مدينة لا تفعل شيء
    async function getData() {
      const data = await fetchPrayerTimes(city);
      setTimings(data.timings);
      setDateApi({
        dayApi: data.date.gregorian.date,
        weekdayApi: data.date.hijri.weekday.ar,
      });
    }
    getData();
  }, [city]);

  return { timings, dateApi };
}
