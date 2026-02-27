const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    const video = card.querySelector('.movie-preview');

    card.addEventListener('mouseenter', () => {
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    });

    card.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
        }
    });
});



// search bar promt

const searchInput = document.getElementById('searchInput');
const movieCard = document.querySelectorAll('.movie-card');

searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.toLowerCase();

    movieCards.forEach(card => {
        const title = card.querySelector('.movie-title')
                          .textContent
                          .toLowerCase();

        if (title.includes(query)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});


/*----Transition linking js---*/

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // 👈 stop watching after reveal
            }
        });
    }, {
        threshold: 0.2
    });

    reveals.forEach(el => observer.observe(el));
});

