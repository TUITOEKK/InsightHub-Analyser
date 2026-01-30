// ===============================
// Facebook link validation
// ===============================
const linkInput = document.getElementById("linkInput");
const checkIcon = document.getElementById("checkIcon");
const statusBtn = document.getElementById("statusBtn");
const generateBtn = document.querySelector(".generate-btn");

// Disable generate button initially
generateBtn.disabled = true;
generateBtn.style.opacity = "0.5";
generateBtn.style.cursor = "not-allowed";

function checkLink() {
    const link = linkInput.value.trim();

    if (link === "") {
        statusBtn.textContent = "Status";
        statusBtn.style.backgroundColor = "#fafafa";

        checkIcon.textContent = "?";
        checkIcon.style.backgroundColor = "#ccc";
        checkIcon.style.color = "#333";

        generateBtn.disabled = true;
        generateBtn.style.opacity = "0.5";
        generateBtn.style.cursor = "not-allowed";
        return;
    }

    const facebookPattern = /^https?:\/\/(www\.)?facebook\.com\/.+/i;

    if (facebookPattern.test(link)) {
        statusBtn.textContent = "Valid Facebook Link";
        statusBtn.style.backgroundColor = "#4caf50";

        checkIcon.textContent = "✔";
        checkIcon.style.backgroundColor = "#4caf50";
        checkIcon.style.color = "white";

        // Enable generate button
        generateBtn.disabled = false;
        generateBtn.style.opacity = "1";
        generateBtn.style.cursor = "pointer";
    } else {
        statusBtn.textContent = "Invalid Link";
        statusBtn.style.backgroundColor = "#f44336";

        checkIcon.textContent = "✖";
        checkIcon.style.backgroundColor = "#f44336";
        checkIcon.style.color = "white";

        generateBtn.disabled = true;
        generateBtn.style.opacity = "0.5";
        generateBtn.style.cursor = "not-allowed";
    }
}

// Run when typing stops for 1 second
let typingTimer;
linkInput.addEventListener("input", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(checkLink, 1000);
});

// Run when user pastes
linkInput.addEventListener("paste", function () {
    setTimeout(checkLink, 300);
});

// ===============================
// Filter and Add button logic
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const filterGroup = document.querySelector(".filter-group");
    const dateRange = document.getElementById("dateRange");
    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");

    let dropdownMenu = null;
    let dateButton = null;

    const options = [
        "Most Recommended",
        "High Comments",
        "Date Manual Set"
    ];

    // Make default filter buttons clickable
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => setActiveFilter(btn));
    });

    // Restore saved date range
    const savedFrom = localStorage.getItem("fromDate");
    const savedTo = localStorage.getItem("toDate");

    if (savedFrom && savedTo) {
        fromDate.value = savedFrom;
        toDate.value = savedTo;
        dateRange.classList.remove("hidden");
        showDateButton(savedFrom, savedTo);
    }

    // Add (+) click
    addBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (dropdownMenu) {
            dropdownMenu.remove();
            dropdownMenu = null;
            return;
        }

        dropdownMenu = document.createElement("div");
        dropdownMenu.className = "dropdown-menu";

        options.forEach(option => {
            const item = document.createElement("button");
            item.className = "dropdown-item";
            item.textContent = option;
            item.addEventListener("click", () => handleOptionSelect(option));
            dropdownMenu.appendChild(item);
        });

        const rect = addBtn.getBoundingClientRect();
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.top = rect.bottom + "px";
        dropdownMenu.style.left = rect.left + "px";

        document.body.appendChild(dropdownMenu);
    });

    function handleOptionSelect(option) {
        dropdownMenu.remove();
        dropdownMenu = null;

        if (option === "Date Manual Set") {
            dateRange.classList.remove("hidden");
            showDateButton(fromDate.value, toDate.value);
            return;
        }

        dateRange.classList.add("hidden");

        let btn = Array.from(document.querySelectorAll(".filter-btn"))
            .find(b => b.textContent === option);

        if (!btn) {
            btn = document.createElement("button");
            btn.className = "filter-btn";
            btn.textContent = option;
            btn.addEventListener("click", () => setActiveFilter(btn));
            filterGroup.insertBefore(btn, addBtn);
        }

        setActiveFilter(btn);
    }

    function showDateButton(from = null, to = null) {
        if (!dateButton) {
            dateButton = document.createElement("button");
            dateButton.className = "filter-btn";
            dateButton.addEventListener("click", () => setActiveFilter(dateButton));
            filterGroup.insertBefore(dateButton, addBtn);
        }

        if (from && to) {
            dateButton.textContent =
                formatDate(from) + " - " + formatDate(to);
        } else {
            dateButton.textContent = "Date";
        }

        setActiveFilter(dateButton);
    }

    function setActiveFilter(button) {
        document.querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active-filter"));

        button.classList.add("active-filter");
        console.log("Selected filter:", button.textContent);
    }

    // Close dropdown on outside click
    document.addEventListener("click", () => {
        if (dropdownMenu) {
            dropdownMenu.remove();
            dropdownMenu = null;
        }
    });

    fromDate.addEventListener("change", updateDateButton);
    toDate.addEventListener("change", updateDateButton);

    function updateDateButton() {
        if (fromDate.value && toDate.value) {
            localStorage.setItem("fromDate", fromDate.value);
            localStorage.setItem("toDate", toDate.value);
            showDateButton(fromDate.value, toDate.value);
        }
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    }
});
// ===============================
// Generate button → FastAPI backend
// ===============================
generateBtn.addEventListener("click", async () => {
    const link = linkInput.value.trim();

    if (!link || generateBtn.disabled) return;

    generateBtn.disabled = true;
    generateBtn.textContent = "Analyzing...";

    try {
        const response = await fetch("http://127.0.0.1:8000/analyze/facebook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: link
            })
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        console.log("API Response:", data);

        alert("Analysis completed successfully");

    } catch (error) {
        console.error("Error:", error);
        alert("Backend error. Check FastAPI logs.");
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate";
    }
});

