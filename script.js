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
    initializeAboutPageFeatures();
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

// About Page Features
function initializeAboutPageFeatures() {
    // Video control functionality
    function toggleVideo() {
        const video = document.getElementById('heroVideo');
        const button = document.querySelector('.video-control i');
        
        if (video && button) {
            if (video.paused) {
                video.play();
                button.className = 'fas fa-pause';
            } else {
                video.pause();
                button.className = 'fas fa-play';
            }
        }
    }

    // Improved animated counter for statistics using requestAnimationFrame
    function animateCounter(counter, target, duration = 2000) {
        let startTime = null;
        const startValue = 0;
        
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * target);
            
            counter.innerText = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    function animateAllCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            animateCounter(counter, target, 2000);
        });
    }

    // Initialize AOS animations if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out',
            delay: 100
        });
    }

    // Enhanced Intersection Observer for counter animation
    const statsSection = document.querySelector('.stats-dashboard');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateAllCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(statsSection);
    }

    // Enhanced Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            timelineObserver.observe(item);
        });
    }

    // Team member interactions
    function initializeTeamInteractions() {
        const teamCards = document.querySelectorAll('.team-card');
        
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
            
            // Animate skill bars on scroll into view
            const skillBars = card.querySelectorAll('.progress-fill');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                const barObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                bar.style.transition = 'width 1.5s ease-in-out';
                                bar.style.width = width;
                            }, 200);
                            barObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                barObserver.observe(card);
            });
        });
    }

    // Initialize team interactions
    initializeTeamInteractions();

    // Smooth scrolling for navigation
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeSmoothScrolling();

    // Make toggleVideo function globally available
    window.toggleVideo = toggleVideo;

    // Initialize any other interactive elements
    console.log('About page features initialized successfully');
}
