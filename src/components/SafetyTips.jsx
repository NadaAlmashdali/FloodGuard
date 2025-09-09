// src/components/SafetyTips.jsx
export default function SafetyTips({ onBack }) {
  const tips = {
    before: [
      {
        en: "Monitor rain & flood alerts early.",
        ar: "تابع تنبيهات الأمطار والسيول مبكرًا.",
      },
      {
        en: "Prepare an emergency kit (water, food, first aid, light).",
        ar: "جهّز حقيبة طوارئ (ماء، غذاء، إسعافات، إضاءة).",
      },
      {
        en: "Agree on evacuation routes & meeting points with family.",
        ar: "اتفق مع العائلة على مسارات الإخلاء ونقاط التجمع.",
      },
    ],
    during: [
      {
        en: "Avoid low-lying roads & wadis.",
        ar: "تجنّب الطرق المنخفضة ومجاري الأودية.",
      },
      {
        en: "Never walk/drive through floodwaters.",
        ar: "لا تعبر مياه السيول سيرًا أو بالسيارة.",
      },
      {
        en: "Move to higher ground immediately when warned.",
        ar: "انتقل فورًا لأرض مرتفعة عند التحذير.",
      },
    ],
    after: [
      {
        en: "Return home only when officials say it’s safe.",
        ar: "عد للمنزل فقط عند إعلان الجهات المختصة أنه آمن.",
      },
      {
        en: "Beware of downed power lines & contaminated water.",
        ar: "احذر الأسلاك المكشوفة والمياه الملوّثة.",
      },
      {
        en: "Document damage & contact responders/insurance.",
        ar: "وثّق الأضرار وتواصل مع الجهات/التأمين.",
      },
    ],
  };

  const shareText = `🛟 Flood Safety Tips
Before: ${tips.before.map((t) => t.en).join(" • ")}
During: ${tips.during.map((t) => t.en).join(" • ")}
After: ${tips.after.map((t) => t.en).join(" • ")}

نصائح بالعربي:
قبل: ${tips.before.map((t) => t.ar).join(" • ")}
أثناء: ${tips.during.map((t) => t.ar).join(" • ")}
بعد: ${tips.after.map((t) => t.ar).join(" • ")}
— FloodGuard`;

  async function handleShare() {
    try {
      if (navigator.share)
        await navigator.share({
          title: "FloodGuard Safety Tips",
          text: shareText,
        });
      else {
        await navigator.clipboard.writeText(shareText);
        alert("Tips copied ✅");
      }
    } catch {}
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Tips copied ✅");
    } catch {}
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="mx-auto w-full max-w-7xl px-4 py-5">
        <div className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white shadow-inner">
              <span className="text-xl">🛟</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">FloodGuard</p>
              <p className="text-[11px] leading-none text-slate-500">
                Safety Mode
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="rounded-xl border px-3 py-2 text-sm text-slate-700 hover:bg-white transition"
            >
              Back to Map
            </button>
            <button
              onClick={handleShare}
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white shadow hover:bg-slate-800 transition"
            >
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-7xl grow px-4 pb-16">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-2xl backdrop-blur">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Safety Tips
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Quick bilingual guidance — إرشادات بالعربية والإنجليزية
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <TipsCard title="Before | قبل" tone="blue" items={tips.before} />
            <TipsCard title="During | أثناء" tone="amber" items={tips.during} />
            <TipsCard title="After | بعد" tone="green" items={tips.after} />
          </div>

          {/* Quick actions */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={handleShare}
              className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Share Tips
            </button>
            <button
              onClick={handleCopy}
              className="rounded-xl border px-4 py-2 hover:bg-white transition"
            >
              Copy to Clipboard
            </button>
          </div>

          {/* Note */}
          <p className="mt-4 rounded-xl bg-slate-900/90 p-3 text-xs text-slate-100">
            Tips follow WHO/UNDRR community guidance; tailor to local
            authorities’ instructions.
          </p>
        </div>
      </main>

      {/* Footer (always bottom) */}
      <footer className="mt-auto bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-600">
          FloodGuard © {new Date().getFullYear()} — Safety tips demo
        </div>
      </footer>
    </div>
  );
}

/* Subcomponent */
function TipsCard({ title, items, tone = "blue" }) {
  const ring = {
    blue: "ring-blue-200",
    amber: "ring-amber-200",
    green: "ring-green-200",
  }[tone];

  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur ring-1 ${ring}`}
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <ul className="mt-2 space-y-2 text-[15px] text-slate-700">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 text-sm">•</span>
            <div>
              <p>{t.en}</p>
              <p className="text-slate-600 text-[13px]">{t.ar}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
