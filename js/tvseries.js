console.log("TV SERIES JS LOADED");

/* ---------- CREATE SERIES CARD ---------- */
function createSeriesCard(s) {
  const a = document.createElement("a");
  a.href = `series.html?id=${s.id}`;
  a.className = "movie-card";
  a.style.backgroundImage = `url(${s.poster})`;

  a.innerHTML = `
    <div class="movie-overlay"></div>
    <div class="movie-title">${s.title}</div>
  `;
  return a;
}

/* ---------- FETCH ---------- */
fetch("data/series.json")
  .then(r => r.json())
  .then(series => {

    /* ---------- TOP ---------- */
    const top = document.getElementById("topSeriesGrid");
    series.forEach((s, i) => {
      if (i < 3) top.appendChild(createSeriesCard(s));
    });

    /* ---------- CATEGORY FILL ---------- */
    function fill(genre, gridId, extraId, max = 6) {
      const grid = document.getElementById(gridId);
      const extra = document.getElementById(extraId);
      if (!grid || !extra) return;

      const matches = series.filter(s => s.genre.includes(genre));

      matches.slice(0, max).forEach(s =>
        grid.appendChild(createSeriesCard(s))
      );

      matches.slice(max).forEach(s =>
        extra.appendChild(createSeriesCard(s))
      );
    }

    fill("Drama", "dramaSeriesGrid", "dramaSeriesExtra");
    fill("Fantasy", "fantasySeriesGrid", "fantasySeriesExtra");
    fill("Crime", "crimeSeriesGrid", "crimeSeriesExtra");
    fill("Mystery", "mysterySeriesGrid", "mysterySeriesExtra");
    fill("Sci-Fi", "scifiSeriesGrid", "scifiSeriesExtra");
  })
  .catch(err => console.error("Series error:", err));

/* ---------- TOGGLE ---------- */
document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const extra = btn.closest(".category").querySelector(".category-extra");
    extra.classList.toggle("open");
    btn.textContent = extra.classList.contains("open") ? "↶" : "↷";
  });
});
