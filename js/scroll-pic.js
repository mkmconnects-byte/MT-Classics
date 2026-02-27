const bg = document.querySelector(".scroll-bg");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  bg.style.transform = `translateY(${scrolled * 0.15}px)`;
});
