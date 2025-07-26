// دالة جلب مواقيت الصلاة من API
import axios from "axios";

export async function fetchPrayerTimes(city) {
  const res = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
    params: { city, country: "Morocco", method: 5 },
  });
  return res.data.data;
}
