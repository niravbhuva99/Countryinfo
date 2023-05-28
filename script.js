'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

///////////////////////////////////////
// Using XMLHTTPRequest()
// const request = new XMLHttpRequest();

// request.open('GET', 'https://restcountries.com/v3.1/name/portugal');
// request.send();

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);
//   const html = `<article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${data.population}</p>
//     <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
//     <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
//   </div>
// </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });

const renderCountry = function (data, className) {
  const {
    flags: { png },
  } = data;
  //inside of data obj there is languages in this you find the language of contry but you can not aceess automaticcaly
  // for that you can use like this
  const lang = Object.keys(data.languages);
  const currency = Object.keys(data.currencies).join('');
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${png}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1000000
          ).toFixed(2)}M</p>
          <p class="country__row"><span>🗣️</span>${lang
            .join('-')
            .toUpperCase()}</p>
          <p class="country__row"><span>💰</span>${currency}</p>
      </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Using Promises

const countryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
countryData('india');
countryData('germany');
