class CityWeather extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.city = 'Los Angeles';
  }

  connectedCallback() {
    this.render();
    this.fetchWeather();
  }

  static get observedAttributes() {
    return ['city'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'city') {
      this.city = newValue || 'Los Angeles';
      this.render();
      this.fetchWeather();
    }
  }

  async fetchWeather() {
    const geocodingUrl = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.city)}&format=json`
    );
    const geocodingData = await geocodingUrl.json();

    if (geocodingData && geocodingData.length > 0) {
      const latitude = geocodingData[0].lat;
      const longitude = geocodingData[0].lon;

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherResponse.json();
      this.renderWeather(weatherData);
    } else {
      this.renderError('City not found');
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .weather-widget {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #83a4d4, #b6fbff);
          color: #333;
          padding: 20px;
          border-radius: 15px;
          width: 300px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .weather-widget:hover {
          transform: translateY(-5px);
        }
        .weather-widget h2 {
          font-size: 1.5em;
          margin: 0 0 15px;
          color: #fff;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        .weather-widget .temp {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3em;
          font-weight: bold;
          color: #FF6347;
          margin: 10px 0;
        }
        .weather-widget .temp svg {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .weather-widget .condition {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2em;
          color: #4682B4;
        }
        .weather-widget .condition svg {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }
        .weather-widget .message {
          margin-top: 15px;
          font-size: 1em;
          color: #555;
          font-style: italic;
        }
      </style>
      <div class="weather-widget">
        <h2>Weather in ${this.city}</h2>
        <div class="temp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6347">
            <path d="M15 2a1 1 0 0 0-1 1v14.268a3.001 3.001 0 1 0 2 0V3a1 1 0 0 0-1-1zm-2 14.992V4h2v12.992a5.002 5.002 0 0 1 0 1.016V19h-2v-2.992z"/>
            <circle cx="15" cy="20" r="2" />
          </svg>
          <span class="temp-value">Loading...</span>
        </div>
        <div class="condition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4682B4">
            <path d="M20 16a4 4 0 1 1-8 0h-4a6 6 0 1 1 12 0zm-10-4a6.984 6.984 0 0 0 4-1.4A6.987 6.987 0 0 0 20 12a8 8 0 1 1-10-8h-2A10 10 0 1 0 18 14h-2a6.992 6.992 0 0 0-2-2z" />
          </svg>
          <span class="condition-value"></span>
        </div>
        <div class="message"></div>
      </div>
    `;
  }

  renderWeather(data) {
    const tempEl = this.shadowRoot.querySelector('.temp-value');
    const conditionEl = this.shadowRoot.querySelector('.condition-value');
    const messageEl = this.shadowRoot.querySelector('.message');

    if (data.current_weather) {
      const temp = data.current_weather.temperature;
      const windSpeed = data.current_weather.windspeed;

      tempEl.textContent = `${Math.round(temp)}°C`;
      conditionEl.textContent = `${windSpeed} km/h`;

      if (temp < 10) {
        messageEl.textContent = "It's cold outside. Don't forget your coat!";
      } else if (temp > 30) {
        messageEl.textContent = "It's hot today. Stay hydrated!";
      } else if (data.current_weather.weathercode === 61) {
        messageEl.textContent = "It's rainy weather. Don't forget your umbrella!";
      } else {
        messageEl.textContent = "Weather looks pleasant today!";
      }
    } else {
      this.renderError('Weather data unavailable');
    }
  }

  renderError(message) {
    const tempEl = this.shadowRoot.querySelector('.temp-value');
    const conditionEl = this.shadowRoot.querySelector('.condition-value');
    const messageEl = this.shadowRoot.querySelector('.message');

    tempEl.textContent = message;
    conditionEl.textContent = '';
    messageEl.textContent = '';
  }
}

customElements.define('city-weather', CityWeather);
