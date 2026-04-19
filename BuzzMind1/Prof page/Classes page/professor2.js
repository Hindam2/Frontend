// =============================================
//  BuzzMind – professor2.js
// =============================================

// ---------- Search ----------
document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  document.querySelectorAll('.cc').forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
});


// ---------- Add New Class ----------
function addNewClass() {
  const name = prompt('Enter new class name:');
  if (!name || !name.trim()) return;

  const grid = document.getElementById('cgrid');
  const card = document.createElement('div');
  card.className = 'cc';
  card.style.cssText = 'opacity:0;transform:translateY(20px);transition:opacity 0.4s,transform 0.4s';

  card.innerHTML = `
    <div class="ct" style="background:linear-gradient(135deg,#0f2027,#203a43)">
      <div class="ct-ov"></div>
      <span class="lvl">LEVEL 100</span>
    </div>
    <div class="cb">
      <h3>${name.trim()}</h3>
      <p class="sch">Schedule TBD</p>
      <div class="pr">
        <span class="pl">COURSE PROGRESS</span>
        <span class="pp">0%</span>
      </div>
      <div class="pbar"><div class="pf pf-g" style="width:0%"></div></div>
      <div class="cf">
        <span class="stc">👥 0 Students</span>
        <button class="mbtn" onclick="manage('${name.trim()}')">Manage</button>
      </div>
    </div>`;

  grid.appendChild(card);

  // Animate in
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 50);
}

// ---------- Scroll-in animation ----------
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sc, .cc').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
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
