const apiKey = 'e2c10d62447c442c8f6194030232805';

const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

function removePrevCard() {
  const prevCard = document.querySelector('.card');
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  const errorCard = `<div class="card">${errorMessage}</div>`;

  header.insertAdjacentHTML('afterend', errorCard);
}

function showCard(obj) {
  const card = `
            <div class="card">
                <h2 class="card-city">${obj.name} <span>${obj.country}</span></h2>
        
                <div class="card-weather">
                    <div class="card-value">${obj.temp}<sup>°C</sup></div>
                    <img src="https:${obj.icon}" alt="" />
                </div>
        
                <div class="card-desc">${obj.desc}</div>
            </div>
            `;

  header.insertAdjacentHTML('afterend', card);
}

async function getWeather(event) {
  event.preventDefault();

  const responce = await fetch(`${query}&q=${input.value.trim()}`);
  const data = await responce.json();
  console.log(data);

  if (data.error) {
    removePrevCard();

    showError(data.error.message);
  } else {
    removePrevCard();

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      desc: data.current.condition.text,
      icon: data.current.condition.icon,
    };

    showCard(weatherData);
  }

  input.value = '';
}

form.addEventListener('submit', (event) => getWeather(event));
