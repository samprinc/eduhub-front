// Toggle Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fetch Student Data (Mock API Call)
async function loadDashboard() {
    try {
        // Simulate fetching data from Django REST API
        const response = await fetch('/api/student/dashboard', {
            headers: { 'Authorization': 'Bearer <token>' }
        });
        const data = await response.json();

        // Update Student Name
        document.getElementById('student-name').textContent = data.student_name;

        // Populate Recent Lessons
        const lessonGrid = document.getElementById('lesson-grid');
        data.recent_lessons.forEach(lesson => {
            const lessonCard = `
                <div class="lesson-card">
                    <img src="${lesson.thumbnail || 'https://via.placeholder.com/300x150'}" alt="${lesson.title}">
                    <h3>${lesson.title}</h3>
                    <p>${lesson.subject} - Form ${lesson.form}</p>
                </div>
            `;
            lessonGrid.innerHTML += lessonCard;
        });

        // Populate Notifications
        const notificationList = document.getElementById('notification-list');
        data.notifications.forEach(notification => {
            const notificationItem = `
                <li class="${notification.read ? '' : 'unread'}">
                    <strong>${notification.title}</strong>
                    <p>${notification.message}</p>
                    <small>${new Date(notification.date).toLocaleString()}</small>
                </li>
            `;
            notificationList.innerHTML += notificationItem;
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Failed to load dashboard. Please try again.');
    }
}

// Load dashboard on page load
document.addEventListener('DOMContentLoaded', loadDashboard);

// Logout Handler
document.getElementById('logout').addEventListener('click', () => {
    // Clear token and redirect to login
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

async function loadLesson() {
    const lessonId = new URLSearchParams(window.location.search).get('id');
    try {
        const response = await fetch(`/api/lessons/${lessonId}`);
        const lesson = await response.json();

        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-video').src = lesson.video_url;
        document.getElementById('lesson-text').innerHTML = lesson.content;
        document.getElementById('download-notes').href = lesson.notes_url;
        document.getElementById('take-quiz').href = `quiz.html?id=${lesson.quiz_id}`;

        document.getElementById('mark-complete').addEventListener('click', async () => {
            await fetch(`/api/lessons/${lessonId}/complete`, { method: 'POST' });
            alert('Lesson marked as completed!');
        });
    } catch (error) {
        console.error('Error loading lesson:', error);
        alert('Failed to load lesson.');
    }
}

document.addEventListener('DOMContentLoaded', loadLesson);