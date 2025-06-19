// Sample movie data array
const movies = [
  {
    title: "To All The Boys I Have Loved Before",
    description: "A charming teen romance where a girl's secret love letters are unexpectedly sent out, turning her life upside down.",
    image: "../assets/images/m1.jpg"
  },
  {
    title: "Accountant 1",
    description: "A skilled accountant with a secretive life gets caught in a dangerous conspiracy involving crime and deception.",
    image: "../assets/images/movie1.jpg"
  },
  {
    title: "The Last of Us",
    description: "In a post-apocalyptic world, a hardened survivor and a young girl form an unlikely bond while navigating deadly threats.",
    image: "../assets/images/movie4.jpg"
  },
  {
    title: "Ballerina",
    description: "A young orphan dreams of becoming a ballet dancer and sets off on a journey to follow her passion and find her true self.",
    image: "../assets/images/movie3.jpg"
  },
  {
    title: "Mercy Over None",
    description: "A gritty crime thriller where a detective faces moral dilemmas and dangerous criminals in pursuit of justice.",
    image: "../assets/images/movie5.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "../assets/images/movie6.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "../assets/images/movie7.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "../assets/images/movie8.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "../assets/images/movie2.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "../assets/images/movie9.jpg"
  }
];

const bannerTrack = document.querySelector('.banner .banner-track');
const movieRows = document.querySelectorAll('.movie-row');
const popularMovies = movieRows[0].querySelector('.movie-thumbnails');
const topPicks = movieRows[1].querySelector('.movie-thumbnails');

bannerTrack.innerHTML = '';
popularMovies.innerHTML = '';
topPicks.innerHTML = '';

// Only first 5 for banners
movies.slice(0, 5).forEach(movie => {
  const bannerItem = document.createElement('div');
  bannerItem.classList.add('banner-item');
  bannerItem.style.backgroundImage = `url(${movie.image})`;

  bannerItem.innerHTML = `
    <div class="banner-text">
      <h2>${movie.title}</h2>
      <p>${movie.description}</p>
      <div class="banner-buttons">
        <button class="play-btn">▶ Play</button>
        <button class="add-btn">➕ Add to List</button>
      </div>
    </div>
  `;

  bannerTrack.appendChild(bannerItem);
});

// All movies for popular
movies.forEach(movie => {
  const img = document.createElement('img');
  img.src = movie.image;
  img.alt = movie.title;
  img.title = `${movie.title} - ${movie.description}`;
  popularMovies.appendChild(img);
});

// Top picks (first 10)
movies.slice(0, 10).forEach(movie => {
  const img = document.createElement('img');
  img.src = movie.image;
  img.alt = movie.title;
  img.title = `${movie.title} - ${movie.description}`;
  topPicks.appendChild(img);
});

const openBtn = document.querySelector('.menu-open-btn');
const closeBtn = document.querySelector('.close-btn');
const navMenu = document.querySelector('.nav-menu');

openBtn.addEventListener('click', () => {
  navMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
});

// document.querySelector('.sign-out-btn').addEventListener('click', () => {
//   alert('Signed out!');
// });

function signOut() {
  window.location.href = "login.html";
}

const searchIcon = document.getElementById('search-icon');
const floatingSearch = document.getElementById('floating-search');
const mobileSearchBox = document.getElementById('mobile-search-box');

searchIcon.addEventListener('click', () => {
  // Only act on mobile
  if (window.innerWidth <= 768) {
    floatingSearch.style.display = 'block';
    mobileSearchBox.focus();
  } else {
    // Desktop search
    const desktopQuery = document.getElementById('search-box')?.value.trim().toLowerCase();
    if (desktopQuery) {
      console.log("Desktop Search:", desktopQuery);
    }
  }
});

// Pressing Enter on mobile triggers search and hides input
mobileSearchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = mobileSearchBox.value.trim().toLowerCase();
    if (query) {
      console.log("Mobile Search:", query);
    }
    floatingSearch.style.display = 'none';
  }
});

// Clicking outside hides the floating box
document.addEventListener('click', (e) => {
  if (
    window.innerWidth <= 768 &&
    !floatingSearch.contains(e.target) &&
    e.target.id !== 'search-icon'
  ) {
    floatingSearch.style.display = 'none';
  }
});
