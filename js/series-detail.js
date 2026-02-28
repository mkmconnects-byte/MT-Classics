const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("data/series.json")
  .then(r => r.json())
  .then(seriesList => {
    const show = seriesList.find(s => String(s.id) === String(id));
    if (!show) {
      console.error("Series not found with ID:", id);
      document.body.innerHTML = "<h1>Series not found</h1>";
      return;
    }

    // Title + Desc
    const seriesTitle = document.getElementById("seriesTitle");
    const seriesDesc = document.getElementById("seriesDesc");
    if (seriesTitle) seriesTitle.textContent = show.title;
    if (seriesDesc) seriesDesc.textContent = show.description;

    // Hero background
    const hero = document.getElementById("seriesHero");
    if (hero) {
      hero.style.backgroundImage = `url(${show.backdrop})`;
    }

    // Trailer (convert watch?v= to embed automatically)
    const trailer = document.getElementById("seriesTrailer");
    if (trailer && show.trailer) {
      trailer.src = show.trailer.includes("watch?v=")
        ? show.trailer.replace("watch?v=", "embed/")
        : show.trailer;

      trailer.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      trailer.allowFullscreen = true;
    }

    // Cast (your JSON doesn't have cast, so just keep empty for now)
    const castGrid = document.getElementById("seriesCastGrid");
    if (castGrid) castGrid.innerHTML = "";
  })
  .catch(err => console.error("Series detail load error:", err));