const photoFiles = [
  "assets/photos/2S7A2556.JPG",
  "assets/photos/56FFD3C8-84C3-4C2C-AECC-D2BB74EDCFF1.JPG",
  "assets/photos/_53A2040.JPG",
  "assets/photos/C97D7E72-0992-474A-B464-F3DE0E6087E2.JPG",
  "assets/photos/2S7A2566.JPG",
  "assets/photos/2C6A3B4B-B992-40E9-9457-B9DF4C99EF31.JPG",
  "assets/photos/_81A2714 2.JPG",
  "assets/photos/2S7A2570.JPG",
  "assets/photos/F44E11AB-31ED-4FEC-B624-8E21F101E331.JPG",
  "assets/photos/_81A2716.JPG",
  "assets/photos/1244D723-3214-40B4-96BC-E7054A0EAB0D.JPG",
  "assets/photos/8F7B4A93-43CE-4F7B-9C63-9B122A887E3B.JPG",
  "assets/photos/_06A0162.JPG",
  "assets/photos/_81A2800.JPG",
  "assets/photos/306A0028.JPG",
  "assets/photos/52E60263-196B-423A-8826-38B815BAC1D7.JPG",
  "assets/photos/IMG_2999.JPG",
  "assets/photos/IMG_4648.JPG",
  "assets/photos/446BC91C-4D73-4BC1-8572-D5BA7368AC78.JPG",
  "assets/photos/306A0049.JPG",
  "assets/photos/838BBD80-F2AE-43C1-8E5D-172168EC0925.JPG",
  "assets/photos/web worthyIMG_4044.JPG",
  "assets/photos/8706C617-FA22-40E3-A852-85329315068D.JPG",
  "assets/photos/Amyot F20251119_17400437.jpg",
  "assets/photos/AFA95030-7879-4D30-B86C-EEC29ACA0172.JPG",
  "assets/photos/web worthyIMG_4126.JPG",
  "assets/photos/B1C3D4D3-17EB-4DA8-87F6-84BBA604F8F8.JPG",
  "assets/photos/IMG_4119.JPG",
  "assets/photos/BB43EB6A-58CD-4FDA-B9C8-BA038BBAE1DC.JPG",
  "assets/photos/web worthyIMG_4174.JPG",
  "assets/photos/Carlson k SP 2 2.JPG",
  "assets/photos/IMG_4743.JPG",
  "assets/photos/web worthyIMG_4185.JPG",
  "assets/photos/_D3A3378.JPG",
  "assets/photos/IMG_4769.JPG",
  "assets/photos/_D3A3416.JPG",
  "assets/photos/web worthy_S6A3224col.JPG",
  "assets/photos/_S6A3098.JPG",
  "assets/photos/IMG_4773.JPG",
  "assets/photos/_S6A3103.JPG",
  "assets/photos/IMG_4779.JPG",
  "assets/photos/carlson-k-CA0233.JPG",
  "assets/photos/IMG_4787.JPG",
  "assets/photos/carlson-k-lifestyle0188.JPG",
  "assets/photos/IMG_4825.JPG",
  "assets/photos/carlson-kaelan-best-serries-award-0.4.JPG",
  "assets/photos/IMG_4868.JPG",
  "assets/photos/oct-11-240166.JPG",
  "assets/photos/IMG_4877.JPG",
  "assets/photos/output-A10015.JPG",
  "assets/photos/sept 23 240381.JPG",
  "assets/photos/output-A10051.JPG",
  "assets/photos/sept 23 240418.JPG",
  "assets/photos/web worthy sept 23 240316 1.JPG",
  "assets/photos/IMG_0014.JPG",
];

const gallery = document.querySelector("#photo-grid");

if (gallery) {
  const fragment = document.createDocumentFragment();
  let activePhotoIndex = 0;
  let activeTrigger = null;

  const optimizedPhoto = (source, folder) => {
    const pathParts = source.split("/");
    const fileName = pathParts.pop();
    return `${pathParts.join("/")}/${folder}/${fileName}`;
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
    activePhotoIndex = (index + photoFiles.length) % photoFiles.length;
    const source = photoFiles[activePhotoIndex];
    viewerImage.src = optimizedPhoto(source, "large");
    viewerImage.alt = `Photography image ${String(activePhotoIndex + 1).padStart(3, "0")}`;
    viewerCount.textContent = `${activePhotoIndex + 1} / ${photoFiles.length}`;
  };

  const openViewer = (index, trigger) => {
    activeTrigger = trigger;
    setViewerPhoto(index);
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

  const showPreviousPhoto = () => setViewerPhoto(activePhotoIndex - 1);
  const showNextPhoto = () => setViewerPhoto(activePhotoIndex + 1);

  photoFiles.forEach((source, index) => {
    const slotNumber = String(index + 1).padStart(3, "0");
    const figure = document.createElement("figure");
    figure.className = "photo-card";

    const link = document.createElement("a");
    link.href = optimizedPhoto(source, "large");
    link.dataset.index = String(index);
    link.setAttribute("aria-label", `Open photography image ${slotNumber}`);

    const image = document.createElement("img");
    image.src = optimizedPhoto(source, "thumbs");
    image.alt = `Photography slot ${slotNumber}`;
    image.decoding = "async";
    image.loading = index < 8 ? "eager" : "lazy";
    image.fetchPriority = index < 3 ? "high" : "low";

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
    openViewer(Number(link.dataset.index), link);
  });

  closeButton.addEventListener("click", closeViewer);
  previousButton.addEventListener("click", showPreviousPhoto);
  nextButton.addEventListener("click", showNextPhoto);

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
