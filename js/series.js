const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("data/series.json")
  .then(r => r.json())
  .then(series => {
    const show = series.find(s => s.id == id);
    if (!show) return;

    document.getElementById("title").textContent = show.title;
    document.getElementById("desc").textContent = show.description;
    document.getElementById("poster").src = show.poster;
    document.getElementById("trailer").src = show.trailer;
  });
