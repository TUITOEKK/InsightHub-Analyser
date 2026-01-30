const contentDiv = document.getElementById("mainContent");
const facebookBtn = document.getElementById("facebookBtn");

let facebookCSSLoaded = false;

facebookBtn.addEventListener("click", () => {
  setActive(facebookBtn);

  fetch("facebookhm.html")
    .then(res => res.text())
    .then(html => {
      contentDiv.innerHTML = html;

      // Load CSS once
      if (!facebookCSSLoaded) {
        loadCSS("facebookhm.css");
        facebookCSSLoaded = true;
      }

      // ALWAYS reload JS so it binds to new DOM
      loadJS("facebookhm.js");
    })
    .catch(err => {
      contentDiv.innerHTML =
        "<p style='color:red; text-align:center;'>Failed to load Facebook UI.</p>";
      console.error(err);
    });
});

function loadCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

function loadJS(src) {
  // Remove old script if exists
  const oldScript = document.querySelector(`script[src="${src}"]`);
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.body.appendChild(script);
}

function setActive(btn) {
  document.querySelectorAll(".top-bar button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
