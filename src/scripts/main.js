
document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement;
  const mediaQuery = "(prefers-color-scheme: dark)";
  const mediaMatch = window.matchMedia;
  const currentMode = mediaMatch(mediaQuery).matches;

  const storeTheme = (targetTheme) => {
    if ("boolean" === typeof targetTheme) {
      targetTheme = targetTheme ? "dark" : "light";
    }

    root.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
  };

  const storedTheme = ("theme" in localStorage)
    ? localStorage.getItem("theme")
    : currentMode;

  storedTheme && storeTheme(storedTheme);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme =
      (getComputedStyle(root).getPropertyValue("color-scheme") == "light");
    storeTheme(!!currentTheme);
  });

  mediaMatch(mediaQuery).addEventListener("change", (event) => {
    storeTheme(event.matches);
  });

  document.querySelector(".menu-button")?.addEventListener("click", () => {
    const element = document.querySelector('.mobile-menu');

    if (element) {
      element.classList.remove("hidden");
    }
  });

  document.querySelector(".menu-close-button")?.addEventListener("click", () => {
    const element = document.querySelector('.mobile-menu');

    if (element) {
      element.classList.add("hidden");
    }
  });

  document.querySelector(".article-back")?.addEventListener("click", () => {
    history.back()
  });


  // header navbar active item
  function activeNav() {
    const pathName = window.location.pathname

    if (pathName) {
      const el = document.getElementById(pathName);
      if (el) {
        el.classList.add('active-nav')

        const spanElement = el.querySelector('span');
        spanElement.classList.remove('hidden')
      }
    }
  }

  activeNav()
})
