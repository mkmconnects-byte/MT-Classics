console.log("TV SERIES JS LOADED");

/* ---------- CREATE SERIES CARD ---------- */
function createSeriesCard(s) {
  const a = document.createElement("a");
  a.href = `series-detail.html?id=${s.id}`;
  a.className = "movie-card";
  a.style.backgroundImage = `url(${s.poster})`;

  a.innerHTML = `
    <div class="movie-overlay"></div>
    <div class="movie-title">${s.title}</div>
  `;
  console.log('create card for', s.title);
  return a;
}

/* ---------- FETCH ---------- */
// helper: populate DOM with provided array
function populate(series) {
    const top = document.getElementById("topSeriesGrid");
    series.forEach((s, i) => {
      if (i < 3) {
        if (top.children.length === 1 && top.children[0].classList.contains('empty')) {
          top.innerHTML = '';
        }
        top.appendChild(createSeriesCard(s));
        console.log('added to top grid:', s.title);
      }
    });

    function fill(genre, gridId, extraId, max = 6) {
      const grid = document.getElementById(gridId);
      const extra = document.getElementById(extraId);
      if (!grid || !extra) return;
      const matches = series.filter(s => s.genre.includes(genre));
      if (grid.children.length === 1 && grid.children[0].classList.contains('empty')) {
        grid.innerHTML = '';
      }
      matches.slice(0, max).forEach(s => {
        grid.appendChild(createSeriesCard(s));
        console.log(`appended ${s.title} to ${gridId}`);
      });
      matches.slice(max).forEach(s => {
        extra.appendChild(createSeriesCard(s));
        console.log(`appended extra ${s.title} to ${extraId}`);
      });
    }

    fill("Drama", "dramaSeriesGrid", "dramaSeriesExtra");
    fill("Fantasy", "fantasySeriesGrid", "fantasySeriesExtra");
    fill("Action", "actionSeriesGrid", "actionSeriesExtra");
    fill("Crime", "crimeSeriesGrid", "crimeSeriesExtra");
    fill("Mystery", "mysterySeriesGrid", "mysterySeriesExtra");
    fill("Sci-Fi", "scifiSeriesGrid", "scifiSeriesExtra");
}

// attempt to fetch JSON, fallback to hard-coded data if it fails
fetch("data/series.json")
  .then(r => r.json())
  .then(populate)
  .catch(err => {
    console.error("Series error:", err);
    // fallback dataset (same as series.json but inline)
    const fallback = [
      {"id":1,"title":"Game of Thrones","year":2011,"seasons":8,"rating":"TV-MA","genre":["Fantasy","Drama"],"poster":"sources/SERIES/gameofthrones/1-Game-of-thrones.jpg","backdrop":"https://i.imgur.com/4K6Z7sC.jpg","description":"Noble families fight for control over Westeros.","trailer":"https://www.youtube.com/embed/KPLWWIOCOOQ"},
      {"id":2,"title":"Breaking Bad","year":2008,"seasons":5,"rating":"TV-MA","genre":["Crime","Drama"],"poster":"sources/SERIES/breakingbad/images.jpg","backdrop":"https://i.imgur.com/Z9a2FQZ.jpg","description":"A chemistry teacher becomes a drug kingpin.","trailer":"https://www.youtube.com/embed/HhesaQXLuRY"},
      {"id":3,"title":"Stranger Things","year":2016,"seasons":4,"rating":"TV-14","genre":["Mystery","Sci-Fi"],"poster":"sources/SERIES/strangerthings/strangerthings.jpg","backdrop":"https://i.imgur.com/0a3F5hF.jpg","description":"Kids uncover supernatural mysteries.","trailer":"https://www.youtube.com/embed/b9EkMc79ZSU"},
      {"id":4,"title":"The Crown","year":2016,"seasons":5,"rating":"TV-MA","genre":["Drama"],"poster":"sources/SERIES/thecrown/thecrown.jpg","backdrop":"https://i.imgur.com/6Z5Rm3S.jpg","description":"The reign of Queen Elizabeth II.","trailer":"https://www.youtube.com/embed/8KcvMeqpLk0"},
      {"id":5,"title":"The Mandalorian","year":2019,"seasons":3,"rating":"TV-14","genre":["Sci-Fi","Action"],"poster":"sources/SERIES/themandalorian/mandalorian.jpg","backdrop":"https://i.imgur.com/U0x9o8R.jpg","description":"A lone bounty hunter travels the galaxy.","trailer":"https://www.youtube.com/embed/aOC8E8z_ifw"},
      {"id":6,"title":"Sherlock","year":2010,"seasons":4,"rating":"TV-14","genre":["Mystery","Crime"],"poster":"sources/SERIES/sherlock/sherlock.jpg","backdrop":"https://i.imgur.com/9k5Lz1a.jpg","description":"Modern update of Sherlock Holmes.","trailer":"https://www.youtube.com/embed/mKq3cÖ"}
    ];
    populate(fallback);
});

/* ---------- TOGGLE ---------- */
document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const extra = btn.closest(".category").querySelector(".category-extra");
    extra.classList.toggle("open");
    btn.textContent = extra.classList.contains("open") ? "↶" : "↷";
  });
});
