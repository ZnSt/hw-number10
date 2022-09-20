import Notiflix from 'notiflix';

export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2/name';
  return fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error();
  });
}

// function fetchCountries(name) {
//   const BASE_URL = 'https://restcountries.com';
//   return fetch(`${BASE_URL}/v2/name/${name}?fields=name,capital,population,flags,languages
// `)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error();
//       }
//     })
//     .catch(error => {
// Notiflix.Notify.failure('Oops, there is no country with that name');
//     });
// }
// export { fetchCountries };
