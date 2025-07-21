import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// مكون اختيار المدينة
export default function CitySelector({ onCityChange }) {
  const [cityEn, setCityEn] = React.useState(""); // متغير الحالة للمدينة

  // قائمة المدن المغربية مع الاسم بالعربية والإنجليزية
  const moroccanCities = [
    { label: "الدار البيضاء", value: "Casablanca" },
    { label: "الرباط", value: "Rabat" },
    { label: "فاس", value: "Fes" },
    { label: "مراكش", value: "Marrakech" },
    { label: "طنجة", value: "Tangier" },
    { label: "أكادير", value: "Agadir" },
    { label: "مكناس", value: "Meknes" },
    { label: "وجدة", value: "Oujda" },
    { label: "تطوان", value: "Tetouan" },
    { label: "سيدي سليمان", value: "Sidi Slimane" },
    { label: "المحمدية", value: "Mohammedia" },
    { label: "بني ملال", value: "Beni Mellal" },
    { label: "القنيطرة", value: "Kenitra" },
    { label: "آسفي", value: "Safi" },
    { label: "الخميسات", value: "Khemisset" },
    { label: "الجديدة", value: "El Jadida" },
    { label: "الرشيدية", value: "Er Rachidia" },
    { label: "تازة", value: "Taza" },
    { label: "الحسيمة", value: "Al Hoceima" },
    { label: "بركان", value: "Berkane" },
    { label: "خريبكة", value: "Khouribga" },
    { label: "تاوريرت", value: "Taourirt" },
    { label: "سلا", value: "Sale" },
    { label: "تمارة", value: "Temara" },
    { label: "الصويرة", value: "Essaouira" },
    { label: "العرائش", value: "Larache" },
    { label: "زاكورة", value: "Zagora" },
    { label: "العيون", value: "Laayoune" },
    { label: "الفقيه بن صالح", value: "Fquih Ben Salah" },
    { label: "سطات", value: "Settat" },
  ];

  // بناء عناصر القوائم المنسدلة
  const cityObj = moroccanCities.map((city) => (
    <MenuItem key={city.value} value={city.value}>
      {city.label}
    </MenuItem>
  ));

  // دالة تغيير المدينة المختارة
  const handleChange = (event) => {
    // إيجاد كائن المدينة المختارة بناءً على القيمة
    const cityTrget = moroccanCities.find(
      (c) => c.value === event.target.value
    );
    setCityEn(event.target.value);
    // استدعاء الدالة المرسلة من الأب لتغيير المدينة في الصفحة الرئيسية
    onCityChange(cityTrget);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, textAlign: "center" }} size="small">
      <InputLabel id="demo-select-small-label" sx={{ textAlign: "center" }}>
        <span style={{ color: "accent.main !important" }}>اختر المدينة</span>
      </InputLabel>
      {/* قائمة المدن المنسدلة */}
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={cityEn} // ربط القيمة بالمتغير cityEn
        label="اختر المدينة"
        onChange={handleChange}
      >
        {cityObj}
      </Select>
      {/* عرض اسم المدينة المختارة */}
      <p value={cityEn}>{cityEn}</p>
    </FormControl>
  );
}