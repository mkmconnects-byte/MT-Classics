const params = new URLSearchParams(window.location.search);
const id = params.get("id");

/* ---------- LOAD MOVIE ---------- */
fetch("data/movies.json")
  .then(r => r.json())
  .then(movies => {
    const movie = movies.find(m => String(m.id) === id);
    if (!movie) return;

    // TEXT
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");
    if (title) title.textContent = movie.title;
    if (desc) desc.textContent = movie.description;

    // HERO BACKGROUND
    const hero = document.getElementById("movieHero");
    if (hero && movie.backdrop) {
      hero.style.backgroundImage = `url(${movie.backdrop})`;
    }

    // TRAILER
    const trailer = document.getElementById("trailer");
    if (trailer && movie.trailer) {
      trailer.src = movie.trailer;
      trailer.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      trailer.allowFullscreen = true;
    }

    // CAST
    const castGrid = document.getElementById("castGrid");
    if (castGrid && movie.cast && movie.cast.length) {
      castGrid.innerHTML = "";

      movie.cast.forEach(actor => {
        const div = document.createElement("div");
        div.className = "cast-card";
        div.innerHTML = `
          <img src="${actor.photo}">
          <p>${actor.name}</p>
        `;
        castGrid.appendChild(div);
      });
    }
  })
  .catch(err => console.error("Movie load error:", err));
