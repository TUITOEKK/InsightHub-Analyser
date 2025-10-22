// ----------------------
// Link Checking Section
// ----------------------
const linkInput = document.getElementById("linkInput");
const checkIcon = document.getElementById("checkIcon");
const statusBtn = document.getElementById("statusBtn");

function checkLink() {
    const link = linkInput.value.trim();
    if (link === "") {
        statusBtn.textContent = "Status";
        statusBtn.style.backgroundColor = "";
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

// ----------------------
// Filter Button Section
// ----------------------
const filterGroup = document.querySelector('.filter-group');
const filterButtons = document.querySelectorAll('.filter-btn');
const addButton = document.querySelector('.add-btn');

// Handle filter selection
function handleFilterClick(event) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active-filter');
    });
    event.target.classList.add('active-filter');
    console.log('Selected filter:', event.target.textContent);
}

// Attach click events to existing filters
filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterClick);
});

// Create dropdown for Add button
const dropdown = document.createElement('div');
dropdown.classList.add('dropdown-menu');
dropdown.style.display = 'none';
dropdown.innerHTML = `
    <button class="dropdown-item">Most Recommended</button>
    <button class="dropdown-item">High Comments</button>
    <button class="dropdown-item">Date Manual Set</button>
`;
document.body.appendChild(dropdown);

// Position dropdown under Add button
function showDropdown() {
    const rect = addButton.getBoundingClientRect();
    dropdown.style.left = rect.left + 'px';
    dropdown.style.top = rect.bottom + 'px';
    dropdown.style.display = 'block';
}

// Hide dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target) && event.target !== addButton) {
        dropdown.style.display = 'none';
    }
});

// Toggle dropdown when Add button clicked
addButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        showDropdown();
    }
});

// Handle dropdown item click
dropdown.addEventListener('click', (event) => {
    if (event.target.classList.contains('dropdown-item')) {
        const newFilter = event.target.textContent;
        const newBtn = document.createElement('button');
        newBtn.textContent = newFilter;
        newBtn.classList.add('filter-btn');
        newBtn.addEventListener('click', handleFilterClick);
        filterGroup.appendChild(newBtn);
        dropdown.style.display = 'none';
    }
});
