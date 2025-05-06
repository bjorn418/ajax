document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const conditions = document.getElementById('conditions');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim().toLowerCase();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    });

    function fetchWeatherData(city) {
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Configure the request
        xhr.open('GET', 'weatherData.json', true);
        
        // Set up the callback function
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const weatherData = JSON.parse(xhr.responseText);
                    
                    if (weatherData[city]) {
                        // Update the UI with the weather data
                        cityName.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                        temperature.textContent = weatherData[city].temperature;
                        humidity.textContent = weatherData[city].humidity;
                        conditions.textContent = weatherData[city].conditions;
                    } else {
                        alert('City not found in our database');
                        resetWeatherDisplay();
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error processing weather data');
                    resetWeatherDisplay();
                }
            } else {
                console.error('Error fetching weather data:', xhr.status);
                alert('Error fetching weather data');
                resetWeatherDisplay();
            }
        };
        
        // Handle network errors
        xhr.onerror = function() {
            console.error('Network error occurred');
            alert('Network error occurred');
            resetWeatherDisplay();
        };
        
        // Send the request
        xhr.send();
    }

    function resetWeatherDisplay() {
        cityName.textContent = '-';
        temperature.textContent = '-';
        humidity.textContent = '-';
        conditions.textContent = '-';
    }
}); 

// This project is a web-based weather application built using JavaScript, HTML, and a local JSON file to simulate weather data. The main goal of the application is to allow the user to enter a city name, click a search button, and view that city’s weather details — such as temperature, humidity, and general conditions — which are retrieved from a local file (weatherData.json). The JavaScript code uses Document Object Model (DOM) manipulation to interact with the HTML elements, capturing the user’s input, triggering events, and updating display areas dynamically. When the search button is clicked, an event listener calls a function that creates an XMLHttpRequest (XHR) object to asynchronously fetch the local JSON file, avoiding a full-page reload. Once the file is successfully loaded (status code 200), the program parses the JSON data into a JavaScript object and checks if the entered city exists in the dataset. If the city is found, its details are displayed on the page by updating the relevant HTML fields; if not, an alert is shown and the display fields are reset. The code also includes robust error handling to manage network issues or JSON parsing errors, ensuring a smooth user experience. This application serves as a simple example of client-side asynchronous programming, JSON data handling, and dynamic content rendering in a web browser. However, it is limited because it uses static, predefined weather data and does not interact with real-time external APIs or databases, meaning the information is fixed and only updates if the JSON file is manually modified.