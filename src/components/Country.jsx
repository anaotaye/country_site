const Country = ({ country }) => {
  return (
    <div  className="country">
      <div  className="flag">
        <img
          src={country.flags.svg}
          alt={country.name.common ? country.name.common : country.name}
        />
      </div>


      <div className="country_details">
        <h3 className="country_name">
          {country.name.common ? country.name.common : country.name}
        </h3>

        <p><span>Population:</span> {country.population.toLocaleString()}</p>
        <p><span>Region:</span> {country.region}</p>
        <p><span>Capital:</span> {country.capital}</p>
      </div>
    </div>
  );
};

export default Country;
