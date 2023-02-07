var searchBtn = $('#searchbutton');       //selector for the search button 
var formEl = $("#user-form");   //selector for the form submitted by user
var searchHistoryList = $("#search-history"); //this is the selector for the search history list
var cityName;
var searchValue;

$(document).ready(function () {  // when document is ready execute this code 
    function getWeatherData() {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=13b327d72629cc55be2f3a95ad74959a&units=imperial")
            .then(response => {             //this is the fetch request for the data from open weather api 
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (cityNames.indexOf(searchValue) === -1) {  //if statement preventing same name being entered into the local storage
                    cityNames.push(searchValue);  //pushs the name of a nondeclared city to the local storage array 



                    localStorage.setItem('cityNames', JSON.stringify(cityNames)); // sets the name in local storage key 

                    var cityList = $("#search-history"); // selector for search history
                    cityList.empty();      // empties the list UL element 

                    $.each(cityNames, function (index, searchValue) {     //populates the UL element with all the names stored storage
                        let cityButton = $("<button>").text(searchValue); // creates a button with the name of the city

                        let cityItem = $('<li>').append(cityButton); //appends a list item to the UL


                        cityButton.click(function () {        //supposed to handle the click for city button 

                            cityName = cityButton.text();

                            getWeatherData();
                            $('#forecast-today').css("display", "block");
                        })
                        cityList.append(cityItem);  // appends the button to the LI
                        $('#user-input').val(""); //empties the submission field
                    });

                } else {

                }

                console.log(data); // console logs the data pulled
                var forecast = data.list; // assigns the list inside the data to forecast

                var fiveDayForecast = [];    // declares and array called 5 day forecast
                for (let i = 0; i < forecast.length; i += 8) {    //for each loop that will go through and pull set data to variables
                    let date = new Date(forecast[i].dt * 1000);
                    let formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
                    let temperature = forecast[i].main.temp;
                    let conditions = forecast[i].weather[0].description;

                    let windSpeed = forecast[i].wind.speed;
                    let humidity = forecast[i].main.humidity;

                    fiveDayForecast.push({    // pushes the data data to each list item as an object
                        date: formattedDate,
                        temperature: temperature,
                        conditions: conditions,
                        windSpeed: windSpeed,
                        humidity: humidity
                    });
                }
                let currentForecast = fiveDayForecast[0];    // gets current day and shows it as a larger block 
                let cityNameEl = $("<p>").text(searchValue).addClass('city-name');  //this is the start of all the populated data on the screen 
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

                    let forecastItem = $("<li>").addClass("d-flex").addClass("flex-wrap");
                    let date = $("<p>").text(day.date);

                    let temperature = $("<p>").text("Temperature: " + day.temperature + "°F");
                    let windSpeed = $("<p>").text("Wind Speed: " + day.windSpeed + " mph");
                    let humidity = $("<p>").text("Humidity: " + day.humidity + "%");

                    forecastItem.append(date, temperature, windSpeed, humidity);

                    foreCastList.append(forecastItem);// end of data population to the screen 

                });

            })
            .catch(error => {    // catches error and sets the content to displat not a city kinda like a 404 error but tells the user the problem was the input
                console.error(error);
                $('#forecast-today').empty();
                $('#forecast').empty();
                $('#forecast').append("<h2>").text("That is not a city");

            });
    }

    var cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];  // handles the retrieving the list of city names from storage 

    var cityList = $("#search-history");   // this is the block of the buttons that is the search history
    cityList.empty();  // empties the list each search 

    $.each(cityNames, function (index, cityName) {   // populates the buttons on the screen 
        let cityButton = $("<button>").text(cityName);
        let cityItem = $('<li>').append(cityButton);

        cityButton.click(function () {     // click handler for search histy buttons
            searchValue = cityButton.text();
            getWeatherData();
            $('#forecast-today').css("display", "block");
        })
        cityList.append(cityItem);
    });

    formEl.on('submit', function (event) {  //submit form handler
        event.preventDefault();  // prevent default 

        cityName = $('#user-input').val();    //city name will = the value of the submission form
        searchValue = cityName;
        var cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];  //gets and parses citynames stored in local storage

        getWeatherData();   // gets the data
        $('#forecast-today').css("display", "block");   // displays the today forecast 
    }





    );

});

