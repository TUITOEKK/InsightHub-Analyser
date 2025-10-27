// Get references
const contentDiv = document.getElementById("mainContent");
const facebookBtn = document.getElementById("facebookBtn");

// Load Facebook content dynamically
facebookBtn.addEventListener("click", () => {
  fetch("home.html")
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const inner = doc.body.innerHTML;
      contentDiv.innerHTML = inner;

      // Load Facebook page CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "home.css";
      document.head.appendChild(link);

      // Load Facebook page JS
      const script = document.createElement("script");
      script.src = "home.js";
      document.body.appendChild(script);
    })
    .catch(error => {
      contentDiv.innerHTML = "<p style='color:red; text-align:center;'>Failed to load Facebook page.</p>";
      console.error("Error loading Facebook page:", error);
    });
});
