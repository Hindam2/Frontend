document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById("quizSearch");
  const quizCards = document.querySelectorAll(".quiz-card");

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    quizCards.forEach((card) => {
      const title = card.querySelector("h3").innerText.toLowerCase();

      if (title.includes(term)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
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