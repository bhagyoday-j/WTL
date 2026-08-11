// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon between list and cross (using simple text characters for simplicity)
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '&#10005;'; // Cross mark
            } else {
                menuToggle.innerHTML = '&#9776;'; // Hamburger
            }
        });
    }

    // Free weather widget using Open-Meteo API
    const weatherWidget = document.getElementById('weather-widget');
    const weatherLocation = document.getElementById('weather-location');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherCondition = document.getElementById('weather-condition');
    const weatherWind = document.getElementById('weather-wind');
    const weatherHumidity = document.getElementById('weather-humidity');
    const weatherIcon = document.getElementById('weather-icon');

    if (weatherWidget && weatherLocation && weatherTemp && weatherCondition && weatherWind && weatherHumidity && weatherIcon) {
        const city = weatherWidget.dataset.city || 'Kopargaon';
        fetchWeather(city, weatherWidget, weatherLocation, weatherTemp, weatherCondition, weatherWind, weatherHumidity, weatherIcon);
    }

    // Simple Form Validation for Contact Form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission for demo
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate successful submission
            alert(`Thank you, ${name}! Your message has been received. We will contact you soon.`);
            contactForm.reset();
        });
    }
});

async function fetchWeather(city, widget, locationEl, tempEl, conditionEl, windEl, humidityEl, iconEl) {
    try {
        const geocodeRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geocodeData = await geocodeRes.json();
        const place = geocodeData.results?.[0];

        if (!place) {
            throw new Error('Location not found');
        }

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`);
        const weatherData = await weatherRes.json();
        const current = weatherData.current;

        locationEl.textContent = `${place.name}, ${place.country}`;
        tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
        conditionEl.textContent = getWeatherDescription(current.weather_code);
        windEl.textContent = `Wind: ${Math.round(current.wind_speed_10m)} km/h`;
        humidityEl.textContent = `Humidity: ${Math.round(current.relative_humidity_2m)}%`;
        iconEl.textContent = getWeatherIcon(current.weather_code);
        widget.classList.remove('is-loading');
    } catch (error) {
        locationEl.textContent = 'Weather unavailable';
        tempEl.textContent = '--°C';
        conditionEl.textContent = 'Please try again later';
        windEl.textContent = '';
        humidityEl.textContent = '';
        iconEl.textContent = '☁️';
        widget.classList.remove('is-loading');
    }
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mostly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Drizzle',
        55: 'Heavy drizzle',
        61: 'Light rain',
        63: 'Rain',
        65: 'Heavy rain',
        71: 'Light snow',
        73: 'Snow',
        75: 'Heavy snow',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Severe thunderstorm'
    };

    return descriptions[code] || 'Pleasant weather';
}

function getWeatherIcon(code) {
    if (code === 0 || code === 1) {
        return '☀️';
    }
    if (code === 2 || code === 3) {
        return '☁️';
    }
    if (code >= 45 && code <= 48) {
        return '🌫️';
    }
    if (code >= 51 && code <= 65) {
        return '🌧️';
    }
    if (code >= 71 && code <= 75) {
        return '❄️';
    }
    if (code >= 95) {
        return '⛈️';
    }
    return '🌤️';
}
