import { useState, useEffect } from "react";
import Header from "./Header";
import Country from "./Country";
import searchIcon from "./search.svg";
import Loader from "./Loader/Loader";

const API_URL = "https://restcountries.com/";

const Home = () => {
  const [countries, setCountries] = useState([]);
  // const [regions, setRegions] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdown, setDropdown] = useState(false);


  const searchApi = async (name) => {
    setIsLoading(true);
    try {
    const response = await fetch(`${API_URL}${name}`);
    const data = await response.json();
    console.log(data);
    setIsLoading(false);
    
    setCountries(data);
    } catch (error) {
      setErrorMessage("Unable to fetch countries");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchApi(`v2/name/${searchTerm}`);
    }
  };

  useEffect(() => {
    searchApi(`/v2/all`);
  }, []);

  return (
    <>
      <Header />
      <div className="search_container">
        <div className="search">
          <img
            src={searchIcon}
            alt="search"
            onClick={() => searchApi(`v2/name/${searchTerm}`)}
          />
          <input
            type="text"
            placeholder="Search for a country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
       
        <div className="dropdown">
          <div className="dropbtn">
            <div>
              <button className="dropbtn-title" disabled={isLoading}>Filter by Region</button>
            </div>
            <div className="dropdown-select" onClick={() => setDropdown(!dropdown)}>
              <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path className="dropdown-icon" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301 191.9 288 191.9L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </div>
          </div>
          
          <div className={`dropdown-content ${dropdown ? "active": ""}`}>
            <button
              className="dropdown-item"
              onClick={() => searchApi("v3.1/region/africa")}
              disabled={isLoading}
            >
              Africa
            </button>
            <button
              className="dropdown-item"
              onClick={() => searchApi("v3.1/region/america")}
              disabled={isLoading}
            >
              America
            </button>
            <button
              className="dropdown-item"
              onClick={() => searchApi("v3.1/region/asia")}
              disabled={isLoading}
            >
              Asia
            </button>
            <button
              className="dropdown-item"
              onClick={() => searchApi("v3.1/region/europe")}
              disabled={isLoading}
            >
              Europe
            </button>
            <button
              className="dropdown-item"
              onClick={() => searchApi("v3.1/region/oceania")}
              disabled={isLoading}
            >
              Oceania
            </button>
          </div>
        </div>
      </div>

      {countries?.length > 0 ? (
        <div className="container">
          {isLoading ? <Loader /> :
          countries.map((country, numericCode) => (
            <Country country={country} key={numericCode} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>{errorMessage}</h2>
        </div>
      )}
    </>
  );
};

export default Home;
