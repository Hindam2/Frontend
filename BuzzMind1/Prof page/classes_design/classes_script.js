// ── Student data ──
const students = [
  { id: 1, name: 'Alex "Neutron" Rivera', email: 'alex.rivera@buzzmind.com', grade: 94, participation: 4, emoji: '🧑‍🚀' },
  { id: 2, name: 'Luna Stark', email: 'luna.stark@buzzmind.com', grade: 89, participation: 3, emoji: '👩‍🔬' },
  { id: 3, name: 'Jordan "Flash" Wu', email: 'jordan.wu@buzzmind.com', grade: 72, participation: 2, emoji: '🧑‍💻' },
  { id: 4, name: 'Zara "Electron" Vance', email: 'zara.vance@buzzmind.com', grade: 91, participation: 4, emoji: '👩‍🎓' },
];

let editingId = null;

// ── Email validation ──
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Name validation ──
function isValidName(name) {
  return /^[a-zA-Z\s\-']{2,}$/.test(name);
}

// ── Error helpers ──
function showError(id, message) {
  document.querySelector(id).textContent = message;
}

function clearErrors(...ids) {
  ids.forEach(id => document.querySelector(id).textContent = '');
}

// ── Helpers ──
function gradeClass(g) {
  if (g >= 85) return 'grade-high';
  if (g >= 70) return 'grade-mid';
  return 'grade-low';
}

function participationBars(count) {
  let bars = '';
  for (let i = 1; i <= 4; i++) {
    const h = 8 + i * 5;
    bars += `<div class="bar ${i <= count ? '' : 'empty'}" style="height:${h}px"></div>`;
  }
  return `<div class="participation-bars">${bars}</div>`;
}

// ── Render ──
function renderRoster(list) {
  const tbody = document.querySelector('#roster-body');
  tbody.innerHTML = '';

  list.forEach(s => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>
        <div class="student-info">
          <div class="student-avatar">${s.emoji}</div>
          <div>
            <div class="student-name">${s.name}</div>
            <div class="student-email">${s.email}</div>
          </div>
        </div>
      </td>
      <td><span class="grade-badge ${gradeClass(s.grade)}">${s.grade}%</span></td>
      <td>${participationBars(s.participation)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-delete" data-id="${s.id}">🗑️</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelector('#roster-count').textContent =
    `SHOWING ${list.length} OF ${students.length} STUDENTS`;

  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(+btn.dataset.id));
  });

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      const idx = students.findIndex(s => s.id === id);
      students.splice(idx, 1);
      renderRoster(students);
    });
  });
}

// ── Search ──
document.querySelector('#search-input').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  renderRoster(students.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.email.toLowerCase().includes(q)
  ));
});

// ── Add Modal ──
const addModal = document.querySelector('#add-modal');

document.querySelector('#add-student-btn').onclick = () => {
  addModal.style.display = 'flex';
};

document.querySelector('#cancel-add').onclick = () => {
  addModal.style.display = 'none';
};

document.querySelector('#confirm-add').onclick = () => {
  const name = document.querySelector('#new-name').value.trim();
  const email = document.querySelector('#new-email').value.trim();

  clearErrors('#add-name-error', '#add-email-error');

  if (!isValidName(name)) {
    showError('#add-name-error', 'Invalid name');
    return;
  }

  if (!isValidEmail(email)) {
    showError('#add-email-error', 'Invalid email');
    return;
  }

  students.push({
    id: Date.now(),
    name,
    email,
    grade: 80,
    participation: 3,
    emoji: '🧑‍🎓'
  });

  addModal.style.display = 'none';
  renderRoster(students);
};

// ── Edit Modal ──
const editModal = document.querySelector('#edit-modal');

function openEditModal(id) {
  const s = students.find(x => x.id === id);
  editingId = id;

  document.querySelector('#edit-name').value = s.name;
  document.querySelector('#edit-email').value = s.email;

  editModal.style.display = 'flex';
}

document.querySelector('#confirm-edit').onclick = () => {
  const s = students.find(x => x.id === editingId);

  s.name = document.querySelector('#edit-name').value;
  s.email = document.querySelector('#edit-email').value;

  editModal.style.display = 'none';
  renderRoster(students);
};

document.querySelector('#cancel-edit').onclick = () => {
  editModal.style.display = 'none';
};

// ── Close modals ──
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.onclick = e => {
    if (e.target === m) m.style.display = 'none';
  };
});

// ── Init ──
renderRoster(students);