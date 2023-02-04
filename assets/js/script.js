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

        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=13b327d72629cc55be2f3a95ad74959a")
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    });





});




