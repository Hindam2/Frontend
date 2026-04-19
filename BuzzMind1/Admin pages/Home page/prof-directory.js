// =============================================
//  ProfessorAdmin – prof-directory.js
// =============================================

// ---------- Search ----------
document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  document.querySelectorAll('.prof-card').forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const dept = card.querySelector('.dept-badge').textContent.toLowerCase();
    card.style.display = (name.includes(q) || dept.includes(q)) ? '' : 'none';
  });
});

// ---------- View Details ----------
function viewDetails(name) {
  alert('Viewing details for: ' + name + '\n(Connect to your backend!)');
}

// ---------- Delete Professor ----------
function deleteProfessor(btn, name) {
  const confirmed = confirm('Are you sure you want to remove ' + name + '?');
  if (!confirmed) return;

  const card = btn.closest('.prof-card');
  card.style.transition = 'opacity 0.3s, transform 0.3s';
  card.style.opacity = '0';
  card.style.transform = 'scale(0.95)';

  setTimeout(() => card.remove(), 300);
}

// ---------- Add Professor ----------
function addProfessor() {
  // Step 1: Name
  const name = prompt('Full name (e.g. Dr. Jane Smith):');
  if (!name || !name.trim()) return;

  // Step 2: Email — keep asking until valid or cancelled
  let email = '';
  while (true) {
    email = prompt('Email address (required):');

    // User clicked Cancel
    if (email === null) return;

    // Empty
    if (!email.trim()) {
      alert('⚠️ Email cannot be empty. Please enter a valid email.');
      continue;
    }

    // Must match email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('⚠️ Invalid email format.\nExample: name@university.edu');
      continue;
    }

    // Valid — exit loop
    break;
  }

  // Step 3: Department
  const dept = prompt('Department (e.g. MATHEMATICS):') || 'GENERAL';

  const grid = document.getElementById('profGrid');

  // Pick initials
  const parts    = name.trim().split(' ');
  const initials = parts.filter(p => /^[A-Za-z]/.test(p)).slice(-2).map(p => p[0]).join('').toUpperCase();

  // Random avatar color
  const colors = [
    'linear-gradient(135deg,#6b3a2a,#9b5a3a)',
    'linear-gradient(135deg,#1a2a4a,#2a3a6a)',
    'linear-gradient(135deg,#2d3a2a,#4a5a3a)',
    'linear-gradient(135deg,#3a2a4a,#5a3a6a)',
  ];
  const bg = colors[Math.floor(Math.random() * colors.length)];

  const card = document.createElement('div');
  card.className = 'prof-card';
  card.style.cssText = 'opacity:0;transform:translateY(20px);transition:opacity 0.4s,transform 0.4s';

  card.innerHTML = `
    <div class="prof-top">
      <div class="prof-av" style="background:${bg}">${initials}</div>
      <div class="prof-info">
        <div class="name-row">
          <h3>${name.trim()}</h3>
          <span class="dept-badge cs">${dept.toUpperCase()}</span>
        </div>
        <div class="email">✉ ${email.trim()}</div>
      </div>
    </div>
    <div class="prof-stats">
      <div class="pstat">
        <div class="pstat-lbl">TOTAL CLASSES</div>
        <div class="pstat-val">00 <span class="dots blue-dots"></span></div>
      </div>
      <div class="pstat">
        <div class="pstat-lbl">TOTAL STUDENTS</div>
        <div class="pstat-val big">0</div>
      </div>
    </div>
    <div class="card-foot">
      <button class="btn-view" onclick="viewDetails('${name.trim()}')">View Details</button>
      <button class="btn-del" onclick="deleteProfessor(this, '${name.trim()}')">🗑</button>
    </div>`;

  grid.appendChild(card);

  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 50);
}

// ---------- Scroll-in animation ----------
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.prof-card, .stat-pill').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    const watcher = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 80);
        watcher.unobserve(el);
      }
    }, { threshold: 0.1 });

    watcher.observe(el);
  });
});