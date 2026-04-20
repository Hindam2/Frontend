let selectedRole = null;

function selectRole(card) {
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));

  card.classList.add('selected');
  selectedRole = card.dataset.role;

  const btn = document.getElementById('continue-btn');
  const hint = document.getElementById('cta-hint');
  const lock = document.getElementById('lock-icon');

  btn.classList.add('unlocked');
  btn.disabled = false;
  lock.textContent = '▶';
  hint.classList.add('hidden');
}

function handleContinue() {
  if (!selectedRole) {
    const btn = document.getElementById('continue-btn');
    const hint = document.getElementById('cta-hint');

    hint.classList.remove('hidden');
    hint.style.color = '#c0392b';
    hint.textContent = 'PLEASE CHOOSE A ROLE FIRST!';

    setTimeout(() => {
      hint.style.color = '';
      hint.textContent = 'CHOOSE A ROLE TO UNLOCK THE NEXT LEVEL';
    }, 2500);

    return;
  }

  if (selectedRole === 'professor') {
    window.location.href = '../Prof page/Classes page/professor2.html';
  } else if (selectedRole === 'student') {
    window.location.href = '../Student pages/Home page/index.html';
  } else if (selectedRole === 'admin') {
    window.location.href = '../Admin pages/Home page/Admin Home.html';
  }
}