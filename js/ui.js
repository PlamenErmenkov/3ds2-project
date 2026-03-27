export function showOnly(sections, sectionToShow) {
  sections.forEach((s) => s.classList.add("hidden"));
  sectionToShow.classList.remove("hidden");
  window.scrollTo({ top: 0 });
}

export function setRiskModeUI({ riskLowBtn, riskHighBtn }, mode) {
  riskLowBtn.className =
    "flex-1 px-3 py-2 text-sm font-medium " +
    (mode === "low" ? "bg-indigo-600 text-white" : "bg-white text-slate-700");
  riskHighBtn.className =
    "flex-1 px-3 py-2 text-sm font-medium " +
    (mode === "high" ? "bg-indigo-600 text-white" : "bg-white text-slate-700");
}

