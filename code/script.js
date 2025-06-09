// Sample movie data array
const movies = [
  {
    title: "The Batman",
    description: "The dark knight fights crime in Gotham City.",
    image: "../assets/images/m1.jpg"
  },
  {
    title: "Inception",
    description: "A mind-bending journey through dreams.",
    image: "../assets/images/movie1.jpg"
  },
  {
    title: "Interstellar",
    description: "Exploring the far reaches of space to save humanity.",
    image: "../assets/images/movie4.jpg"
  },
  {
    title: "Stranger Things",
    description: "Supernatural forces and secrets unravel in a small town.",
    image: "../assets/images/movie3.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
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

// First 3 for top picks
movies.slice(0, 3).forEach(movie => {
  const img = document.createElement('img');
  img.src = movie.image;
  img.alt = movie.title;
  img.title = `${movie.title} - ${movie.description}`;
  topPicks.appendChild(img);
});
