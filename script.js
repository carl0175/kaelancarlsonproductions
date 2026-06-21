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

const cleanLinkedTitle = (title) => {
  if (typeof title !== "string") {
    return "";
  }

  return title
    .replace(/\s*\|\s*Spotify\s*$/i, "")
    .replace(/\s*-\s*YouTube\s*$/i, "")
    .trim();
};

const updateCardTitle = (card, rawTitle, fallbackTitle) => {
  const cleanTitle = cleanLinkedTitle(rawTitle);
  const titleElement = card.querySelector("strong");

  if (cleanTitle && titleElement) {
    titleElement.textContent = cleanTitle;
  }

  return cleanTitle || fallbackTitle;
};

const spotifyCoverCards = document.querySelectorAll(
  ".spotify-cover-grid a[href^='https://open.spotify.com/']",
);

spotifyCoverCards.forEach(async (card) => {
  const image = card.querySelector("img") ?? document.createElement("img");
  const fallback = card.querySelector(".spotify-art-fallback");
  const fallbackTitle =
    card.querySelector("strong")?.textContent?.trim() || "Spotify cover art";

  try {
    const response = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(card.href)}`,
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    const title = updateCardTitle(card, data.title, fallbackTitle);

    if (typeof data.thumbnail_url === "string" && data.thumbnail_url.length > 0) {
      image.alt = `Cover art for ${title}`;

      if (!image.isConnected) {
        image.loading = "lazy";
        image.decoding = "async";

        if (fallback) {
          fallback.replaceWith(image);
        } else {
          card.prepend(image);
        }
      }

      image.src = data.thumbnail_url;
    }
  } catch {
    // Keep the visible fallback if Spotify does not return artwork.
  }
});

const youtubeTitleCards = document.querySelectorAll(
  ".youtube-grid a[href*='youtube.com/watch'], .youtube-grid a[href*='youtu.be/']",
);

youtubeTitleCards.forEach(async (card) => {
  const fallbackTitle =
    card.querySelector("strong")?.textContent?.trim() || "YouTube video";

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(card.href)}&format=json`,
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    const title = updateCardTitle(card, data.title, fallbackTitle);
    const image = card.querySelector("img");

    if (image instanceof HTMLImageElement) {
      image.alt = `Thumbnail for ${title}`;
    }
  } catch {
    // Keep the visible fallback if YouTube does not return metadata.
  }
});
