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
