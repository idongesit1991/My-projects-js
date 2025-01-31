async function start(city) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=e8d6aa9da0e747c99ae133714241412&q=${city}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  response = await response.json();
  return response;
}

const enterCityOrCountry = document.getElementById("cityInput");
const getWeatherDetails = document.getElementById("getWeatherDetails");
const weather = document.getElementById("weather__details");

getWeatherDetails.addEventListener("click", async () => {
  const cityInput = document.getElementById("cityInput");
  if (!cityInput) return;
  const city = cityInput.value;

  if (!city) {
    console.error("City cannot be empty");
    return;
  }

  const result = await start(city);

  weather.classList.add("hide");
  weather.classList.remove("hide");

  console.log({ result });

  const locationDetails = document.getElementById("weather__details");
  if (!locationDetails) return;

  const locationData = locationDetails.value;

  locationInfo = `
             
         <div class="weatherInfo" id="weatherInfo">
              <h2>${result.location.name}</h2>
              <div class="weather-main-info">
                <div class="temp__desc">
                  <p>Temperature: ${result.current.temp_c}, ${result.current.temp_f}</p>
                  <p>Feels Like: ${result.current.feelslike_c}, ${result.current.feelslike_f}</p>
                  <p>Description: ${result.current.condition.text}</p>
                </div>
                <i class="las la-cloud-showers-heavy"></i>
              </div>
            </div>
            
            <div class="location__details" id="location__details">
              <h3>Location Details</h3>
              <div class="location__section">
                <div class="desc__One">
                  <h4>Region</h4>
                  <p>${result.location.region}</p>
                </div>

                <div class="desc__Two">
                  <h4>Location</h4>
                  <p>${result.location.country}</p>
                </div>

                <div class="desc__Three">
                  <h4>Latitude</h4>
                  <p>${result.location.lat}</p>
                </div>
                <div class="desc__Four">
                  <h4>Longitude</h4>
                  <p>${result.location.lon}</p>
                </div>
                <div class="desc__Five">
                  <h4>Local Time</h4>
                  <p>${result.location.localtime}</p>
                </div>
                <div class="desc__Six">
                  <h4>Timezone</h4>
                  <p>${result.location.tz_id}</p>
                </div>
              </div>
            </div>
    `;
  locationDetails.innerHTML = locationInfo;
});
