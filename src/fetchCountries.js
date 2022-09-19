import Notiflix from 'notiflix';
function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com';
  return fetch(`${BASE_URL}/v2/name/${name}?fields=name,capital,population,flags,languages
`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
export { fetchCountries };
