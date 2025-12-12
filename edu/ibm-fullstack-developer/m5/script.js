const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("nav-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.hidden = expanded;
  });
}

const destinations = [
  {
    name: "Maldives Serenity Retreat",
    country: "Maldives",
    region: "Indian Ocean",
    type: "Beach",
    tags: ["beach", "island", "wellness", "luxury"],
    description:
      "Overwater villas, private reef snorkeling, and restorative spa rituals under starry skies.",
    highlights: ["Sunset dhoni cruise", "Guided house reef snorkel"],
  },
  {
    name: "Tulum Eco Escape",
    country: "Mexico",
    region: "Riviera Maya",
    type: "Beach",
    tags: ["beach", "culture", "cenote", "wellness"],
    description:
      "Blend jungle stays with Mayan cenote dips, beachfront dining, and sunrise yoga.",
    highlights: ["Cenote swim", "Private sound bath session"],
  },
  {
    name: "Angkor Sunrise Sojourn",
    country: "Cambodia",
    region: "Siem Reap",
    type: "Temple",
    tags: ["temple", "history", "asia", "culture"],
    description:
      "Witness dawn over Angkor Wat, explore Ta Prohm, and dine on Khmer tasting menus.",
    highlights: ["Hot air balloon over Angkor", "Private archeologist guide"],
  },
  {
    name: "Yangon Spiritual Circuit",
    country: "Myanmar",
    region: "Yangon",
    type: "Temple",
    tags: ["temple", "heritage", "asia", "wellness"],
    description:
      "Golden pagodas, meditative rituals, and tea house conversations with local historians.",
    highlights: ["Votive candle ceremony", "Bogyoke market tasting"],
  },
  {
    name: "Kyoto Cultural Tapestry",
    country: "Japan",
    region: "Kansai",
    type: "Country",
    tags: ["japan", "culture", "city", "temple"],
    description:
      "Tea ceremonies, artisanal workshops, and bullet-train day trips through Kyoto and Nara.",
    highlights: ["Kaiseki dinner", "Private tea ceremony"],
  },
  {
    name: "Italian Riviera Reverie",
    country: "Italy",
    region: "Liguria & Tuscany",
    type: "Country",
    tags: ["italy", "coast", "culinary", "europe"],
    description:
      "Cinque Terre hikes, Tuscan vineyard cycling, and Michelin-starred dining in Florence.",
    highlights: ["Vineyard picnic", "Cinque Terre boat tour"],
  },
  {
    name: "Bali Wellness Immersion",
    country: "Indonesia",
    region: "Ubud & Uluwatu",
    type: "Beach",
    tags: ["beach", "wellness", "asia", "spiritual"],
    description:
      "Oceanfront villas pair with mindful retreats, waterfall treks, and Balinese healing arts.",
    highlights: ["Balinese healing session", "Surf coaching"],
  },
  {
    name: "Athens Mythic Discovery",
    country: "Greece",
    region: "Attica",
    type: "Country",
    tags: ["greece", "history", "mediterranean", "temple"],
    description:
      "Explore the Acropolis by twilight, island hop to Hydra, and savor Athenian gastronomy tours.",
    highlights: ["After-hours Acropolis", "Cooking workshop"],
  },
];

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

if (searchForm && searchInput && searchResults) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      searchResults.innerHTML =
        '<p class="result-hint">Enter a country, travel style, or keyword to see recommendations.</p>';
      return;
    }

    const matches = destinations.filter((destination) => {
      const haystack = [
        destination.name,
        destination.country,
        destination.region,
        destination.type,
        destination.description,
        ...destination.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });

    if (!matches.length) {
      searchResults.innerHTML =
        '<p class="result-hint">No matches yet. Try searching for "Beach", "Japan", or "Wellness".</p>';
      return;
    }

    const markup = matches
      .map((destination) => {
        const highlightList = destination.highlights
          .map((item) => `<li>${item}</li>`)
          .join("");
        return `
          <article class="result-card">
            <h3>${destination.name}</h3>
            <p><strong>Country:</strong> ${destination.country}</p>
            <p><strong>Experience:</strong> ${destination.type}</p>
            <p>${destination.description}</p>
            <ul>${highlightList}</ul>
          </article>
        `;
      })
      .join("");

    searchResults.innerHTML = markup;
  });
}

const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      formFeedback.textContent = "Please complete the required fields.";
      formFeedback.style.color = "#b91c1c";
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get("name");

    formFeedback.textContent = `Thank you, ${name}. Our concierge team will reach out shortly!`;
    formFeedback.style.color = "#0f766e";
    contactForm.reset();
  });
}
