export function createOtpController({
  otpTimeoutSeconds,
  maxAttempts,
  otpTimerEl,
  otpForm,
  otpInput,
  confirmBtn,
  modalOverlay,
  onVerified,
  onExpired,
  onTooManyAttempts,
  log,
}) {
  let otpAttempts = 0;
  let otpInterval;

  function hideModal() {
    modalOverlay.classList.add("hidden");
    modalOverlay.classList.remove("flex");
  }

  function showModal() {
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");
    otpInput.focus();
  }

  function clearTimer() {
    clearInterval(otpInterval);
    otpInterval = undefined;
  }

  function reset() {
    otpInput.value = "";
    clearTimer();
    otpAttempts = 0;
    hideModal();
  }

  function startTimer() {
    let timeLeft = otpTimeoutSeconds;
    otpTimerEl.textContent = `Expires in ${timeLeft}s`;
    otpInterval = setInterval(() => {
      timeLeft--;
      otpTimerEl.textContent = `Expires in ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearTimer();
        log("OTP expired");
        hideModal();
        onExpired();
      }
    }, 1000);
  }

  otpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    otpAttempts++;

    if (otpInput.value.trim() === "123456") {
      log("OTP verified successfully");
      clearTimer();
      hideModal();
      onVerified();
      return;
    }

    if (otpAttempts >= maxAttempts) {
      log("Maximum OTP attempts reached. Restarting checkout.");
      clearTimer();
      hideModal();
      onTooManyAttempts();
      return;
    }

    log(`OTP verification failed (attempt ${otpAttempts}) — try again`);
    otpInput.value = "";
  });

  otpInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (typeof otpForm.requestSubmit === "function") otpForm.requestSubmit();
    else confirmBtn.click();
  });

  return {
    reset,
    showWithTimer() {
      showModal();
      startTimer();
    },
  };
}

