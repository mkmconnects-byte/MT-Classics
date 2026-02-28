const usedMovies = {
  categories: new Set()
};

/* ---------- CREATE CARD ---------- */
function createCard(m) {
  const a = document.createElement("a");
  a.href = `movies1.html?id=${m.id}`;
  a.className = "movie-card";
  a.style.backgroundImage = `url(${m.poster})`;

  a.innerHTML = `
    <video class="card-preview" muted loop playsinline>
      <source src="${m.preview}" type="video/mp4">
    </video>
    <div class="movie-overlay"></div>
    <div class="movie-title">${m.title}</div>
  `;

  const video = a.querySelector("video");
  a.addEventListener("mouseenter", () => video.play());
  a.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });

  return a;
}

/* ---------- FETCH ONCE ---------- */
fetch("data/movies.json")
  .then(r => r.json())
  .then(movies => {

    /* ---------- TOP 5 ---------- */
    const topTen = document.getElementById("topTenGrid");
    if (topTen) {
      movies.slice(0, 5).forEach(m => {
        topTen.appendChild(createCard(m)); // can repeat
      });
    }

    /* ---------- CATEGORY FILLER ---------- */
    function fillCategory(genre, gridId, extraId, max = 6) {
      const grid = document.getElementById(gridId);
      const extra = document.getElementById(extraId);
      if (!grid || !extra) return;

      const matches = movies.filter(m =>
        m.genre &&
        m.genre.includes(genre) &&
        !usedMovies.categories.has(m.id)
      );

      const visible = matches.slice(0, max);
      const hidden = matches.slice(max);

      visible.forEach(m => {
        usedMovies.categories.add(m.id);
        grid.appendChild(createCard(m));
      });

      hidden.forEach(m => {
        usedMovies.categories.add(m.id);
        extra.appendChild(createCard(m));
      });
    }

    /* ---------- CALL CATEGORIES ---------- */
    fillCategory("Mystery", "mysteryGrid", "mysteryExtra");
    fillCategory("Action", "actionGrid", "actionExtra");
    fillCategory("Drama", "dramaGrid", "dramaExtra");
    fillCategory("Sci-Fi", "scifiGrid", "scifiExtra");
  });

/* ---------- TOGGLE BUTTONS ---------- */
document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.closest(".category");
    const extra = category.querySelector(".category-extra");

    if (!extra) return;

    extra.classList.toggle("open");
    btn.textContent = extra.classList.contains("open") ? "↶" : "↷";
  });
});

/* ---------- SEARCH FILTER ---------- */
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  // add an icon container if missing (keeps markup untouched)
  const parent = searchInput.parentElement;
  if (parent && !parent.querySelector('.search-icon')) {
    const icon = document.createElement('span');
    icon.className = 'search-icon';
    parent.insertBefore(icon, searchInput);
  }

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
      const titleEl = card.querySelector('.movie-title');
      const title = titleEl ? titleEl.textContent.toLowerCase() : '';
      // also check data attributes or alt text if needed in future
      card.style.display = title.includes(q) ? '' : 'none';
    });
  });
}
