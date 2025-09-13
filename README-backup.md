# FloodGuard 🌊

**Bilingual flood early-warning for Aden (AR/EN).**  
Color-coded district risk, instant alerts, and shareable safety tips. Deployed on Vercel.

## 🌐 Live Demo  
🔗 https://flood-guard-rosy.vercel.app/  
💻 Repo: https://github.com/NadaAlmashdali/FloodGuard  

---

## 🚨 Why
Floods strike fast. People need one clear, local alert they can share in seconds.

---

## ✨ Features
- District risk cards (High / Medium / Low)  
- Alert page: rain, wind, confidence, next-hours timeline  
- Safety Tips (before / during / after), AR/EN, one-tap share  
- Dark mode, mobile-first  
- **AI Forecast (demo):** rules stub showing the AI path  

---

## 🧮 Data Model (prototype)
`Risk = Hazard(rain) × 0.6 × Vulnerability + 0.4 × Exposure (DEM slope)`

---

## 🛠 Tech
- React + Vite + TailwindCSS  
- Deployed on Vercel  

---

## 🗺 Roadmap
- Plug real NASA/IMERG feeds  
- Add local measures, community reports  
- AI summarization & anomaly detection  
- SMS/WhatsApp broadcast  

---

## ▶️ Run locally
```bash
npm install  
npm run dev
