import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CityWeather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      setError("City is required");
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null); // Reset error
      setWeatherData(null); // Reset weather data

      try {
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            city
          )}&format=json`
        );

        if (!geoResponse.ok) {
          throw new Error("Error fetching city data");
        }

        const geoData = await geoResponse.json();

        if (geoData && geoData.length > 0) {
          const { lat, lon } = geoData[0];
          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );

          if (!weatherResponse.ok) {
            throw new Error("Error fetching weather data");
          }

          const weather = await weatherResponse.json();
          setWeatherData(weather.current_weather);
        } else {
          setError("City not found");
        }
      } catch (e) {
        setError(e.message || "Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-lg max-w-md mx-auto text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 rounded-lg shadow-lg max-w-md mx-auto text-red-500 bg-red-100 p-4 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return null; // Return nothing if no data and no error
  }

  const { temperature, windspeed } = weatherData;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white">Weather in {city}</h2>
      <div className="text-4xl font-bold text-orange-500">{temperature}°C</div>
      <div className="text-lg text-blue-800">Wind: {windspeed} km/h</div>
    </div>
  );
};

CityWeather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default CityWeather;
