let currentTheme = localStorage.getItem("theme") ?? "dark";
const themeButton = document.getElementById("theme-button");
const darkIconEl = document.getElementById("dark-icon");
const lightIconEl = document.getElementById("light-icon");
const socialElements = document.getElementsByClassName("social");
const socialImages = Array.prototype.filter.call(
  socialElements,
  (testElement) => {
    console.log("testElement", testElement);
    return testElement.type !== "img";
  }
);

socialImages.map((el) => {
  let src = el.src;
  if (currentTheme === "light") {
    src = src.replace("-dark", "");
  } else {
    if (!src.includes("dark")) {
      src = `${src}`.split(".png")[0] + "-dark.png";
    }
  }
  el.src = src;
});

const themes = {
  background: { dark: "#292524", light: "#fdf8f6" },
  body: { dark: "#79716b", light: "#fff" },
  border: { dark: "#57534d", light: "#ccbcb8" },
  text: { dark: "#0c0a09", light: "#1f2937" },
  "text-light": { dark: "#d6d3d1", light: "#6b7280" },
  "light-accent": { dark: "#d6d3d1", light: "#252d3b" },
  light: { dark: "#d6d3d1", light: "#6b7280" },
  accent: { dark: "#802f2f", light: "#7f1d1d" },
};

handleThemeChange();

themeButton.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);

  socialImages.map((el) => {
    let src = el.src;
    if (currentTheme === "light") {
      src = src.replace("-dark", "");
    } else {
      if (!src.includes("dark")) {
        src = `${src}`.split(".png")[0] + "-dark.png";
      }
    }
    el.src = src;
  });

  handleThemeChange();
});

function handleThemeChange() {
  if (currentTheme === "light") {
    darkIconEl.classList.add("active-theme");
    lightIconEl.classList.remove("active-theme");
  } else {
    darkIconEl.classList.remove("active-theme");
    lightIconEl.classList.add("active-theme");
  }

  try {
    document.documentElement.style.setProperty(
      "--color-background",
      themes.background[currentTheme ?? "dark"]
    );
    document.documentElement.style.setProperty(
      "--color-body",
      themes.body[currentTheme ?? "dark"]
    );
    document.documentElement.style.setProperty(
      "--color-border",
      themes.border[currentTheme ?? "dark"]
    );
    document.documentElement.style.setProperty(
      "--color-text",
      themes.text[currentTheme ?? "dark"]
    );
    document.documentElement.style.setProperty(
      "--color-text-light",
      themes["text-light"][currentTheme ?? "dark"]
    );
    document.documentElement.style.setProperty(
      "--color-light-accent",
      themes["light-accent"][currentTheme ?? "dark"]
    );
    document.documentElement.style.setProperty(
      "--color-light",
      themes.light[currentTheme ?? "dark"]
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      themes.accent[currentTheme ?? "dark"]
    );
  } catch (err) {
    console.log("handle theme err", err);
  }
}
