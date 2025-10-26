const contentDiv = document.getElementById("mainContent");
const facebookBtn = document.getElementById("facebookBtn");

facebookBtn.addEventListener("click", () => {
  fetch("home.html")
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Only grab the <div class="container"> content from home.html
      const container = doc.querySelector(".container");
      if (container) {
        contentDiv.innerHTML = container.outerHTML;
      } else {
        contentDiv.innerHTML = "<p style='color:red;'>Container not found in home.html</p>";
        return;
      }

      // Add home.css if not already loaded
      if (!document.querySelector('link[href="home.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "home.css";
        document.head.appendChild(link);
      }

      // Load home.js for Facebook page behavior
      const script = document.createElement("script");
      script.src = "home.js";
      document.body.appendChild(script);
    })
    .catch(error => {
      contentDiv.innerHTML = "<p style='color:red;'>Failed to load Facebook page.</p>";
      console.error("Error loading Facebook content:", error);
    });
});