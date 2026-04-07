// ---------- Join Game ----------
function joinGame() {
  const input = document.getElementById('pinInput');
  const pin = input.value.trim();

  // PIN should be 4-8 digits
  if (!pin) {
    showPinError(input, 'Please enter a Game PIN.');
    return;
  }

  if (!/^\d{4,8}$/.test(pin)) {
    showPinError(input, 'PIN must be 4–8 digits.');
    return;
  }

  // Success state
  input.style.borderColor = '#10b981'; // green
  const btn = document.querySelector('.btn-join');
  btn.textContent = 'Joining...';
  btn.disabled = true;

  // API call
  setTimeout(() => {
    alert(`Joining game with PIN: ${pin}`);
    btn.textContent = 'JOIN GAME';
    btn.disabled = false;
    input.value = '';
    input.style.borderColor = '';
  }, 1200);
}

function showPinError(input, message) {
  input.style.borderColor = '#ef4444'; // red
  input.placeholder = message;
  input.value = '';

  // Reset after 2 seconds
  setTimeout(() => {
    input.style.borderColor = '';
    input.placeholder = 'GAME PIN';
  }, 2000);
}

// Allow pressing Enter to submit the PIN
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('pinInput');

  // Only allow numeric input in the PIN field
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') joinGame();
  });
});
