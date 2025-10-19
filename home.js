const linkInput = document.getElementById("linkInput");
const checkIcon = document.getElementById("checkIcon");
const statusBtn = document.getElementById("statusBtn");

function checkLink() {
    const link = linkInput.value.trim();
    if (link === "") {
        statusBtn.textContent = "Status";
        checkIcon.textContent = "?";
        checkIcon.style.backgroundColor = "#ccc";
        checkIcon.style.color = "#333";
        return;
    }

    const facebookPattern = /^https?:\/\/(www\.)?facebook\.com\/.+/i;

    if (facebookPattern.test(link)) {
        statusBtn.textContent = "Valid Facebook Link";
        statusBtn.style.backgroundColor = "#4caf50";
        checkIcon.textContent = "✔";
        checkIcon.style.backgroundColor = "#4caf50";
        checkIcon.style.color = "white";
    } else {
        statusBtn.textContent = "Invalid Link";
        statusBtn.style.backgroundColor = "#f44336";
        checkIcon.textContent = "✖";
        checkIcon.style.backgroundColor = "#f44336";
        checkIcon.style.color = "white";
    }
}

// Run when typing stops for 1 second
let typingTimer;
linkInput.addEventListener("input", function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(checkLink, 1000);
});

// Run when user pastes
linkInput.addEventListener("paste", function() {
    setTimeout(checkLink, 300);
});
