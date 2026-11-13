const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
const forecastUrl = "https://api.open-meteo.com/v1/forecast";
const airQualityUrl = "https://air-quality-api.open-meteo.com/v1/air-quality";

const weatherCodes = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    48: "🌫️ Depositing rime fog",
    51: "🌦️ Light drizzle",
    53: "🌦️ Moderate drizzle",
    55: "🌧️ Dense drizzle",
    56: "🌧️ Light freezing drizzle",
    57: "🌧️ Dense freezing drizzle",
    61: "🌧️ Slight rain",
    63: "🌧️ Moderate rain",
    65: "🌧️ Heavy rain",
    66: "🌧️ Light freezing rain",
    67: "🌧️ Heavy freezing rain",
    71: "🌨️ Slight snow",
    73: "🌨️ Moderate snow",
    75: "❄️ Heavy snow",
    77: "🌨️ Snow grains",
    80: "🌦️ Slight rain showers",
    81: "🌦️ Moderate rain showers",
    82: "🌧️ Violent rain showers",
    85: "🌨️ Slight snow showers",
    86: "❄️ Heavy snow showers",
    95: "⛈️ Thunderstorm",
    96: "⛈️ Thunderstorm with slight hail",
    99: "⛈️ Thunderstorm with heavy hail"
};

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function getResultElement(resultId) {
    return document.getElementById(resultId);
}

function showLoading(resultId) {
    const result = getResultElement(resultId);
    result.className = "result-box loading";
    result.textContent = "Loading...";
}

function showError(resultId, message) {
    const result = getResultElement(resultId);
    result.className = "result-box error";
    result.textContent = message;
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("The weather service is temporarily unavailable. Please try again.");
    }

    return response.json();
}

async function getCoordinates(cityName) {
    const city = cityName.trim();
    if (!city) {
        throw new Error("Please enter a city name.");
    }

    const params = new URLSearchParams({
        name: city,
        count: "1",
        language: "en",
        format: "json"
    });
    const data = await fetchJson(`${geocodingUrl}?${params}`);
    const location = data.results?.[0];
    if (!location) {
        throw new Error(`No location found for "${city}". Check the spelling and try again.`);
    }

    return {
        lat: location.latitude,
        lon: location.longitude,
        name: location.name,
        country: location.country,
        admin1: location.admin1
    };
}

async function runWeatherRequest(resultId, request) {
    showLoading(resultId);

    try {
        const html = await request();
        const result = getResultElement(resultId);
        result.className = "result-box";
        result.innerHTML = html;
    } catch (error) {
        showError(resultId, error.message || "Unable to load weather data. Please try again.");
    }
}

function describeWeather(code) {
    return weatherCodes[code] || "❔ Unknown conditions";
}

function formatTime(value) {
    return new Date(value).toLocaleString(undefined, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
}

async function getCurrentWeather() {
    await runWeatherRequest("current-weather-result", async () => {
        const location = await getCoordinates(document.getElementById("city-current").value);
        const params = new URLSearchParams({
            latitude: location.lat,
            longitude: location.lon,
            current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m",
            timezone: "auto"
        });
        const data = await fetchJson(`${forecastUrl}?${params}`);
        const current = data.current;

        return `<div class="weather-data">
            <p><strong>${escapeHtml(location.name)}, ${escapeHtml(location.country)}</strong></p>
            <p>${escapeHtml(describeWeather(current.weather_code))}</p>
            <p>Temperature: ${current.temperature_2m} °C (feels like ${current.apparent_temperature} °C)</p>
            <p>Humidity: ${current.relative_humidity_2m}%</p>
            <p>Wind speed: ${current.wind_speed_10m} km/h</p>
            <p>Wind direction: ${current.wind_direction_10m}°</p>
            <p>Updated: ${escapeHtml(formatTime(current.time))}</p>
        </div>`;
    });
}

async function getWeekForecast() {
    await runWeatherRequest("forecast-result", async () => {
        const location = await getCoordinates(document.getElementById("city-forecast").value);
        const params = new URLSearchParams({
            latitude: location.lat,
            longitude: location.lon,
            daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
            forecast_days: "7",
            timezone: "auto"
        });
        const data = await fetchJson(`${forecastUrl}?${params}`);
        const days = data.daily.time.map((date, index) => {
            const forecastDate = new Date(`${date}T12:00:00`);
            const dayName = forecastDate.toLocaleDateString(undefined, { weekday: "short" });

            return `<div class="forecast-day">
                <p><strong>${escapeHtml(dayName)}</strong></p>
                <p>${escapeHtml(forecastDate.toLocaleDateString())}</p>
                <p>${escapeHtml(describeWeather(data.daily.weather_code[index]))}</p>
                <p>${data.daily.temperature_2m_max[index]}° / ${data.daily.temperature_2m_min[index]}°C</p>
                <p>💧 ${data.daily.precipitation_sum[index]} mm</p>
            </div>`;
        }).join("");

        return `<div class="weather-data">
            <p><strong>${escapeHtml(location.name)}, ${escapeHtml(location.country)}</strong></p>
            <div class="forecast-grid">${days}</div>
        </div>`;
    });
}

async function getHourlyTemperature() {
    await runWeatherRequest("hourly-result", async () => {
        const location = await getCoordinates(document.getElementById("city-hourly").value);
        const params = new URLSearchParams({
            latitude: location.lat,
            longitude: location.lon,
            hourly: "temperature_2m,relative_humidity_2m,precipitation",
            forecast_days: "1",
            timezone: "auto"
        });
        const data = await fetchJson(`${forecastUrl}?${params}`);
        const hours = data.hourly.time.slice(0, 24).map((time, index) => {
            const hour = time.slice(11, 16);

            return `<div class="hourly-item">
                <p><strong>${hour}:00</strong></p>
                <p>🌡️ ${data.hourly.temperature_2m[index]} °C</p>
                <p>💧 ${data.hourly.relative_humidity_2m[index]}%</p>
                <p>🌧️ ${data.hourly.precipitation[index]} mm</p>
            </div>`;
        }).join("");

        return `<div class="weather-data">
            <p><strong>${escapeHtml(location.name)}, ${escapeHtml(location.country)}</strong></p>
            <div class="hourly-grid">${hours}</div>
        </div>`;
    });
}

async function getAirQuality() {
    await runWeatherRequest("air-quality-result", async () => {
        const location = await getCoordinates(document.getElementById("city-air").value);
        const params = new URLSearchParams({
            latitude: location.lat,
            longitude: location.lon,
            current: "european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone",
            timezone: "auto"
        });
        const data = await fetchJson(`${airQualityUrl}?${params}`);
        const current = data.current;
        const europeanAqiLevel = current.european_aqi <= 20 ? "✅ Good"
            : current.european_aqi <= 40 ? "🟡 Fair"
                : current.european_aqi <= 60 ? "🟠 Moderate"
                    : current.european_aqi <= 80 ? "🔴 Poor"
                        : "🟣 Very Poor";

        return `<div class="weather-data">
            <p><strong>${escapeHtml(location.name)}, ${escapeHtml(location.country)}</strong></p>
            <p>European AQI: ${current.european_aqi ?? "—"} (${current.european_aqi == null ? "Unavailable" : europeanAqiLevel})</p>
            <p>PM10: ${current.pm10 ?? "—"} μg/m³</p>
            <p>PM2.5: ${current.pm2_5 ?? "—"} μg/m³</p>
            <p>Carbon monoxide (CO): ${current.carbon_monoxide ?? "—"} μg/m³</p>
            <p>Nitrogen dioxide: ${current.nitrogen_dioxide ?? "—"} μg/m³</p>
            <p>Sulphur dioxide: ${current.sulphur_dioxide ?? "—"} μg/m³</p>
            <p>Ozone: ${current.ozone ?? "—"} μg/m³</p>
            <p>Updated: ${escapeHtml(formatTime(current.time))}</p>
        </div>`;
    });
}
