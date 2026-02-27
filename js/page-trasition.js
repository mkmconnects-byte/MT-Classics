document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: "0px 0px -80px 0px"
    });

    items.forEach(el => observer.observe(el));
});
