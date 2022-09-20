import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  ulEl: document.querySelector('.country-list'),
  divEl: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(onInputEventUser, DEBOUNCE_DELAY)
);

function onInputEventUser(event) {
  clearPage();
  const value = event.target.value.trim();
  if (!value) {
    return;
  }
  fetchCountries(value).then((data = []) => {
    // console.log(data[0].languages[0]);
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }
    if (data.length === 2 && data.length <= 10) {
      renderMarkup(data);
      return;
    }
    renderOneCountry(data);
  });
}

function renderMarkup(data) {
  const markup = data
    .map(({ flags, name }) => {
      return `<li class="item">
      <img src="${flags.png}" alt="${name}" width="30" height="25"/>
      <p>${name}</p>
    </li>`;
    })
    .join('');
  refs.ulEl.insertAdjacentHTML('beforeend', markup);
}

function renderOneCountry(data) {
  const markup = data
    .map(({ flags, name, capital, population, languages }) => {
      const languagesArr = languages.map(value => value.name);
      return `<li> 
     <div class="container"> 
      <img src="${flags.png}" alt="${name}" width="30" height="25"/>
      <h2>${name}</h2>
   </div>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${languagesArr}</p>
    </li>`;
    })
    .join('');
  refs.ulEl.insertAdjacentHTML('beforeend', markup);
}

function clearPage() {
  refs.ulEl.innerHTML = '';
  refs.divEl.innerHTML = '';
}
