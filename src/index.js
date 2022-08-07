import './css/styles.css';
import API from './fetchCountries'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector("input");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector("country-info");

countryInput.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    event.preventDefault();

    const countryName = countryInput.value.trim();

    API.fetchCountries(countryName)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 404) {
                Notiflix.Notify.failure("Oops, there is no country with that name")
            };
            console.log(data);
        })
        .catch((error) => {
            console.log("error", error);
        });
}