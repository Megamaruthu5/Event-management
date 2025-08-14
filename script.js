function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Event data with background image URL
const events = [
    {
        id: 1,
        title: "Music Concert",
        date: "15th August 2025",
        time: "7:00 PM",
        location: "City Arena",
        description: "Experience an unforgettable evening with live performances from top artists.",
        image: "https://cdn.augrav.com/online/jewels/2015/12/Xs-wedding-planners-Hyderabad.jpg",
        price: "$50",
        category: "Music"
    },
    {
        id: 2,
        title: "Wedding Ceremony",
        date: "20th September 2025",
        time: "4:00 PM",
        location: "Grand Ballroom",
        description: "A beautiful wedding ceremony with elegant decorations and perfect arrangements.",
        image: "https://cdn.augrav.com/online/jewels/2015/12/Xs-wedding-planners-Hyderabad.jpg",
        price: "Contact for pricing",
        category: "Wedding"
    },
    {
        id: 3,
        title: "Corporate Conference",
        date: "10th October 2025",
        time: "9:00 AM",
        location: "Business Center",
        description: "Professional conference with keynote speakers and networking opportunities.",
        image: "https://cdn.augrav.com/online/jewels/2015/12/Xs-wedding-planners-Hyderabad.jpg",
        price: "$100",
        category: "Corporate"
    }
];

// Initialize events on page load
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
});

// Load events based on current page
function loadEvents() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'events.html') {
        displayEvents();
    } else if (currentPage === 'event.html') {
        loadEventDetails();
    }
}

// Display events on events page
function displayEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image-container">
                <div class="event-image-background"></div>
                <div class="event-image-overlay">
                    <img src="${event.image}" alt="${event.title}" class="event-main-image">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Price:</strong> ${event.price}</p>
                    <button class="btn-view-event" onclick="navigateToEvent(${event.id})">View Details</button>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Navigate to event details page
function navigateToEvent(eventId) {
    window.location.href = `event.html?id=${eventId}`;
}

// Load event details on event page
function loadEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    
    if (!eventId) {
        window.location.href = 'events.html';
        return;
    }
    
    const event = events.find(e => e.id === eventId);
    if (!event) {
        window.location.href = 'events.html';
        return;
    }
    
    const eventDetailsContainer = document.getElementById('eventDetailsContainer');
    if (!eventDetailsContainer) return;
    
    eventDetailsContainer.innerHTML = `
        <div class="event-details">
            <h2>${event.title}</h2>
            <div class="event-image-container">
                <div class="event-image-background"></div>
                <div class="event-image-overlay">
                    <img src="${event.image}" alt="${event.title}" class="event-main-image">
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Price:</strong> ${event.price}</p>
                    <p><strong>Description:</strong> ${event.description}</p>
                </div>
            </div>
        </div>
    `;
}
