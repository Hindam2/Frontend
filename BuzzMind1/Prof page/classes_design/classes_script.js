// ── Student data ──
const students = [
  { id: 1, name: 'Alex "Neutron" Rivera', email: 'alex.rivera@buzzmind.com', grade: 94, participation: 4, emoji: '🧑‍🚀' },
  { id: 2, name: 'Luna Stark',            email: 'luna.stark@buzzmind.com',  grade: 89, participation: 3, emoji: '👩‍🔬' },
  { id: 3, name: 'Jordan "Flash" Wu',     email: 'jordan.wu@buzzmind.com',   grade: 72, participation: 2, emoji: '🧑‍💻' },
  { id: 4, name: 'Zara "Electron" Vance', email: 'zara.vance@buzzmind.com',  grade: 91, participation: 4, emoji: '👩‍🎓' },
];

let editingId = null;

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

// ── Render roster ──
function renderRoster(list) {
  const tbody = document.querySelector('#roster-body');
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#aaa;padding:24px;">No students found.</td></tr>';
    return;
  }

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
          <button class="btn-edit" data-id="${s.id}">✏️</button>
          <button class="btn-delete" data-id="${s.id}">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelector('#roster-count').textContent =
    `SHOWING ${list.length} OF ${students.length} STUDENTS`;

  // Edit buttons
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.id)));
  });

  // Delete buttons
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const idx = students.findIndex(s => s.id === id);
      if (idx !== -1) {
        students.splice(idx, 1);
        renderRoster(students);
      }
    });
  });
}

// ── Search ──
document.querySelector('#search-input').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
  );
  renderRoster(filtered);
});

// ── Add Student Modal ──
const addModal = document.querySelector('#add-modal');

document.querySelector('#add-student-btn').addEventListener('click', () => {
  document.querySelector('#new-name').value = '';
  document.querySelector('#new-email').value = '';
  addModal.style.display = 'flex';
});

document.querySelector('#confirm-add').addEventListener('click', () => {
  const name  = document.querySelector('#new-name').value.trim();
  const email = document.querySelector('#new-email').value.trim();
  if (!name || !email) return;

  students.push({
    id: Date.now(),
    name,
    email,
    grade: Math.floor(Math.random() * 30) + 70,
    participation: Math.floor(Math.random() * 4) + 1,
    emoji: '🧑‍🎓',
  });

  addModal.style.display = 'none';
  renderRoster(students);
});

document.querySelector('#cancel-add').addEventListener('click', () => {
  addModal.style.display = 'none';
});

// ── Edit Student Modal ──
const editModal = document.querySelector('#edit-modal');

function openEditModal(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;
  editingId = id;
  document.querySelector('#edit-name').value  = student.name;
  document.querySelector('#edit-email').value = student.email;
  editModal.style.display = 'flex';
}

document.querySelector('#confirm-edit').addEventListener('click', () => {
  const name  = document.querySelector('#edit-name').value.trim();
  const email = document.querySelector('#edit-email').value.trim();
  if (!name || !email) return;

  const student = students.find(s => s.id === editingId);
  if (student) {
    student.name  = name;
    student.email = email;
  }

  editModal.style.display = 'none';
  renderRoster(students);
});

document.querySelector('#cancel-edit').addEventListener('click', () => {
  editModal.style.display = 'none';
});

// ── Close modals on backdrop click ──
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});

// ── Pagination (visual only for now) ──
document.querySelectorAll('.page-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── Initial render ──
renderRoster(students);
