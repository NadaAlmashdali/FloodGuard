// src/components/Header.jsx
export default function Header({
  lang,
  onToggleLang,
  dark,
  onToggleDark,
  rightSlot,
}) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌊</span>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          FloodGuard
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Toggle language */}
        <button
          onClick={onToggleLang}
          className="px-3 py-1 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          {lang === "en" ? "AR" : "EN"}
        </button>

        {/* Toggle dark mode */}
        <button
          onClick={onToggleDark}
          className="px-3 py-1 rounded-lg text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* Extra slot (مثلاً زر Try Demo) */}
        {rightSlot}
      </div>
    </header>
  );
}
