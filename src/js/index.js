// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const countriesGridElement = document.getElementById('countries-grid');

const createElementFunction = (element, className, content) => {
  const newElement = document.createElement(element);
  newElement.classList.add(className);
  if (element !== 'img') newElement.textContent = content;
  else newElement.src = content;
  return newElement;
};

const printData = data => {
  const fragment = document.createDocumentFragment();
  data.forEach(item => {
    const countryDiv = createElementFunction('div', 'country');
    const countryTitle = createElementFunction('h2', 'country__title', item.name.common);
    const countryFlag = createElementFunction('img', 'country__flag', item.flags.png);
    const countryPop = createElementFunction('p', 'country__key', item.population);
    let countryCapital;
    if (item.capital) {
      countryCapital = createElementFunction('p', 'country__key', item.capital[0]);
    } else {
      countryCapital = createElementFunction('p', 'country__key', 'N/A');
    }

    countryDiv.append(countryFlag);
    countryDiv.append(countryTitle);
    countryDiv.append(countryPop);
    countryDiv.append(countryCapital);
    fragment.append(countryDiv);
  });
  countriesGridElement.append(fragment);

  console.log(data);
  console.log(data[40].name.common);
  console.log(data[40].capital[0]);
  console.log(data[40].population);
  console.log(data[40].flags.png);
};

{
  /*
  <div class="country">
    <div class="country__flag"></div>
    <div class="country__text">
        <h2 class="country__title">Germany</h2>
        <p class="country__key">Population: <span class="country__value">81,770,900</span></p>
        <p class="country__key">Region: <span class="country__value">Europe</span></p>
        <p class="country__key">Capital: <span class="country__value">Berlin</span></p>
    </div>
</div>

*/
}

const fetchData = url => {
  const request = fetch(url);
  request
    .then(response => response.json())
    .then(data => printData(data))
    .catch(err => {
      console.log(err);
    });
};

fetchData('https://restcountries.com/v3.1/all');
