//import * as API_KEY from './credentials.js'
const API_KEY = '18ef79fe0195386b95f4d07573a0a1d1'
const ACCESS_TOKEN = 'AAPK1fd73d7133844aa1823a18a1df8abaecPGBl2c0TL0LS_sPZ4H1_oyMEVZPSrSSrlTiN2tgTJkQyqf-hanL-oJopwB9ZUg5W'

function initWeatherAPI() {
    const form = document.querySelector("form");

    if (form) {
        const search = form.querySelector("#input");
        form.addEventListener('input', (element) => {
            switch (element.target.id) {
                case 'input':
                    searchData()
                    break;
            }
        })

        form.addEventListener('submit', (element) => {
            element.preventDefault()
        })

        //determine user location
        const successCallback = (position) => {
            weatherAPI(position.coords.latitude, position.coords.longitude)
        };

        const errorCallback = (error) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        //end

        async function searchData() {
            if (search) {
                if (search.value.length > -1) {
                    const responseCity = await fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${search.value}&f=json&token=${ACCESS_TOKEN}`)
                    const city = await responseCity.json();
                    suggestCity(city.suggestions)
                }
            }
        }
        async function cityLocation(requestedCity) {
            if (requestedCity) {
                const responseCityLatLon = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${requestedCity}&limit=1&appid=${API_KEY}`)
                const cityLatLon = await responseCityLatLon.json();
                weatherAPI(cityLatLon[0].lat, cityLatLon[0].lon)
            }
        }

        function suggestCity(city) {
            const suggest = document.querySelector('#suggestions')
            document.getElementById("suggestions").innerHTML = "";

            let citySuggestion
            if (search.value.trim().length > 0) {
                city.forEach(item => {
                    citySuggestion = `
                <div class="autocomplete-items"> ${item.text} </div>`.trim()

                    suggest.insertAdjacentHTML('beforeend', citySuggestion);
                    suggest.addEventListener("click", (element) => {
                        search.value = element.target.innerHTML
                        cityLocation(element.target.innerHTML)
                        document.getElementById("suggestions").innerHTML = "";
                    })
                })
            } else {
                console.log('Search field is empty')
            }
        }

        async function weatherAPI(lat, lon) {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const weather = await response.json();

            if (search.value === '') {
                search.value = weather.city.name
            }

            parceWeatherData(weather)
        }

        function parceWeatherData(data) {
            const day = []
            let dayMaxTemp = []
            let dayMinTemp = []
            let max_temp = []
            let min_temp = []
            let cloudsArr = []
            let clouds = []
            let clouds_img = []
            let newDate_txt = []

            data.list.forEach(item => {
                //---Recive day of the week---               
                const date_txt = new Date(item.dt * 1000)

                if (!newDate_txt.includes(date_txt.toLocaleString("en-US", { weekday: "short" }))) {
                    newDate_txt.push(date_txt.toLocaleString("en-US", { weekday: "short" }))
                }

                //---Recive unique dates---
                day.push(item.dt_txt.slice(0, 10))
            })

            const newTime = [... new Set(day)]

            newTime.forEach(time => {
                data.list.forEach(item => {
                    let dayDate = item.dt_txt.slice(0, 10)

                    if (time === dayDate) {
                        dayMinTemp.push(item.main.temp_min)
                        dayMaxTemp.push(item.main.temp_max)
                        cloudsArr.push(item.weather[0].main)
                    } else if (dayMaxTemp.length > 0 && dayMinTemp.length > 0) {
                        max_temp.push(Math.max(...dayMaxTemp))
                        dayMaxTemp = []
                        min_temp.push(Math.min(...dayMinTemp))
                        dayMinTemp = []
                        clouds.push(cloudsArr[0])
                        cloudsArr = []
                    }
                })
            })
            max_temp.push(Math.max(...dayMaxTemp))
            min_temp.push(Math.min(...dayMinTemp))
            clouds.push(cloudsArr[0])


            clouds.forEach(cloud => {
                switch (cloud) {
                    case 'Thunderstorm':
                        clouds_img.push('./img/rain.png')
                        break;
                    case 'Drizzle':
                    case 'Rain':
                        clouds_img.push('./img/lightRain.png')
                        break;
                    case 'Snow':
                        clouds_img.push('./img/strongSnow.png')
                        break;
                    case 'Mist':
                    case 'Smoke':
                    case 'Haze':
                    case 'Dust':
                    case 'Fog':
                    case 'Sand':
                    case 'Dust':
                    case 'Ash':
                    case 'Squall':
                    case 'Tornado':
                        clouds_img.push('./img/cloundly.png')
                        break;
                    case 'Clouds':
                        clouds_img.push('./img/clouds.png')
                        break;
                    case 'Clear':
                        clouds_img.push('./img/clear.png')
                        break;
                }
            })


            const weatherKey = ['dayName', 'min_temp', 'max_temp', 'clouds_img', 'clouds']
            const weatherObj = weatherKey.map((id, index_value) => {
                return {
                    dayName: newDate_txt[index_value],
                    min_temp: (min_temp[index_value] - 273.15).toFixed(1),
                    max_temp: (max_temp[index_value] - 273.15).toFixed(1),
                    clouds_img: clouds_img[index_value],
                    clouds: clouds[index_value]
                };
            });

            printWeather(weatherObj)
        }

        function printWeather(weatherObj) {
            const ul = document.querySelector("#objList")
            const div = document.querySelector("#objFirstElement")
            const span = document.querySelector('#cityCelected')

            document.getElementById("objList").innerHTML = "";
            document.getElementById("objFirstElement").innerHTML = "";
            document.getElementById("cityCelected").innerHTML = "";

            const cityCelected = `
              Celected: ${search.value}
            `.trim()

            span.insertAdjacentHTML('beforeend', cityCelected);

            weatherObj.map((item, index) => {
                if (index === 0) {
                    item = `
                     <div class="weather">
                          <p>${item.min_temp}°C</p>
                          <div class="precepitation">
                              <p>${item.clouds}</p>
                              <p>${item.max_temp}°C</p>
                          </div>
                     </div>
                     <div class="clouds">
                          <p>${item.clouds}</p>
                          <p>${search.value}</p>
                     </div>
                     <div class="weatherImg">
                          <img src="${item.clouds_img}">
                     </div>
                    `.trim()

                    div.insertAdjacentHTML('beforeend', item);
                }
            })

            weatherObj.map((item, index) => {
                if (index > 0) {
                    item = `
                        <li>
                         <div class="weekDay">
                             <p>${item.dayName}</p>
                         </div>
                         <div class="weatherImg">
                             <img src="${item.clouds_img}">
                         </div>
                             <div class="clouds">
                             <p>${item.clouds}</p>
                         </div>
                         <div class="minMaxTemp">
                             <p class="dayNight">Day</p>
                             <p>${item.max_temp}°C</p>
                             <p>${item.min_temp}°C</p>
                             <p class="dayNight">Night</p>
                         </div>
                       </li>
                      `.trim();

                    ul.insertAdjacentHTML('beforeend', item);
                }
            })
        }

    } else { console.log("Form does not exist.") }

} window.addEventListener("DOMContentLoaded", initWeatherAPI)