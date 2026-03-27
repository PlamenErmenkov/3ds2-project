const CHECK_SVG = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const STEP_STATUSES = [
  "Merchant — transaction initialised",
  "Directory Server — routing &amp; lookup",
  "Issuer / ACS — cardholder verified",
];

export function createStepper({ stepStatusTextEl, pulseDotEl }) {
  return function setStep(activeIdx) {
    for (let i = 0; i < 3; i++) {
      const stepEl = document.getElementById("s" + i);
      const iconEl = document.getElementById("si" + i);
      if (!stepEl || !iconEl) throw new Error(`Missing stepper element s${i}/si${i}`);

      stepEl.classList.remove("active", "completed");
      if (i < activeIdx) {
        stepEl.classList.add("completed");
        iconEl.innerHTML = CHECK_SVG;
      } else if (i === activeIdx) {
        stepEl.classList.add("active");
        iconEl.textContent = String(i + 1);
      } else {
        iconEl.textContent = String(i + 1);
      }
    }

    for (let i = 0; i < 2; i++) {
      const conn = document.getElementById("sc" + i);
      if (!conn) throw new Error(`Missing step connector sc${i}`);
      conn.classList.toggle("completed", i < activeIdx);
    }

    stepStatusTextEl.innerHTML = STEP_STATUSES[activeIdx] ?? "";
    pulseDotEl.style.display = activeIdx === 2 ? "none" : "block";
  };
}

