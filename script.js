const button = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

button?.addEventListener("click", () => {
  const isOpen = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    button?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});

const spotifyCoverCards = document.querySelectorAll(
  ".spotify-cover-grid a[href^='https://open.spotify.com/']",
);

spotifyCoverCards.forEach(async (card) => {
  const image = card.querySelector("img");

  if (!(image instanceof HTMLImageElement)) {
    return;
  }

  try {
    const response = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(card.href)}`,
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    if (typeof data.thumbnail_url === "string" && data.thumbnail_url.length > 0) {
      image.src = data.thumbnail_url;
    }
  } catch {
    // Keep the local optimized cover if Spotify does not return one.
  }
});
