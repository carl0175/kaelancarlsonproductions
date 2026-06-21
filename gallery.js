const photoFiles = [
  "2S7A2556.webp",
  "56FFD3C8-84C3-4C2C-AECC-D2BB74EDCFF1.webp",
  "_53A2040.webp",
  "C97D7E72-0992-474A-B464-F3DE0E6087E2.webp",
  "2S7A2566.webp",
  "2C6A3B4B-B992-40E9-9457-B9DF4C99EF31.webp",
  "_81A2714 2.webp",
  "2S7A2570.webp",
  "F44E11AB-31ED-4FEC-B624-8E21F101E331.webp",
  "_81A2716.webp",
  "1244D723-3214-40B4-96BC-E7054A0EAB0D.webp",
  "8F7B4A93-43CE-4F7B-9C63-9B122A887E3B.webp",
  "_06A0162.webp",
  "_81A2800.webp",
  "306A0028.webp",
  "52E60263-196B-423A-8826-38B815BAC1D7.webp",
  "IMG_2999.webp",
  "IMG_4648.webp",
  "446BC91C-4D73-4BC1-8572-D5BA7368AC78.webp",
  "306A0049.webp",
  "838BBD80-F2AE-43C1-8E5D-172168EC0925.webp",
  "web worthyIMG_4044.webp",
  "8706C617-FA22-40E3-A852-85329315068D.webp",
  "Amyot F20251119_17400437.webp",
  "AFA95030-7879-4D30-B86C-EEC29ACA0172.webp",
  "web worthyIMG_4126.webp",
  "B1C3D4D3-17EB-4DA8-87F6-84BBA604F8F8.webp",
  "IMG_4119.webp",
  "BB43EB6A-58CD-4FDA-B9C8-BA038BBAE1DC.webp",
  "web worthyIMG_4174.webp",
  "Carlson k SP 2 2.webp",
  "IMG_4743.webp",
  "web worthyIMG_4185.webp",
  "_D3A3378.webp",
  "IMG_4769.webp",
  "_D3A3416.webp",
  "web worthy_S6A3224col.webp",
  "_S6A3098.webp",
  "IMG_4773.webp",
  "_S6A3103.webp",
  "IMG_4779.webp",
  "carlson-k-CA0233.webp",
  "IMG_4787.webp",
  "carlson-k-lifestyle0188.webp",
  "IMG_4825.webp",
  "carlson-kaelan-best-serries-award-0.4.webp",
  "IMG_4868.webp",
  "oct-11-240166.webp",
  "IMG_4877.webp",
  "output-A10015.webp",
  "sept 23 240381.webp",
  "output-A10051.webp",
  "sept 23 240418.webp",
  "web worthy sept 23 240316 1.webp",
  "IMG_0014.webp",
];

const gallery = document.querySelector("#photo-grid");

if (gallery) {
  const fragment = document.createDocumentFragment();
  const availablePhotos = [...photoFiles];
  let activePhotoIndex = 0;
  let activeTrigger = null;

  const optimizedPhoto = (source, folder) => {
    return `assets/photos/${folder}/${source}`;
  };

  const viewer = document.createElement("div");
  viewer.className = "photo-viewer";
  viewer.setAttribute("aria-hidden", "true");
  viewer.innerHTML = `
    <button class="photo-viewer__close" type="button" aria-label="Close photo viewer">&times;</button>
    <button class="photo-viewer__nav photo-viewer__nav--prev" type="button" aria-label="Previous photo">&lsaquo;</button>
    <img class="photo-viewer__image" alt="" />
    <button class="photo-viewer__nav photo-viewer__nav--next" type="button" aria-label="Next photo">&rsaquo;</button>
    <span class="photo-viewer__count" aria-live="polite"></span>
  `;

  const viewerImage = viewer.querySelector(".photo-viewer__image");
  const viewerCount = viewer.querySelector(".photo-viewer__count");
  const closeButton = viewer.querySelector(".photo-viewer__close");
  const previousButton = viewer.querySelector(".photo-viewer__nav--prev");
  const nextButton = viewer.querySelector(".photo-viewer__nav--next");

  const setViewerPhoto = (index) => {
    if (availablePhotos.length === 0) {
      return;
    }

    activePhotoIndex = (index + availablePhotos.length) % availablePhotos.length;
    const source = availablePhotos[activePhotoIndex];
    viewerImage.src = optimizedPhoto(source, "large");
    viewerImage.alt = `Photography image ${String(activePhotoIndex + 1).padStart(3, "0")}`;
    viewerCount.textContent = `${activePhotoIndex + 1} / ${availablePhotos.length}`;
  };

  const openViewer = (index, trigger) => {
    activeTrigger = trigger;
    setViewerPhoto(index);
    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-photo-viewer");
    closeButton.focus();
  };

  const openViewerForSource = (source, trigger) => {
    const index = availablePhotos.indexOf(source);

    if (index < 0) {
      return;
    }

    openViewer(index, trigger);
  };

  const closeViewer = () => {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-photo-viewer");
    activeTrigger?.focus();
  };

  const showPreviousPhoto = () => setViewerPhoto(activePhotoIndex - 1);
  const showNextPhoto = () => setViewerPhoto(activePhotoIndex + 1);

  const removeMissingPhoto = (source, figure) => {
    const photoIndex = availablePhotos.indexOf(source);

    if (photoIndex >= 0) {
      availablePhotos.splice(photoIndex, 1);
    }

    figure.remove();
  };

  photoFiles.forEach((source, index) => {
    const slotNumber = String(index + 1).padStart(3, "0");
    const figure = document.createElement("figure");
    figure.className = "photo-card";

    const link = document.createElement("a");
    link.href = optimizedPhoto(source, "large");
    link.dataset.source = source;
    link.setAttribute("aria-label", `Open photography image ${slotNumber}`);

    const image = document.createElement("img");
    image.src = optimizedPhoto(source, "thumbs");
    image.alt = `Photography slot ${slotNumber}`;
    image.decoding = "async";
    image.loading = index < 8 ? "eager" : "lazy";
    image.fetchPriority = index < 3 ? "high" : "low";
    image.addEventListener("error", () => removeMissingPhoto(source, figure), {
      once: true,
    });

    link.append(image);
    figure.append(link);

    fragment.append(figure);
  });

  gallery.append(fragment);
  document.body.append(viewer);

  gallery.addEventListener("click", (event) => {
    const link = event.target.closest(".photo-card a");

    if (!link) {
      return;
    }

    event.preventDefault();
    openViewerForSource(link.dataset.source, link);
  });

  closeButton.addEventListener("click", closeViewer);
  previousButton.addEventListener("click", showPreviousPhoto);
  nextButton.addEventListener("click", showNextPhoto);
  viewerImage.addEventListener("error", showNextPhoto);

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
      showPreviousPhoto();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextPhoto();
    }
  });
}
