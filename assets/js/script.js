var searchBtn = $('#searchbutton');
var formEl = $("#user-form");
var searchHistoryList = $("search-history");


$(document).ready(function(){
    formEl.on('submit', function(event){
        var userInput = [$('input:text').val()]; 
        
        var cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];
        var newCityName = userInput;
        cityNames.push(newCityName);
        localStorage.setItem('cityNames', JSON.stringify(cityNames));
        searchHistoryList();
        
      
        function searchHistoryList(){
             var cityList = $("#search-history");
             cityList.empty();
             $.each(cityNames, function (index, cityName) {
                let cityItem = $('<li>').text(cityName);
                cityList.append(cityItem);
                userInput = "";
             });
 
        };
        
        event.preventDefault();
        alert(userInput);
       });



    
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=mesa&appid=13b327d72629cc55be2f3a95ad74959a')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
    
});




