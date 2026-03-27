export function createLogger(systemLogEl) {
  return function log(msg) {
    const line = document.createElement("div");
    line.textContent = new Date().toLocaleTimeString() + " — " + msg;
    systemLogEl.appendChild(line);
    systemLogEl.scrollTop = systemLogEl.scrollHeight;
  };
}

