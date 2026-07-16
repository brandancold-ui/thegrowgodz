const navigationIntroKey = "grow-godz-navigation-intro-played";
const mobileNavigationQuery = window.matchMedia("(max-width: 1100px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let navigationIntroPlayed = true;
let navigationStorageAvailable = true;

try {
  navigationIntroPlayed = sessionStorage.getItem(navigationIntroKey) === "true";
} catch {
  navigationStorageAvailable = false;
}

const shouldAnimateNavigationIntro =
  navigationStorageAvailable &&
  !navigationIntroPlayed &&
  mobileNavigationQuery.matches &&
  !reducedMotionQuery.matches;

const markNavigationIntroPlayed = () => {
  if (!navigationStorageAvailable) return;

  try {
    sessionStorage.setItem(navigationIntroKey, "true");
  } catch {
    navigationStorageAvailable = false;
  }
};

document.documentElement.classList.add("nav-enabled");

if (shouldAnimateNavigationIntro) {
  document.documentElement.classList.add("nav-intro-pending");
} else if (navigationStorageAvailable && !navigationIntroPlayed) {
  markNavigationIntroPlayed();
}

document.querySelectorAll(".site-header").forEach((header) => {
  const toggle = header.querySelector(".nav-toggle");
  const navigation = header.querySelector(".nav");

  if (!toggle || !navigation) return;

  if (shouldAnimateNavigationIntro) {
    window.setTimeout(() => {
      document.documentElement.classList.remove("nav-intro-pending");
      toggle.classList.add("nav-intro-active");
      markNavigationIntroPlayed();

      toggle.addEventListener("animationend", () => {
        toggle.classList.remove("nav-intro-active");
      }, { once: true });
    }, 1000);
  }

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
