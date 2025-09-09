import React from "react";

/**
 * Alert screen
 * Props:
 *  - district: { name, risk, rain, wind, confidence }
 *  - onBack: () => void
 *  - onNext: () => void   (to Safety Tips)
 *  - lang: "en" | "ar"
 *  - t?: (lang: string, key: string) => string   // optional i18n helper
 */
export default function Alert({
  district,
  onBack,
  onNext,
  lang = "en",
  t = (l, k) => defaultDict[k]?.[l] || defaultDict[k]?.en || k,
}) {
  // افتراضي لو ما جاش district
  const d = {
    name: "Crater",
    risk: "Medium",
    rain: 28,
    wind: 22,
    confidence: "High",
    ...(district || {}),
  };

  // نص المشاركة
  const shareText = `⚠️ Flood Alert
District: ${d.name}
Risk: ${d.risk}
Rain (3h): ${isFinite(d.rain) ? d.rain : "N/A"} mm
Wind: ${isFinite(d.wind) ? d.wind : "N/A"} km/h
Confidence: ${d.confidence}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({ title: "Flood Alert", text: shareText })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert(t(lang, "copied"));
    }
  };

  const riskBadge =
    d.risk === "High"
      ? "bg-red-200 text-red-800"
      : d.risk === "Medium"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-green-200 text-green-800";

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* بطاقة التنبيه */}
        <div className="rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur shadow-xl border border-white/40 dark:border-slate-800 p-6 md:p-7">
          {/* العنوان + الشارة */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{t(lang, "floodAlert")}</h2>
              <p className="text-sm opacity-80 mt-1">
                {d.name} — {new Date().toLocaleString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${riskBadge}`}
            >
              {d.risk}
            </span>
          </div>

          {/* وصف قصير */}
          <p className="mt-4">{t(lang, "desc")}</p>

          {/* الإحصاءات المصغرة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <Stat
              label={t(lang, "rain")}
              value={`${isFinite(d.rain) ? d.rain : "—"} mm`}
            />
            <Stat
              label={t(lang, "wind")}
              value={`${isFinite(d.wind) ? d.wind : "—"} km/h`}
            />
            <Stat label={t(lang, "confidence")} value={d.confidence} />
            <Stat label={t(lang, "risk")} value={d.risk} />
          </div>

          {/* التوقع الزمني */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">
              {t(lang, "nextHours")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((h) => (
                <span
                  key={h}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60"
                >
                  {h}h
                </span>
              ))}
            </div>
          </div>

          {/* الأزرار */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={onNext}
              className="rounded-xl bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition"
            >
              {t(lang, "safetyTips")}
            </button>

            <button
              onClick={handleShare}
              className="rounded-xl border px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
            >
              <span>📤</span> {t(lang, "shareAlert")}
            </button>

            <button
              onClick={onBack}
              className="rounded-xl border px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {t(lang, "backToMap")}
            </button>
          </div>

          {/* سطر المصادر */}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
            Demo alert — target data sources: NASA GPM/IMERG (rainfall) + DEM
            (elevation).
          </p>
        </div>
      </div>
    </div>
  );
}

/* عنصر الإحصاء الصغير */
function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 p-3 text-center">
      <p className="text-xs opacity-70">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

/* نصوص افتراضية (إن ما توفرت دالة t من i18n.js) */
const defaultDict = {
  floodAlert: { en: "Flood Alert", ar: "تنبيه فيضان" },
  desc: {
    en: "Steep gullies increase flash flood risk. Stay alert and be ready.",
    ar: "الأودية والمنحدرات تزيد خطر السيول المفاجئة. ابقَ متنبّهًا ومستعدًا.",
  },
  rain: { en: "Rain (3h)", ar: "المطر (3 ساعات)" },
  wind: { en: "Wind", ar: "الرياح" },
  confidence: { en: "Confidence", ar: "الثقة" },
  risk: { en: "Risk", ar: "المخاطر" },
  nextHours: { en: "Next hours forecast", ar: "توقع الساعات القادمة" },
  safetyTips: { en: "Safety Tips", ar: "نصائح السلامة" },
  shareAlert: { en: "Share Alert", ar: "مشاركة التنبيه" },
  backToMap: { en: "Back to Map", ar: "العودة للخريطة" },
  copied: {
    en: "✔️ Alert copied to clipboard, ready to paste!",
    ar: "✔️ تم نسخ التنبيه، جاهز للصق!",
  },
};
