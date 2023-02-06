import '../scss/styles.scss';

// CONSTANTES

const countriesGridElement = document.getElementById('countries-grid');
const toggleMode = document.getElementById('mode');
const filterElement = document.getElementById('filter');
const formElement = document.getElementById('form');
const searchBarElement = document.getElementById('search-bar');
const modalElement = document.getElementById('modal');
const modalButton = document.getElementById('modal__button');
const modalCountryElement = document.getElementById('modal__country');

let allCountries;

// FUNCIONES

const openModal = () => {
  modalElement.classList.add('modal--show');
  document.body.classList.add('hidden-overflow');
};

const closeModal = () => {
  modalElement.classList.remove('modal--show');
  document.body.classList.remove('hidden-overflow');
};

const createElementFunction = (element, className, content) => {
  const newElement = document.createElement(element);
  newElement.classList.add(className);
  if (element !== 'img') newElement.textContent = content;
  else newElement.src = content;
  return newElement;
};

const printData = data => {
  countriesGridElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  data.forEach(item => {
    const countryDiv = createElementFunction('div', 'country');
    const countryFlag = createElementFunction('img', 'country__flag', item.flags.png);
    const countryText = createElementFunction('div', 'country__text');
    const countryTitle = createElementFunction('h2', 'country__title', item.name.common);
    const countryPopulationKey = createElementFunction('p', 'country__key', 'Population: ');
    const countryPopulation = createElementFunction('span', 'country__value', item.population.toLocaleString('en-US'));
    const countryRegionKey = createElementFunction('p', 'country__key', 'Region: ');
    const countryRegion = createElementFunction('span', 'country__value', item.region);
    const countryCapitalKey = createElementFunction('p', 'country__key', 'Capital: ');
    let countryCapital;
    if (item.capital) {
      countryCapital = createElementFunction('span', 'country__value', item.capital[0]);
    } else {
      countryCapital = createElementFunction('span', 'country__value', 'N/A');
    }

    countryPopulationKey.append(countryPopulation);
    countryRegionKey.append(countryRegion);
    countryCapitalKey.append(countryCapital);

    countryText.append(countryTitle);
    countryText.append(countryPopulationKey);
    countryText.append(countryRegionKey);
    countryText.append(countryCapitalKey);

    countryDiv.append(countryFlag);
    countryDiv.append(countryText);

    fragment.append(countryDiv);
  });
  countriesGridElement.append(fragment);
};

const printModal = country => {};

const fetchData = url => {
  const request = fetch(url);
  request
    .then(response => response.json())
    .then(data => {
      printData(data);
      allCountries = data;
    })
    .catch(err => {
      console.log(err);
    });
};

const filterByCountry = selectedCountry => {
  const filteredCountry = allCountries.filter(item => item.name.common.toLowerCase().startsWith(selectedCountry.toLowerCase()));
  //const filteredCountry = allCountries.filter(item => item.name.common.toLowerCase() === selectedCountry.toLowerCase());
  printData(filteredCountry);
};

const filterByRegion = selectedRegion => {
  const filteredCountries = allCountries.filter(item => item.region === selectedRegion);
  printData(filteredCountries);
};

// ACCIONES

fetchData('https://restcountries.com/v3.1/all');

// EVENTOS

modalButton.addEventListener('click', closeModal);

countriesGridElement.addEventListener('click', ev => {
  console.log(ev.target);
  if (ev.target.classList.contains('country')) {
    openModal();
  }
});

formElement.addEventListener('submit', ev => {
  ev.preventDefault();
  searchBarElement.value === '' ? printData(allCountries) : filterByCountry(searchBarElement.value);
});

filterElement.addEventListener('change', ev => {
  ev.target.value === '0' ? printData(allCountries) : filterByRegion(ev.target.value);
  //ev.target.value !== '0' && filterByRegion(ev.target.value);
});

toggleMode.addEventListener('click', () => {
  const bodyClass = document.body.classList;
  bodyClass.contains('darkmode') ? bodyClass.remove('darkmode') : bodyClass.add('darkmode');
});
