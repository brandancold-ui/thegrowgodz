document.documentElement.classList.add("nav-enabled");

document.querySelectorAll(".site-header").forEach((header) => {
  const toggle = header.querySelector(".nav-toggle");
  const navigation = header.querySelector(".nav");

  if (!toggle || !navigation) return;

  const closeMenu = () => {
    navigation.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open main navigation");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    navigation.dataset.open = String(!isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open main navigation" : "Close main navigation");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });

  window.matchMedia("(min-width: 1101px)").addEventListener("change", closeMenu);
});
