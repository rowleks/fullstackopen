import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import CountryList from "./components/CountryList";

const App = () => {
  const [allcountries, setallCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setallCountries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(e.target.value);

    if (query && allcountries) {
      const matchedCountries = allcountries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );

      setFilteredCountries(matchedCountries);
    } else {
      setFilteredCountries(null);
    }
  };

  return (
    <div>
      <SearchInput searchQuery={searchQuery} handleSearch={handleSearch} />
      <CountryList filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
