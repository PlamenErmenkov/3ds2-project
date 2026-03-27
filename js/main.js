import { getEls } from "./dom.js";
import { createLogger } from "./logger.js";
import { createStepper } from "./stepper.js";
import { createOtpController } from "./otp.js";
import { setRiskModeUI, showOnly } from "./ui.js";

const DEMO_TIMEOUT_MS = 5000;
const OTP_TIMEOUT_SECONDS = 60;
const MAX_OTP_ATTEMPTS = 3;

const els = getEls();
const log = createLogger(els.systemLog);
const setStep = createStepper({
  stepStatusTextEl: els.stepStatusText,
  pulseDotEl: els.pulseDot,
});

const sections = [els.shopSection, els.checkoutSection, els.successSection];

let riskMode = "high";

function goToSuccess(flow) {
  els.successFlow.textContent = flow;
  showOnly(sections, els.successSection);
}

const otp = createOtpController({
  otpTimeoutSeconds: OTP_TIMEOUT_SECONDS,
  maxAttempts: MAX_OTP_ATTEMPTS,
  otpTimerEl: els.otpTimerEl,
  otpForm: els.otpForm,
  otpInput: els.otpInput,
  confirmBtn: els.confirmBtn,
  modalOverlay: els.modalOverlay,
  log,
  onVerified() {
    goToSuccess("Challenge");
  },
  onExpired() {
    alert("OTP expired! Restart checkout.");
    showOnly(sections, els.shopSection);
  },
  onTooManyAttempts() {
    alert("Too many incorrect OTP attempts. Restart checkout.");
    showOnly(sections, els.shopSection);
  },
});

function resetCheckout() {
  els.systemLog.innerHTML = "";
  els.termsCheckbox.checked = false;
  els.payBtn.disabled = true;
  setStep(0);
  otp.reset();
}

function setRiskMode(mode) {
  riskMode = mode;
  setRiskModeUI({ riskLowBtn: els.riskLowBtn, riskHighBtn: els.riskHighBtn }, mode);
  log(
    `Authentication mode set to: ${mode === "low" ? "Frictionless" : "Challenge"}`,
  );
}

els.shopSection.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-price]");
  if (!btn) return;

  els.orderItemName.textContent = btn.dataset.name;
  els.orderAmountSpan.textContent = `$${Number.parseFloat(btn.dataset.price).toFixed(2)}`;

  const dynamicRisk = Number.parseFloat(btn.dataset.price) > 50 ? "high" : "low";
  resetCheckout();
  setRiskMode(dynamicRisk);
  showOnly(sections, els.checkoutSection);
  log(`Transaction initialized at merchant (${dynamicRisk} risk)`);
});

els.backToShopFromCheckout.addEventListener("click", () => {
  showOnly(sections, els.shopSection);
});

els.backToShopBtn.addEventListener("click", () => {
  resetCheckout();
  showOnly(sections, els.shopSection);
});

els.riskLowBtn.addEventListener("click", () => setRiskMode("low"));
els.riskHighBtn.addEventListener("click", () => setRiskMode("high"));

els.termsCheckbox.addEventListener("change", () => {
  els.payBtn.disabled = !els.termsCheckbox.checked;
});

els.payBtn.addEventListener("click", () => {
  log("AReq sent to Directory Server");
  setStep(1);

  setTimeout(() => {
    log("ARes received");
    if (riskMode === "low") {
      log("Frictionless authentication approved");
      setStep(2);
      goToSuccess("Frictionless");
      return;
    }

    log("Challenge required by issuer");
    setStep(2);
    otp.showWithTimer();
  }, DEMO_TIMEOUT_MS);
});

// Initial UI
resetCheckout();
setRiskMode("high");

