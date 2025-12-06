import { useState } from "react";
import SingleCountryInfo from "./SingleCountryInfo";

const CountryListItem = ({ country, onShow, isShown }) => {
  return (
    <div>
      <span>{country.name.common} </span>
      <button onClick={() => onShow(country)}>
        {isShown ? "Hide" : "Show"}
      </button>
    </div>
  );
};

const CountryList = ({ filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (!filteredCountries) {
    return null;
  }

   if (filteredCountries.length === 0) {
    return <p>No match found, specify another filter</p>;
  }


  if (filteredCountries.length === 1) {
    return <SingleCountryInfo country={filteredCountries[0]} />;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  const handleShow = (country) => {
    setSelectedCountry(
      selectedCountry && selectedCountry.name.common === country.name.common
        ? null
        : country
    );
  };

  return (
    <section>
      {filteredCountries.map((country) => {
        const isShown =
          selectedCountry &&
          selectedCountry.name.common === country.name.common;
        return (
          <div key={country.name.common}>
            <CountryListItem
              country={country}
              onShow={handleShow}
              isShown={isShown}
            />
            {isShown && <SingleCountryInfo country={country} />}
          </div>
        );
      })}
    </section>
  );
};

export default CountryList;
