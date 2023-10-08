const search_btn = document.querySelector(".submit");
const temperature = document.querySelector(".temp");
const name_el = document.querySelector(".name");
const cities = document.querySelector(".cities");
const city = cities.querySelectorAll("li");
const add_btn = document.querySelector("#add_btn");
const time_el = document.querySelector("#time_el");
const details = document.querySelector(".details");
const info = details.querySelectorAll("span:nth-child(2)");
const weather_details = document.querySelector("#weather_details");

const displayDate = () => {
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  setInterval(() => {
    let time = new Date();
    // let formatDate = time.toLocaleString(undefined, option);
    time_el.innerHTML = time.toLocaleString(undefined, option);
  });
};
displayDate();

const getWeather = (city, property) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "781210898amsh74b68c03c7ebaebp1a4646jsne668bac41e61",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };
  return fetch(
    `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
    options
  )
    .then((response) => response.json())
    .then((value) => {
      const ans = value[property];
      return ans;
    })
    .catch((err) => {
      console.error(err);
      return "N/A";
    });
};

const showData = (city, property) => {
  name_el.innerHTML = `${city}`;
  temperature.innerHTML = property + `&deg;C`;
};

const getDefaulttemp = async () => {
  const cityname = "Bhopal";
  const data = await getWeather(cityname, "temp");
  getInfo(cityname);
  showData(cityname, data);
};
getDefaulttemp();

search_btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const cityname = document.querySelector(".search").value;
  getInfo(cityname);
  const data = await getWeather(cityname, "temp");
  showData(cityname, data);
  weather_details.innerHTML = `Weather Details of ${cityname}:`;
});

const getInfo = async (cityname) => {
  try {
    const cloudData = await getWeather(cityname, "cloud_pct");
    const humidityData = await getWeather(cityname, "humidity");
    const minTempData = await getWeather(cityname, "min_temp");
    const maxTempData = await getWeather(cityname, "max_temp");

    info[0].textContent = ` ${cloudData}`;
    info[1].textContent = `${humidityData}`;
    info[2].textContent = `${minTempData}`;
    info[3].textContent = `${maxTempData}`;
  } catch (error) {
    console.log("An error occured", error);
  }
};

const getTemp = () => {
  city.forEach(async (elem) => {
    let cityname = elem.querySelector(".place").textContent;
    let trimmed = cityname.replace(":", "");
    trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    const data = await getWeather(trimmed, "temp");
    elem.querySelector(".city").innerHTML = `${data}&deg;C`;
  });
};

add_btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let listItems = "";
  const cityname = document.querySelector(".search").value;
  let trimmed = cityname.replace(":", "");
  trimmed = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  const data = await getWeather(trimmed, "temp");
  listItems = `<li>
              <span class = "place">${trimmed}:</span>
              <span class = "city">${data}&deg;C</span>
                  </li>`;

  cities.innerHTML += listItems;
  document.querySelector(".search").value = "";
});

window.addEventListener("load", getTemp);
