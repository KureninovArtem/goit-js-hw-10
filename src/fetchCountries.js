const BASE_URL = "https://restcountries.com";

function fetchCountries(name) {
    const url = `${BASE_URL}/v3.1/name/${name}?fields=name,capital,languages,population,flags`;
    return fetch(url);
};

export default { fetchCountries };