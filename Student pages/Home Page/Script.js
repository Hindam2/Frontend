// ---------- Join Game ----------
function joinGame(event) {
  event.preventDefault();

  const input = document.getElementById("pinInput");
  const pin = input.value.trim();

  // Empty
  if (!pin) {
    showPinError(input, "Please enter a Game PIN.");
    return;
  }

  // Must be 6 digits
  if (!/^\d{6}$/.test(pin)) {
    showPinError(input, "PIN must be 6 digits.");
    return;
  }

  // Correct PIN only
  if (pin !== "734912") {
    showPinError(input, "Wrong Game PIN.");
    return;
  }

  // Success
  input.style.borderColor = "#10b981";

  const btn = document.querySelector(".btn-join");
  btn.textContent = "Joining...";
  btn.disabled = true;

  setTimeout(() => {
    window.location.href = "../Joined Students/Joined Students.html";
  }, 1000);
}


// ---------- Error ----------
function showPinError(input, message) {
  input.style.borderColor = "#ef4444";
  input.value = "";
  input.placeholder = message;

  setTimeout(() => {
    input.style.borderColor = "";
    input.placeholder = "GAME PIN";
  }, 2000);
}


// ---------- Load ----------
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("pinInput");

  // Numbers only
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });

  // Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      joinGame(e);
    }
  });
});