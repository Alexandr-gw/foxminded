const ACCESS_TOKEN = 'AAPK1fd73d7133844aa1823a18a1df8abaecPGBl2c0TL0LS_sPZ4H1_oyMEVZPSrSSrlTiN2tgTJkQyqf-hanL-oJopwB9ZUg5W'

function initCountriesOfTheWorld() {
    getCountries(0, true)

    function searchField() {
        const search = document.querySelector("#input");
        const formSubmit = document.querySelector("form")

        search && search.addEventListener('input', (element) => {
            switch (element.target.id) {
                case 'input':
                    searchData(search)
                    break;
            }
        })

        formSubmit && formSubmit.addEventListener("submit", (event) => {
            event.preventDefault();
            showSelectedCountry(search.value);
        })
    }

    async function getCountries(fromRegion, firstCall) {
        try {
            const list = document.querySelectorAll(".country-card-list");

            if (fromRegion == 0) {
                const responseCountries = await fetch(`https://restcountries.com/v3.1/all`);
                const countries = await responseCountries.json();

                list[0] ? list[0].innerHTML = "" : false;
                countries.forEach(country => {
                    printCart(countryCardConstructor(country));
                })

                if (firstCall) {
                    addRegionList(uniqueRegionSelector(countries));
                    dayNightBtn();
                    searchField();
                    selectedRigion();
                }
            } else {
                const responseCountries = await fetch(`https://restcountries.com/v3.1/region/${fromRegion}`);
                const countries = await responseCountries.json();

                list[0] ? list[0].innerHTML = "" : false;
                countries.forEach(country => {
                    printCart(countryCardConstructor(country));
                })
            }
        } catch (error) {
            console.error('getCountries err >>>', error.message)
        }
    }

    function countryCardConstructor(data) {
        const countryObj =
        {
            flagPhotoUrl: data.flags.png,
            countryName: data.name.common,
            population: data.population,
            region: data.region,
            capital: data.capital || "No capital"
        };
        return countryObj
    }

    function uniqueRegionSelector(data) {
        const uniqueRegion = [];
        data.forEach(item => {
            if (!uniqueRegion.includes(item.region)) {
                uniqueRegion.push(item.region);
            }
        });
        return uniqueRegion
    }

    function printCart(element) {
        const div = document.querySelector(".country-card-list")

        const item = `
            <div class="country-box">
            <img src="${element.flagPhotoUrl}">
                <div class="country-information">
                    <p id="countryName">${element.countryName}</p>
                    <p id="population"><i>population:</i> ${element.population}</p>
                    <p id="region"><i>region:</i>  ${element.region}</p>
                    <p id="capital"><i>capital:</i>  ${element.capital}</p>
                </div>
            </div>`.trim()

        div.insertAdjacentHTML('beforeend', item);
    }

    function addRegionList(element) {
        const select = document.querySelector("#regionsList")

        element.map(item => {
            item = `
            <option>${item}</option>`.trim()

            select.insertAdjacentHTML('beforeend', item);
        })
    }

    function searchData(search) {
        const list = document.getElementsByClassName("country-card-list")[0]

        list && list.childNodes.forEach(element => {
            if (!element.childNodes[3].childNodes[1].innerHTML.toLowerCase().includes(search.value)) {
                element.style.display = "none";
            } else {
                element.style.display = "flex";
            }
        })
    }

    async function showSelectedCountry(selectedCountry) {
        try {
            const responseSelectedCountry = await fetch(`https://restcountries.com/v3.1/name/${selectedCountry.trim()}`)
            const country = await responseSelectedCountry.json();
            const list = document.getElementsByClassName("country-card-list")[0]
            const select = document.querySelector("select")

            if (!(responseSelectedCountry.status === 404)) {
                if ((select.selectedOptions[0].innerHTML === country[0].region) || (select.selectedOptions[0].innerHTML === "Region")) {
                    list.innerHTML = "";
                    printCart(countryCardConstructor(country[0]))
                }
                else {
                    console.log("No such country in selected region")
                    list.innerHTML = "";
                }
            } else {
                list.innerHTML = "";
                throw new Error('searched country does not exist, response error 404')
            }
        } catch (error) {
            console.error('getSelectedCountry err >>>', error.message)
        }
    }

    function selectedRigion() {
        const select = document.querySelector("select")

        select && select.addEventListener('change', (element) => {
            getCountries(element.target.value, false)
        })
    }

    function dayNightBtn() {
        const dayNightBtn = document.querySelectorAll("label")
        const wrapper = document.querySelector(".wrapper")
        const checkbox = document.querySelector("#switch-btn")
        const coockies = getCoockies()
        const expires = expireTime(1)

        if (coockies) {
            switch (coockies[0]) {
                case "day":
                    setDayNight('day')
                    break
                case "night":
                    checkbox.checked = true
                    setDayNight('night')
                    break
            }
        }

        dayNightBtn && dayNightBtn[0].addEventListener("click", () => {
            if (!wrapper.classList.contains('night')) {
                setDayNight('night')

                document.cookie = encodeURIComponent('DayNightBtnValue') + "=" + encodeURIComponent('night') + ";" + expires + "; path=/";
            } else {
                setDayNight('day')

                document.cookie = encodeURIComponent('DayNightBtnValue') + "=" + encodeURIComponent('day') + ";" + expires + "; path=/";
            }
        })
    }

    function expireTime(expireDays) {
        const date = new Date()
        const expDays = expireDays;
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        return expires
    }

    function getCoockies() {
        const coockieStorage = document.cookie
        const coockiesData = decodeURIComponent(coockieStorage).split('; ')
        let dataArr = []

        coockiesData.map(item => {
            item = item.split('=')
            dataArr.push(item[1])
        })

        if (dataArr.length > 0) {
            return dataArr
        } else {
            console.log('Coockies is empty')
            return false;
        }
    }

    function setDayNight(theme) {
        const wrapper = document.querySelector(".wrapper")

        switch (theme) {
            case 'day':
                wrapper.classList.replace('night', 'day') || wrapper.classList.add('day')
                break;
            case 'night':
                wrapper.classList.replace('day', 'night') || wrapper.classList.add('night')
                break;
        }
    }
} window.addEventListener("DOMContentLoaded", initCountriesOfTheWorld())