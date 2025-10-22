// Facebook link validation
const linkInput = document.getElementById("linkInput");
const checkIcon = document.getElementById("checkIcon");
const statusBtn = document.getElementById("statusBtn");

function checkLink() {
    const link = linkInput.value.trim();
    if (link === "") {
        statusBtn.textContent = "Status";
        statusBtn.style.backgroundColor = "#fafafa";
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


// Filter and Add button logic
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const filterGroup = document.querySelector('.filter-group');
    const dateRange = document.getElementById('dateRange');
    const fromDate = document.getElementById('fromDate');
    const toDate = document.getElementById('toDate');
    let dropdownMenu = null;

    const options = ['Most Recommended', 'High Comments', 'Date Manual Set'];
    let dateButton = null;

    // Handle Add (+) click
    addBtn.addEventListener('click', (e) => {
        if (dropdownMenu) {
            dropdownMenu.remove();
            dropdownMenu = null;
            return;
        }

        dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';

        options.forEach(option => {
            const item = document.createElement('button');
            item.className = 'dropdown-item';
            item.textContent = option;
            item.addEventListener('click', () => handleOptionSelect(option));
            dropdownMenu.appendChild(item);
        });

        const rect = addBtn.getBoundingClientRect();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = rect.bottom + 'px';
        dropdownMenu.style.left = rect.left + 'px';
        document.body.appendChild(dropdownMenu);
    });

    // Handle option selection
    function handleOptionSelect(option) {
        dropdownMenu.remove();
        dropdownMenu = null;

        if (option === 'Date Manual Set') {
            dateRange.classList.remove('hidden');

            // If date button not yet created
            if (!dateButton) {
                dateButton = document.createElement('button');
                dateButton.className = 'filter-btn active-filter';
                dateButton.textContent = 'Date';
                filterGroup.insertBefore(dateButton, addBtn);

                dateButton.addEventListener('click', () => {
                    setActiveFilter(dateButton);
                });
            } else {
                setActiveFilter(dateButton);
            }

        } else {
            dateRange.classList.add('hidden');
            const exists = Array.from(document.querySelectorAll('.filter-btn'))
                .some(btn => btn.textContent === option);
            if (!exists) {
                const newBtn = document.createElement('button');
                newBtn.className = 'filter-btn';
                newBtn.textContent = option;
                newBtn.addEventListener('click', () => {
                    setActiveFilter(newBtn);
                });
                filterGroup.insertBefore(newBtn, addBtn);
            }
            const newBtn = Array.from(document.querySelectorAll('.filter-btn'))
                .find(btn => btn.textContent === option);
            setActiveFilter(newBtn);
        }
    }

    // Set active blue button
    function setActiveFilter(button) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
        button.classList.add('active-filter');
    }

    // Close dropdown if clicked outside
    document.addEventListener('click', (e) => {
        if (dropdownMenu && !addBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.remove();
            dropdownMenu = null;
        }
    });

    // When date selected, update button text
    fromDate.addEventListener('change', updateDateButton);
    toDate.addEventListener('change', updateDateButton);

    function updateDateButton() {
        if (fromDate.value && toDate.value) {
            const rangeText = formatDate(fromDate.value) + " - " + formatDate(toDate.value);
            if (dateButton) {
                dateButton.textContent = rangeText;
            }
            setActiveFilter(dateButton);
        }
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
});
