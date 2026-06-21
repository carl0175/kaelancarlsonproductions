const artGallery = document.querySelector("[data-art-gallery]");

if (artGallery) {
  const artLinks = Array.from(artGallery.querySelectorAll("a"));
  let activeArtIndex = 0;
  let activeTrigger = null;

  const viewer = document.createElement("div");
  viewer.className = "photo-viewer";
  viewer.setAttribute("aria-hidden", "true");
  viewer.innerHTML = `
    <button class="photo-viewer__close" type="button" aria-label="Close art viewer">&times;</button>
    <button class="photo-viewer__nav photo-viewer__nav--prev" type="button" aria-label="Previous artwork">&lsaquo;</button>
    <img class="photo-viewer__image" alt="" />
    <button class="photo-viewer__nav photo-viewer__nav--next" type="button" aria-label="Next artwork">&rsaquo;</button>
    <span class="photo-viewer__count" aria-live="polite"></span>
  `;

  const viewerImage = viewer.querySelector(".photo-viewer__image");
  const viewerCount = viewer.querySelector(".photo-viewer__count");
  const closeButton = viewer.querySelector(".photo-viewer__close");
  const previousButton = viewer.querySelector(".photo-viewer__nav--prev");
  const nextButton = viewer.querySelector(".photo-viewer__nav--next");

  const setViewerArt = (index) => {
    activeArtIndex = (index + artLinks.length) % artLinks.length;
    const link = artLinks[activeArtIndex];
    const image = link.querySelector("img");
    viewerImage.src = link.href;
    viewerImage.alt = image?.alt || `Digital artwork ${activeArtIndex + 1}`;
    viewerCount.textContent = `${activeArtIndex + 1} / ${artLinks.length}`;
  };

  const openViewer = (index, trigger) => {
    activeTrigger = trigger;
    setViewerArt(index);
    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-photo-viewer");
    closeButton.focus();
  };

  const closeViewer = () => {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-photo-viewer");
    activeTrigger?.focus();
  };

  const showPreviousArt = () => setViewerArt(activeArtIndex - 1);
  const showNextArt = () => setViewerArt(activeArtIndex + 1);

  artLinks.forEach((link, index) => {
    link.dataset.index = String(index);
  });

  document.body.append(viewer);

  artGallery.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link || !artGallery.contains(link)) {
      return;
    }

    event.preventDefault();
    openViewer(Number(link.dataset.index), link);
  });

  closeButton.addEventListener("click", closeViewer);
  previousButton.addEventListener("click", showPreviousArt);
  nextButton.addEventListener("click", showNextArt);

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!viewer.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeViewer();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousArt();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextArt();
    }
  });
}
