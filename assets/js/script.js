var searchBtn = $('#searchbutton');
var formEl = $("#user-form");
var searchHistoryList = $("search-history");


$(document).ready(function () {
    formEl.on('submit', function (event) {
        event.preventDefault();


        let cityName = $('#user-input').val();
        var cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];
        if (cityNames.indexOf(cityName) === -1) {
            cityNames.push(cityName);



            localStorage.setItem('cityNames', JSON.stringify(cityNames));

            var cityList = $("#search-history");
            cityList.empty();

            $.each(cityNames, function (index, cityName) {
                let cityButton = $("<button>").text(cityName);

                let cityItem = $('<li>').append(cityButton);

                cityList.append(cityItem);

                cityButton.click(function () {
                    alert("you clicked" + cityName);
                })
                $('#user-input').val("");
            });

        } else {
            alert("that already exists");
        }


        alert(cityName);

        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=13b327d72629cc55be2f3a95ad74959a&units=imperial")
            .then(response => response.json())
            .then(data => {

                console.log(data);
                var forecast = data.list;

                var fiveDayForecast = [];
                for (let i = 0; i < forecast.length; i += 8) {
                    let date = new Date(forecast[i].dt * 1000);
                    let formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                    let temperature = forecast[i].main.temp;
                    let conditions = forecast[i].weather[0].description;

                    let windSpeed = forecast[i].wind.speed;
                    let humidity = forecast[i].main.humidity;

                    fiveDayForecast.push({
                        date: formattedDate,
                        temperature: temperature,
                        conditions: conditions,
                        windSpeed: windSpeed,
                        humidity: humidity
                    });
                }
                let currentForecast = fiveDayForecast[0];
                let cityNameEl = $("<p>").text(cityName);
                let dateEl = $("<p>").text(currentForecast.date);

                let temperatureEl = $("<p>").text("Temperature: " + currentForecast.temperature + "°F");
                let windSpeedEl = $("<p>").text("Wind Speed: " + currentForecast.windSpeed + "mph");
                let humidityEl = $("<p>").text("Humidity: " + currentForecast.humidity + "%");

                let currentForecastEl = $("#forecast-today");
                currentForecastEl.empty();
                currentForecastEl.append(cityNameEl, dateEl, temperatureEl, windSpeedEl, humidityEl);

                var foreCastList = $("#forecast");
                foreCastList.empty();
                fiveDayForecast.forEach(function (day) {

                    let forecastItem = $("<li>");
                    let date = $("<p>").text(day.date);

                    let temperature = $("<p>").text("Temperature: " + day.temperature + "°F");
                    let windSpeed = $("<p>").text("Wind Speed: " + day.windSpeed + " mph");
                    let humidity = $("<p>").text("Humidity: " + day.humidity + "%");

                    forecastItem.append(date, temperature, windSpeed, humidity);

                    foreCastList.append(forecastItem);
                });

            })
            .catch(error => {
                console.error(error);
            });
    });
});

