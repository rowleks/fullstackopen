import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const SingleCountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital.length > 0) {
      const capitalName = country.capital[0];
      axios
        .get(`${BASE_URL}?q=${capitalName}&appid=${API_KEY}&units=metric`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [country.capital]);

  console.log(weather);

  return (
    <div>
      <section>
        <h1>{country.name.common}</h1>
        <div>
          <p>Capital: {country.capital.join(" ")}</p>
          <p>Area: {country.area.toLocaleString("en-US")}</p>
        </div>
      </section>

      <section>
        <h2>Languages</h2>
        {country.languages && (
          <ul>
            {Object.values(country.languages).map((lang, idx) => (
              <li key={idx}>{lang}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          width={300}
          height={200}
        />
      </section>

      {weather && (
        <section>
          <h2>Weather in {country.capital[0]}</h2>
          <div>
            <p>Temperature: {weather.main.temp} °C</p>
            {weather.weather[0] && (
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            )}
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleCountryInfo;
