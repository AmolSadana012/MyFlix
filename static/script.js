// Sample movie data array
const movies = [
  {
    title: "To All The Boys I Have Loved Before",
    description: "A charming teen romance where a girl's secret love letters are unexpectedly sent out, turning her life upside down.",
    image: "static/images/m1.jpg"
  },
  {
    title: "Accountant 1",
    description: "A skilled accountant with a secretive life gets caught in a dangerous conspiracy involving crime and deception.",
    image: "static/images/movie1.jpg"
  },
  {
    title: "The Last of Us",
    description: "In a post-apocalyptic world, a hardened survivor and a young girl form an unlikely bond while navigating deadly threats.",
    image: "static/images/movie4.jpg"
  },
  {
    title: "Ballerina",
    description: "A young orphan dreams of becoming a ballet dancer and sets off on a journey to follow her passion and find her true self.",
    image: "static/images/movie3.jpg"
  },
  {
    title: "Mercy Over None",
    description: "A gritty crime thriller where a detective faces moral dilemmas and dangerous criminals in pursuit of justice.",
    image: "static/images/movie5.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "static/images/movie6.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "static/images/movie7.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "static/images/movie8.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "static/images/movie2.jpg"
  },
  {
    title: "Avengers: Endgame",
    description: "Heroes unite to defeat Thanos and restore the universe.",
    image: "static/images/movie9.jpg"
  }
];

// Only run banner/movie row logic if elements exist
const bannerTrack = document.querySelector('.banner .banner-track');
const movieRows = document.querySelectorAll('.movie-row');

if (bannerTrack && movieRows.length >= 2) {
  const popularMovies = movieRows[0].querySelector('.movie-thumbnails');
  const topPicks = movieRows[1].querySelector('.movie-thumbnails');

  bannerTrack.innerHTML = '';
  popularMovies.innerHTML = '';
  topPicks.innerHTML = '';

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

  movies.forEach(movie => {
    const img = document.createElement('img');
    img.src = movie.image;
    img.alt = movie.title;
    img.title = `${movie.title} - ${movie.description}`;
    popularMovies.appendChild(img);
  });

  movies.slice(0, 10).forEach(movie => {
    const img = document.createElement('img');
    img.src = movie.image;
    img.alt = movie.title;
    img.title = `${movie.title} - ${movie.description}`;
    topPicks.appendChild(img);
  });
}

const openBtn = document.querySelector('.menu-open-btn');
const closeBtn = document.querySelector('.close-btn');
const navMenu = document.querySelector('.nav-menu');

openBtn.addEventListener('click', () => {
  navMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
});

function signOut() {
  window.location.href = "/logout";
}

const searchIcon = document.getElementById('search-icon');
const floatingSearch = document.getElementById('floating-search');
const mobileSearchBox = document.getElementById('mobile-search-box');
const desktopSearchBox = document.getElementById('search-box'); 

//  FILTER FUNCTION FOR BOTH DESKTOP AND MOBILE
function filterMovies(query) {
  const allImages = document.querySelectorAll('.movie-thumbnails img');
  allImages.forEach(img => {
    const title = img.alt.toLowerCase();
    img.style.display = title.includes(query) ? 'inline-block' : 'none';
  });
}

// Mobile: click icon shows input
searchIcon.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    floatingSearch.style.display = 'block';
    mobileSearchBox.focus();
  } else {
    const query = desktopSearchBox?.value.trim().toLowerCase();
    if (query) {
      filterMovies(query); //Call search
    }
  }
});

// Mobile: Enter key = filter + hide
mobileSearchBox?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = mobileSearchBox.value.trim().toLowerCase();
    if (query) {
      filterMovies(query); 
    }
    floatingSearch.style.display = 'none';
  }
});

// Desktop: Enter key also triggers search
desktopSearchBox?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = desktopSearchBox.value.trim().toLowerCase();
    if (query) {
      filterMovies(query); 
    }
  }
});

// Mobile: clicking outside hides search
document.addEventListener('click', (e) => {
  if (
    window.innerWidth <= 768 &&
    !floatingSearch.contains(e.target) &&
    e.target.id !== 'search-icon'
  ) {
    floatingSearch.style.display = 'none';
  }
});

const mobileSuggestions = document.getElementById('mobile-suggestions');
const desktopSuggestions = document.getElementById('desktop-suggestions');

// Fetch search suggestions
async function fetchSuggestions(query) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  return await res.json();
}

// Handle search for both mobile & desktop
function showSuggestions(box, query, results) {
  if (!results.length) {
    box.innerHTML = '<div>No matches found</div>';
  } else {
    box.innerHTML = results.map(movie => `<div>${movie.title}</div>`).join('');
  }
  box.style.display = 'block';

  box.querySelectorAll('div').forEach(div => {
    div.addEventListener('click', () => {
      if (box === mobileSuggestions) {
        mobileSearchBox.value = div.textContent;
      } else {
        desktopSearchBox.value = div.textContent;
      }
      filterMovies(div.textContent.toLowerCase());
      box.style.display = 'none';
    });
  });
}

// Desktop: input event for search suggestions
desktopSearchBox?.addEventListener('input', async () => {
  const query = desktopSearchBox.value.trim().toLowerCase();
  if (query.length === 0) {
    desktopSuggestions.style.display = 'none';
    return;
  }
  const data = await fetchSuggestions(query);
  showSuggestions(desktopSuggestions, query, data);
});

// Mobile: input event for search suggestions
mobileSearchBox?.addEventListener('input', async () => {
  const query = mobileSearchBox.value.trim().toLowerCase();
  if (query.length === 0) {
    mobileSuggestions.style.display = 'none';
    return;
  }
  const data = await fetchSuggestions(query);
  showSuggestions(mobileSuggestions, query, data);
});

// Hide suggestion boxes on click outside
document.addEventListener('click', (e) => {
  if (!mobileSuggestions.contains(e.target) && e.target !== mobileSearchBox) {
    mobileSuggestions.style.display = 'none';
  }
  if (!desktopSuggestions.contains(e.target) && e.target !== desktopSearchBox) {
    desktopSuggestions.style.display = 'none';
  }
});

// Chatbot
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');

chatbotToggle.style.display = 'block';
chatbotWindow.style.display = 'none';

chatbotToggle.addEventListener('click', () => {
  chatbotToggle.style.display = 'none';
  chatbotWindow.style.display = 'flex'; // show chatbot

const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Function to append messages to the chat window
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Dummy bot replies
function getBotReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes("recommend")) return "Try watching 'The Last of Us' or 'Ballerina'.";
  if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I help you?";
  if (msg.includes("mylist")) return "Your MyList saves all your favorite shows!";
  return "I'm still learning. Try asking about a movie recommendation!";
}

// When user presses Enter
chatbotInput.addEventListener('keypress', function (e) {
  if (e.key === "Enter") {
    const userMsg = chatbotInput.value.trim();
    if (userMsg === "") return;

    appendMessage("You", userMsg);
    chatbotInput.value = "";

    setTimeout(() => {
      const botReply = getBotReply(userMsg);
      appendMessage("Bot", botReply);
    }, 500);
  }
});

});
document.getElementById('chatbot-close').addEventListener('click', () => {
  chatbotWindow.style.display = 'none';
  chatbotToggle.style.display = 'block';
});

