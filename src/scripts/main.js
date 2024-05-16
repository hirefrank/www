function themeIcons() {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === 'dark') {
    document.querySelector(".light-icon").classList.add("hidden");
    document.querySelector(".dark-icon").classList.remove("hidden");
  } else {
    document.querySelector(".dark-icon").classList.add("hidden");
    document.querySelector(".light-icon").classList.remove("hidden");
  }
}

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  themeIcons()
};

document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
} else {
  document.documentElement.setAttribute("data-theme", "light"); // or any default theme
}

themeIcons()

document.querySelector(".menu-button")?.addEventListener("click", ()  => {
  const element = document.querySelector('.mobile-menu');

  if (element) {
    element.classList.remove("hidden");
  }
});

document.querySelector(".menu-close-button")?.addEventListener("click", ()  => {
  const element = document.querySelector('.mobile-menu');

  if (element) {
    element.classList.add("hidden");
  }
});

document.querySelector(".article-back")?.addEventListener("click", ()  => {
  history.back()
});


// header navbar active item
function activeNav() {
  const pathName = window.location.pathname

  if (pathName) {
    const el = document.getElementById(pathName);

    el.classList.add('active-nav')

    const spanElement = el.querySelector('span');
    spanElement.classList.remove('hidden')
  }
}

activeNav()
