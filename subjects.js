// Sample subject data (replace with API fetch)
const subjects = [
    {
        id: 1,
        name: "Mathematics",
        nameSw: "Hisabati",
        lessons: 20,
        quizzes: 10,
        progress: 60,
        image: "https://via.placeholder.com/300x150?text=Math",
    },
    {
        id: 2,
        name: "English",
        nameSw: "Kiingereza",
        lessons: 15,
        quizzes: 8,
        progress: 45,
        image: "https://via.placeholder.com/300x150?text=English",
    },
    {
        id: 3,
        name: "Kiswahili",
        nameSw: "Kiswahili",
        lessons: 18,
        quizzes: 9,
        progress: 70,
        image: "https://via.placeholder.com/300x150?text=Kiswahili",
    },
    {
        id: 4,
        name: "Biology",
        nameSw: "Biolojia",
        lessons: 22,
        quizzes: 12,
        progress: 30,
        image: "https://via.placeholder.com/300x150?text=Biology",
    },
];

// DOM Elements
const subjectGrid = document.getElementById("subject-grid");
const searchInput = document.getElementById("search-input");
const langToggle = document.getElementById("lang-toggle");
const subjectsTitle = document.getElementById("subjects-title");

// Language state
let isKiswahili = false;

// Render subjects
function renderSubjects(subjects) {
    subjectGrid.innerHTML = "";
    subjects.forEach(subject => {
        const subjectCard = document.createElement("div");
        subjectCard.className = "subject-card";
        subjectCard.setAttribute("role", "button");
        subjectCard.setAttribute("tabindex", "0");
        subjectCard.innerHTML = `
            <img src="${subject.image}" alt="${isKiswahili ? subject.nameSw : subject.name}">
            <div class="subject-card-content">
                <h3>${isKiswahili ? subject.nameSw : subject.name}</h3>
                <p>${subject.lessons} ${isKiswahili ? "Masomo" : "Lessons"}, ${
            subject.quizzes
        } ${isKiswahili ? "Majaribio" : "Quizzes"}</p>
                <div class="progress-bar">
                    <div style="width: ${subject.progress}%"></div>
                </div>
            </div>
        `;
        subjectCard.addEventListener("click", () => {
            window.location.href = `lessons.html?subject=${subject.id}`;
        });
        subjectCard.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                window.location.href = `lessons.html?subject=${subject.id}`;
            }
        });
        subjectGrid.appendChild(subjectCard);
    });
}

// Search functionality
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredSubjects = subjects.filter(subject =>
        (isKiswahili ? subject.nameSw : subject.name).toLowerCase().includes(query)
    );
    renderSubjects(filteredSubjects);
});

// Language toggle
langToggle.addEventListener("click", () => {
    isKiswahili = !isKiswahili;
    langToggle.textContent = isKiswahili ? "English" : "Kiswahili";
    subjectsTitle.textContent = isKiswahili ? "Chunguza Masomo" : "Explore Subjects";
    searchInput.placeholder = isKiswahili ? "Tafuta masomo..." : "Search subjects...";
    renderSubjects(subjects);
});

// Fetch subjects from API (placeholder)
async function fetchSubjects() {
    try {
        // Replace with actual API endpoint
        // const response = await fetch('/api/subjects');
        // const subjects = await response.json();
        renderSubjects(subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}

// Initialize
fetchSubjects();