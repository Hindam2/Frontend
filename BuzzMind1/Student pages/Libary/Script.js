document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById("quizSearch");
  const quizCards = document.querySelectorAll(".quiz-card");

    // 1. Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add to clicked tab
            tab.classList.add('active');
            
            console.log(`Filtering by: ${tab.dataset.filter}`);
            // Here you would normally filter the data from an API
        });
    });

    // 2. Simple Search Filter
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        quizCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            if (title.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

  const playButtons = document.querySelectorAll(".play-btn, .play-circle");

  playButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const titleElement = btn.closest("div").querySelector("h3, h4");
      const quizTitle = titleElement ? titleElement.innerText : "Quiz";

      alert(`Starting Game: ${quizTitle}`);
    });
  });
};);