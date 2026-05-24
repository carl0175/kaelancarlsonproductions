const photoFiles = [
  "assets/photos/2S7A2556.JPG",
  "assets/photos/2S7A2566.JPG",
  "assets/photos/2S7A2570.JPG",
  "assets/photos/306A0049.JPG",
  "assets/photos/446BC91C-4D73-4BC1-8572-D5BA7368AC78.JPG",
  "assets/photos/52E60263-196B-423A-8826-38B815BAC1D7.JPG",
  "assets/photos/838BBD80-F2AE-43C1-8E5D-172168EC0925.JPG",
  "assets/photos/8706C617-FA22-40E3-A852-85329315068D.JPG",
  "assets/photos/8F7B4A93-43CE-4F7B-9C63-9B122A887E3B.JPG",
  "assets/photos/AFA95030-7879-4D30-B86C-EEC29ACA0172.JPG",
  "assets/photos/Amyot F20251119_17400437.jpg",
  "assets/photos/B1C3D4D3-17EB-4DA8-87F6-84BBA604F8F8.JPG",
  "assets/photos/BB43EB6A-58CD-4FDA-B9C8-BA038BBAE1DC.JPG",
  "assets/photos/Carlson k SP 2 2.JPG",
  "assets/photos/Carlson k SP 2 6.jpg",
  "assets/photos/IMG_0014.JPG",
  "assets/photos/IMG_0315.JPG",
  "assets/photos/IMG_4119.JPG",
  "assets/photos/IMG_4743.JPG",
  "assets/photos/IMG_4769.JPG",
  "assets/photos/IMG_4773.JPG",
  "assets/photos/IMG_4779.JPG",
  "assets/photos/IMG_4787.JPG",
  "assets/photos/IMG_4825.JPG",
  "assets/photos/IMG_4868.JPG",
  "assets/photos/IMG_4877.JPG",
  "assets/photos/_53A2040.JPG",
  "assets/photos/_81A2714 2.JPG",
  "assets/photos/_81A2716.JPG",
  "assets/photos/_81A2800.JPG",
  "assets/photos/_81A2815.JPG",
  "assets/photos/_D3A3378.JPG",
  "assets/photos/_D3A3416.JPG",
  "assets/photos/_S6A3098.JPG",
  "assets/photos/_S6A3103.JPG",
  "assets/photos/carlson-k-CA0233.JPG",
  "assets/photos/carlson-k-lifestyle0188.JPG",
  "assets/photos/carlson-kaelan-best-serries-award-0.4.JPG",
  "assets/photos/k c p .PNG",
  "assets/photos/oct-11-240166.JPG",
  "assets/photos/output-A10015.JPG",
  "assets/photos/output-A10051.JPG",
  "assets/photos/sept 23 240381.JPG",
  "assets/photos/sept 23 240418.JPG",
  "assets/photos/web worthy sept 23 240316 1.JPG",
  "assets/photos/web worthyIMG_4044.JPG",
  "assets/photos/web worthyIMG_4126.JPG",
  "assets/photos/web worthyIMG_4174.JPG",
  "assets/photos/web worthyIMG_4185.JPG",
  "assets/photos/web worthy_S6A3224col.JPG",
];

const gallery = document.querySelector("#photo-grid");
const totalPhotoSpots = 100;
const emptyRatios = ["1 / 1", "4 / 5", "5 / 4", "16 / 9", "9 / 16", "3 / 2", "2 / 3"];

if (gallery) {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < totalPhotoSpots; index += 1) {
    const slotNumber = String(index + 1).padStart(3, "0");
    const source = photoFiles[index];
    const figure = document.createElement("figure");
    figure.className = "photo-card";

    if (source) {
      const link = document.createElement("a");
      link.href = source;
      link.target = "_blank";
      link.rel = "noreferrer";

      const image = document.createElement("img");
      image.src = source;
      image.alt = `Photography slot ${slotNumber}`;
      image.loading = "lazy";
      image.decoding = "async";

      link.append(image);
      figure.append(link);
    } else {
      figure.classList.add("is-empty");
      figure.style.setProperty("--ratio", emptyRatios[index % emptyRatios.length]);
      const label = document.createElement("span");
      label.textContent = `Photo ${slotNumber}`;
      figure.append(label);
    }

    fragment.append(figure);
  }

  gallery.append(fragment);
}
