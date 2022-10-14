let weather = {
    apiKey: "b5e218de85947048a191c5837cd3dcfc",

    getWeather: function (city) {
        fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
        .then ((response) => response.json())
        .then ((data) => this.displayWeather(data))
    },

    displayWeather: function (data) {
        const {name} = data
        const {icon, description} = data.weather[0]
        const {temp, humidity} = data.main
        const {speed} = data.wind

        document.querySelector('.city').innerHTML = `Weather in ${name}`
        document.querySelector('.temp').innerHTML = Number(Math.round(temp)) + '&#8451'
        document.querySelector('.icon').src = ` http://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector('.desc').innerHTML = description
        document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`
        document.querySelector('.wind').innerHTML = `Wind: ${speed} km/h`
    },

    search: function () {
        this.getWeather(document.querySelector('.search-bar').value)
    }
}

document.getElementById('btn-search').addEventListener('click', function () {
    weather.search()
})

document.querySelector('.search-bar').addEventListener('keypress', searchOnEnter)
function searchOnEnter () {
    if (event.key === 'Enter') {
        weather.search()
    }
}

const findCity = function () {
    const success = (position) =>  {

        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let myCity = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        fetch(myCity)
        .then(response => response.json())
        .then(data => {
            weather.getWeather(data.city)
        })
    }

    const error = () => {
        alert('Unknown location')
    }

    navigator.geolocation.getCurrentPosition(success, error)
}
window.addEventListener('load', findCity)

function refresh () {
    window.location.reload()
}

setInterval(refresh, 3600000)