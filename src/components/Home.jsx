// src/components/Home.jsx
import { t } from "../i18n";

export default function Home({ onStart, onLive, lang = "en" }) {
  return (
    <main className="grow">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2">
        {/* النص والأزرار */}
        <div className="space-y-5">
          {/* شارة مصادر البيانات */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 dark:bg-slate-800/70 px-3 py-1 text-xs text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            {t(lang, "powered")}
          </div>

          {/* العنوان */}
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {t(lang, "heroTitle")} <span className="text-blue-700">Aden</span>
          </h1>

          {/* وصف قصير */}
          <p className="max-w-xl text-slate-700 dark:text-slate-300">
            Community-ready alerts & a clear risk map you can share instantly.
          </p>

          {/* الأزرار الرئيسية */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onStart}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 transition"
            >
              {t(lang, "viewMap")} →
            </button>
            <button
              onClick={onLive}
              className="rounded-xl border px-6 py-3 text-slate-800 dark:text-slate-100 hover:bg-white/70 dark:hover:bg-slate-800/70 transition"
            >
              {t(lang, "liveAlert")}
            </button>
          </div>

          {/* سطر نموذج الخطر */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-xs">
            <span className="font-semibold">{t(lang, "riskModel")}:</span>
            <span>Hazard(☔) × (0.6×V 🏞️ + 0.4×E 📍)</span>
          </div>
        </div>

        {/* كارد استعراضي (زجاجي) */}
        <div className="rounded-3xl border border-white/60 bg-white/60 dark:bg-slate-800/60 p-5 shadow-2xl backdrop-blur">
          <div className="rounded-2xl bg-gradient-to-br from-sky-200 via-blue-200 to-indigo-200 p-6 text-center dark:from-blue-900 dark:via-indigo-900 dark:to-indigo-950">
            <div className="text-6xl">🌍</div>
            <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
              Aden Districts (Demo)
            </p>
            <p className="text-xs text-slate-700/80 dark:text-slate-300/80">
              Crater • At-Tawahi • Al-Ma'ala • Al-Qaloua
            </p>
          </div>

          {/* مميزات سريعة */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Feature
              icon="⏰"
              title="Early Alerts"
              text="Instant flood warnings."
            />
            <Feature icon="🗺️" title="Risk Map" text="Color-coded districts." />
            <Feature
              icon="🛟"
              title="Safety Tips"
              text="Before • During • After."
            />
            <Feature icon="🔗" title="Share" text="1-tap WhatsApp/copy." />
          </div>
        </div>
      </div>

      {/* كيف يعمل */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
          {t(lang, "howItWorks")}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Step
            n="1"
            title={t(lang, "step1")}
            text="IMERG rainfall per district (3h/6h)."
          />
          <Step
            n="2"
            title={t(lang, "step2")}
            text="DEM elevation/slope → vulnerability."
          />
          <Step
            n="3"
            title={t(lang, "step3")}
            text="Score → High/Medium/Low + alert."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 dark:bg-slate-800/70 p-4 backdrop-blur">
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300">{text}</div>
    </div>
  );
}

function Step({ n, title, text }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 dark:bg-slate-800/70 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white">
          {n}
        </span>
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}
