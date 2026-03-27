export function getEls() {
  const shopSection = document.getElementById("shopSection");
  const checkoutSection = document.getElementById("checkoutSection");
  const successSection = document.getElementById("successSection");
  const modalOverlay = document.getElementById("modalOverlay");
  const payBtn = document.getElementById("payBtn");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const otpForm = document.getElementById("otpForm");
  const otpInput = document.getElementById("otpInput");
  const confirmBtn = document.getElementById("confirmBtn");
  const systemLog = document.getElementById("systemLog");
  const successFlow = document.getElementById("successFlow");
  const backToShopBtn = document.getElementById("backToShopBtn");
  const backToShopFromCheckout = document.getElementById(
    "backToShopFromCheckout",
  );
  const riskLowBtn = document.getElementById("riskLowBtn");
  const riskHighBtn = document.getElementById("riskHighBtn");
  const orderItemName = document.getElementById("orderItemName");
  const orderAmountSpan = document.getElementById("orderAmountSpan");
  const otpTimerEl = document.getElementById("otpTimer");
  const stepStatusText = document.getElementById("stepStatusText");
  const pulseDot = document.getElementById("pulseDot");

  const required = {
    shopSection,
    checkoutSection,
    successSection,
    modalOverlay,
    payBtn,
    termsCheckbox,
    otpForm,
    otpInput,
    confirmBtn,
    systemLog,
    successFlow,
    backToShopBtn,
    backToShopFromCheckout,
    riskLowBtn,
    riskHighBtn,
    orderItemName,
    orderAmountSpan,
    otpTimerEl,
    stepStatusText,
    pulseDot,
  };

  for (const [k, v] of Object.entries(required)) {
    if (!v) throw new Error(`Missing required DOM element: ${k}`);
  }

  return required;
}

