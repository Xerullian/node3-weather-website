console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const searchBox = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) =>
{
  event.preventDefault(); // prevent browser window refresh

  const location = searchBox.value;

  message1.textContent = 'Loading...';
  message2.textContent = '';

  fetch(`//localhost:30001/weather?address=${location}`).then((response) =>
  {
    response.json().then((data) =>
    {
      if(data.error)
      {
        message1.textContent = data.error;
      }
      else
      {
        message1.textContent = data.location;
        // message2.textContent = data.forecast.description +
        // '\nTemperature: ' + data.forecast.temperature +
        // '\nChance of rain: ' + data.forecast.rain_probability;

        message2.innerHTML = 
        ` <p class="p-verticalmargin-zero">${data.forecast.description}
          <p class="p-verticalmargin-zero">Temperature: ${data.forecast.temperature}
          <p class="p-verticalmargin-zero">Chance of rain: ${data.forecast.rain_probability}
        `;
      }
    });
  });
});