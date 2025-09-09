// src/App.jsx
import { useEffect, useState } from "react";
import { t } from "./i18n";

import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Map from "./components/Map.jsx";
import Alert from "./components/Alert.jsx";
import SafetyTips from "./components/SafetyTips.jsx";

export default function App() {
  // الصفحات: home | map | alert | tips
  const [page, setPage] = useState("home");
  // تفعيل/إلغاء الوضع الداكن
  const [dark, setDark] = useState(false);
  // اللغة: en | ar
  const [lang, setLang] = useState("en");
  // الحي المختار للتنبيه
  const [selected, setSelected] = useState(null);

  // ✅ أضِف/أزل class="dark" على <html> (Tailwind v4)
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  // مثال حي لاستخدام زر "See Live Alert"
  const CRATER = {
    id: "Crater",
    ar: "كريتر",
    rain: 32,
    wind: 22,
    exposure: 0.75,
    vulnerability: 0.85,
    risk: "High",
    noteEn: "Steep gullies increase flash risk.",
    noteAr: "المنحدرات تزيد خطر السيول.",
    confidence: "High",
  };

  // زر في الهيدر (يمين) لفتح الخريطة مباشرة
  const headerRight = (
    <button
      onClick={() => setPage("map")}
      className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
    >
      {t(lang, "tryDemo")}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={() => setLang((p) => (p === "en" ? "ar" : "en"))}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        rightSlot={headerRight}
      />

      {/* Pages */}
      <main className="grow">
        {page === "home" && (
          <Home
            lang={lang}
            onStart={() => setPage("map")}
            onLive={() => {
              setSelected(CRATER);
              setPage("alert");
            }}
          />
        )}

        {page === "map" && (
          <Map
            lang={lang}
            onBack={() => setPage("home")}
            onNext={(district) => {
              setSelected(district);
              setPage("alert");
            }}
          />
        )}

        {page === "alert" && selected && (
          <Alert
            lang={lang}
            district={selected}
            onBack={() => setPage("map")}
            onNext={() => setPage("tips")}
          />
        )}

        {page === "tips" && (
          <SafetyTips lang={lang} onBack={() => setPage("map")} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-slate-600 dark:text-slate-400">
        FloodGuard © {new Date().getFullYear()} — Prototype demo
      </footer>
    </div>
  );
}
