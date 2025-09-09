// src/components/Map.jsx
import { useMemo, useState } from "react";

/** تصنيف الخطر حسب نموذج مبسّط:
 *  - Hazard من المطر (mm/3h): <10=0.5 | 10–19=1 | >=20=2
 *  - score = H × (0.6*V + 0.4*E)
 *  - High if score>=2.0 ; Medium if 1.0<=score<2.0 ; Low otherwise
 */
function hazardLevel(rain3h) {
  if (rain3h >= 20) return 2;
  if (rain3h >= 10) return 1;
  return 0.5;
}
function classifyRisk(rain3h, exposure, vulnerability) {
  const H = hazardLevel(rain3h);
  const score = H * (0.6 * vulnerability + 0.4 * exposure);
  if (score >= 2.0) return { risk: "High", score: Number(score.toFixed(2)) };
  if (score >= 1.0) return { risk: "Medium", score: Number(score.toFixed(2)) };
  return { risk: "Low", score: Number(score.toFixed(2)) };
}
function riskChipClasses(risk) {
  return risk === "High"
    ? "bg-red-100 text-red-700 border-red-200"
    : risk === "Medium"
    ? "bg-amber-100 text-amber-700 border-amber-200"
    : "bg-green-100 text-green-700 border-green-200";
}
function cardTone(risk) {
  return risk === "High"
    ? "from-rose-100 to-red-100 ring-red-200"
    : risk === "Medium"
    ? "from-amber-100 to-yellow-100 ring-amber-200"
    : "from-emerald-100 to-green-100 ring-emerald-200";
}

export default function Map({ onNext, onBack }) {
  const [filter, setFilter] = useState("All"); // All | High | Medium | Low

  // بيانات الأحياء (E و V بين 0..1، rain3h بالملّيمتر، wind km/h)
  const districts = [
    {
      id: "Crater",
      ar: "كريتر",
      rain3h: 32,
      wind: 22,
      exposure: 0.75,
      vulnerability: 0.85,
      noteEn: "Steep gullies increase flash risk.",
      noteAr: "المنحدرات تزيد خطر السيول.",
    },
    {
      id: "At-Tawahi",
      ar: "التواهي",
      rain3h: 18,
      wind: 17,
      exposure: 0.6,
      vulnerability: 0.55,
      noteEn: "Coastal roads may flood.",
      noteAr: "قد تتأثر الطرق الساحلية بالمياه.",
    },
    {
      id: "Al-Ma'ala",
      ar: "المعلا",
      rain3h: 8,
      wind: 12,
      exposure: 0.45,
      vulnerability: 0.35,
      noteEn: "Minor ponding possible.",
      noteAr: "ركود بسيط محتمل.",
    },
    {
      id: "Al-Qaloua",
      ar: "القلوعة",
      rain3h: 15,
      wind: 16,
      exposure: 0.55,
      vulnerability: 0.65,
      noteEn: "Watch wadis during showers.",
      noteAr: "احذر مجاري الأودية أثناء الهطول.",
    },
  ].map((d) => {
    const { risk, score } = classifyRisk(d.rain3h, d.exposure, d.vulnerability);
    return { ...d, risk, score };
  });

  const filtered = useMemo(() => {
    if (filter === "All") return districts;
    return districts.filter((d) => d.risk === filter);
  }, [filter]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white shadow-inner">
              <span className="text-xl">🗺️</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Aden Risk Map
              </h1>
              <p className="text-[11px] text-slate-500 leading-none">
                Hazard × Exposure × Vulnerability → Risk
              </p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="rounded-xl border px-3 py-2 text-sm text-slate-700 hover:bg-white transition"
          >
            Back
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="grow mx-auto w-full max-w-7xl px-4 py-6">
        {/* Filters + Legend */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <FilterBtn
            label="All"
            active={filter === "All"}
            onClick={() => setFilter("All")}
          />
          <FilterBtn
            label="High"
            active={filter === "High"}
            onClick={() => setFilter("High")}
          />
          <FilterBtn
            label="Medium"
            active={filter === "Medium"}
            onClick={() => setFilter("Medium")}
          />
          <FilterBtn
            label="Low"
            active={filter === "Low"}
            onClick={() => setFilter("Low")}
          />
          <span className="mx-2 h-4 w-px bg-slate-300/60" />
          <Legend tone="red">High</Legend>
          <Legend tone="amber">Medium</Legend>
          <Legend tone="green">Low</Legend>
          <span className="text-xs text-slate-600">— risk levels</span>
        </div>

        {/* “خريطة” خفيفة */}
        <div className="rounded-3xl border border-white/60 bg-white/60 p-5 shadow-2xl backdrop-blur">
          <div className="relative mb-5 grid h-56 place-items-center rounded-2xl bg-gradient-to-br from-sky-200 via-blue-200 to-indigo-200">
            <div className="text-center">
              <div className="text-5xl mb-1">🌍</div>
              <p className="font-semibold text-slate-900">Aden Districts</p>
              <p className="text-xs text-slate-700/80">
                Crater • At-Tawahi • Al-Ma'ala • Al-Qaloua
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((d) => (
              <DistrictCard key={d.id} data={d} onAlert={() => onNext?.(d)} />
            ))}
          </div>

          {/* Model explainer صغير داخل الصفحة */}
          <div className="mt-5 rounded-2xl border border-white/60 bg-white/70 p-4 text-sm text-slate-700 backdrop-blur">
            <b>How we compute risk:</b> Hazard(☔rain) × (0.6×Vulnerability 🏞️ +
            0.4×Exposure 📍) → colored risk badge.
          </div>

          {/* Note */}
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function DistrictCard({ data, onAlert }) {
  const {
    id,
    ar,
    rain3h,
    wind,
    exposure,
    vulnerability,
    risk,
    score,
    noteEn,
    noteAr,
  } = data;

  const tone = cardTone(risk);
  const chip = riskChipClasses(risk);

  // جعل E/V أسهل للفهم كنسبة مئوية
  const E = Math.round(exposure * 100);
  const V = Math.round(vulnerability * 100);

  return (
    <div
      className={`group rounded-2xl bg-gradient-to-br ${tone} ring-1 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">
            {ar} / {id}
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1">
              ☔ Rain (3h): <b>{rain3h} mm</b>
            </span>
            <span className="inline-flex items-center gap-1">
              💨 Wind: <b>{wind} km/h</b>
            </span>
            <span className="inline-flex items-center gap-1">
              📍 Exposure: <b>{E}%</b>
            </span>
            <span className="inline-flex items-center gap-1">
              🏞️ Vulnerability: <b>{V}%</b>
            </span>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`px-2 py-1 rounded-xl border text-[11px] font-semibold ${chip}`}
          >
            {risk}
          </span>
          <div className="mt-1 text-[11px] text-slate-600">score: {score}</div>
        </div>
      </div>

      <button
        onClick={() =>
          onAlert?.({
            id,
            ar,
            risk,
            rain: rain3h,
            wind,
            exposure,
            vulnerability,
            noteEn,
            noteAr,
            confidence:
              risk === "High" ? "High" : risk === "Medium" ? "Medium" : "Low",
          })
        }
        className="mt-4 w-full rounded-xl bg-slate-900/90 px-4 py-2 text-sm text-white shadow transition hover:bg-slate-900 group-hover:shadow-md"
      >
        Get Alert
      </button>
    </div>
  );
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-3 py-1 text-sm transition
        ${
          active
            ? "bg-slate-900 text-white shadow"
            : "hover:bg-white text-slate-800"
        }`}
    >
      {label}
    </button>
  );
}

function Legend({ children, tone = "blue" }) {
  const styles = {
    red: "bg-red-100 text-red-700 border-red-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    green: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
  }[tone];
  return (
    <span className={`rounded-lg border px-2 py-1 text-xs ${styles}`}>
      {children}
    </span>
  );
}
