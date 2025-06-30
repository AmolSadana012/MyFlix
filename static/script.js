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
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');

chatbotToggle.style.display = 'block';
chatbotWindow.style.display = 'none';

chatbotToggle.addEventListener('click', () => {
  chatbotToggle.style.display = 'none';
  chatbotWindow.style.display = 'flex';
  chatbotInput.focus();
});

document.getElementById('chatbot-close').addEventListener('click', () => {
  chatbotWindow.style.display = 'none';
  chatbotToggle.style.display = 'block';
});

// Function to append messages to the chat window
function appendMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("chat-message-block");

  // Add alignment class
  if (sender === "You") {
    wrapper.classList.add("user-block");
  } else {
    wrapper.classList.add("bot-block");
  }

  // Sender label
const label = document.createElement("div");
label.classList.add("sender-label");

// Create container to align name and time together
const labelContent = document.createElement("div");
labelContent.style.display = "flex";
labelContent.style.gap = "8px";
labelContent.style.justifyContent = sender === "You" ? "flex-end" : "flex-start";
labelContent.style.width = "100%";

const nameEl = document.createElement("strong");
nameEl.textContent = sender;

const timeEl = document.createElement("span");
timeEl.classList.add("message-time");
timeEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

labelContent.appendChild(nameEl);
labelContent.appendChild(timeEl);
label.appendChild(labelContent);


  // Message bubble
  const messageBubble = document.createElement("div");
  messageBubble.classList.add("chat-message");
  messageBubble.classList.add(sender === "You" ? "user-message" : "bot-message");
  messageBubble.innerHTML = `<div class="message-text">${text}</div>`;

  // Combine and append
  wrapper.appendChild(label);
  wrapper.appendChild(messageBubble);
  chatbotMessages.appendChild(wrapper);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// NEW: AI-powered backend call
async function getBotReply(message) {
  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    return "Sorry, I couldn’t connect to the server.";
  }
}

// When user presses Enter
chatbotInput.addEventListener('keypress', async function (e) {
  if (e.key === "Enter") {
    const userMsg = chatbotInput.value.trim();
    if (userMsg === "") return;

    appendMessage("You", userMsg);
    chatbotInput.value = "";

    const botReply = await getBotReply(userMsg);
    appendMessage("MyFlix Bot", botReply);
  }
});

// Emoji picker logic
emojiBtn.addEventListener('click', () => {
  emojiPicker.classList.toggle('hidden');
});

emojiPicker.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    chatbotInput.value += e.target.textContent;
    chatbotInput.focus();
    emojiPicker.classList.add('hidden');
  }
});

document.addEventListener('click', (e) => {
  if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
    emojiPicker.classList.add('hidden');
  }
});
