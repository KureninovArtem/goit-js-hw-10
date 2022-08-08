import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const body = document.querySelector('body');
body.style.backgroundImage = 'radial-gradient(grey 5%, transparent 0)';
body.style.backgroundSize = '40px 40px';

const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector("input");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector("country-info");

countryInput.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    event.preventDefault();

    const countryName = countryInput.value.trim();

    fetchCountries(countryName)
        .then((data) => {
            if (data.status === 404) {
                Notiflix.Notify.failure("Oops, there is no country with that name")
            };
            if (typeof data === 'object') {
                countryList.innerHTML = "";
            }
            insertContent(data);
        })
        .catch((error) => {
            console.log("error", error);
        });
};

const insertContent = (array) => {
    if (array.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    };
    if (array.length === 1) {
        countryList.innerHTML = generateCountryInfo(array);
        return;
    };
    countryList.innerHTML = generateCountryList(array);
};

const generateCountryList = (array) => (array ? array.reduce((acc, item) => acc + greateCountryList(item), "") : "");

const generateCountryInfo = (array) => (array ? array.reduce((acc, item) => acc + greateCountryInfo(item), "") : "");

const greateCountryList = (item) => 
    `<li class="country-list-item">
    ${item.flags.svg ? `<img class="country-list-image" src="${item.flags.svg}" alt="${item.name.official ? item.name.official : ""}" width="60" height="40">` : ""}
    ${item.name.official ? `<p class="country-list-text">${item.name.official}</p>` : ""}
    </li>`;

const greateCountryInfo = (item) => 
    `<div class="country-info-wraper">
        ${item.flags.svg ? `<img class="country-info-image" src="${item.flags.svg}" alt="${item.name.official ? item.name.official : ""}" width="60" height="40">` : ""}
        ${item.name.official ? `<h2 class="country-info-header">${item.name.official}</h2>` : ""}
    </div>
    ${item.capital ? `<p class="country-info-text"><span class="country-info-text-wraper">Capital:</span> ${item.capital[0]}</p>` : ""}
    ${item.population ? `<p class="country-info-text"><span class="country-info-text-wraper">Population:</span> ${item.population}</p>` : ""}
    ${item.languages ? `<p class="country-info-text"><span class="country-info-text-wraper">Languages:</span> ${Object.values(item.languages)}</p>` : ""}
    `;
