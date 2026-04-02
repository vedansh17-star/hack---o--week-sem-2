// Static weather data for 3 cities
const weatherData = {
    'New York': {
        temp: 22,
        description: 'Partly Cloudy',
        humidity: 65,
        wind: 10,
        icon: 'fas fa-cloud-sun-rain'
    },
    'London': {
        temp: 18,
        description: 'Light Rain',
        humidity: 80,
        wind: 15,
        icon: 'fas fa-cloud-rain'
    },
    'Tokyo': {
        temp: 28,
        description: 'Sunny',
        humidity: 50,
        wind: 8,
        icon: 'fas fa-sun'
    }
};

// Simple interactivity: Update time and add click animation
function updateWeatherPanel() {
    const cards = document.querySelectorAll('.weather-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Update last updated time
    const now = new Date();
    const timeString = now.toLocaleString();
    console.log(`Weather panel updated at: ${timeString}`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateWeatherPanel);
