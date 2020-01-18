var ApiKey = "f2fae5d4e901642da34727ff9f70867d";
var city = "Atlanta";

//First need to get current temperature, humidity, wind speed, & uv index

//Then allow for us to search by city

//Then pull a 5-day forecast for the same city

//Then save all of that information to local storage

//Then pull of that information from local storage to display onclick


var qURLFirst = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&APPID=" + ApiKey;

$.ajax({
    url: qURLFirst,
    method: "GET"
}).then(function(response) {
    console.log(response);
    console.log(response.main.temp);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;
    
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    
    console.log(lat);
    console.log(lon);
    var qURLSecond = "http://api.openweathermap.org/data/2.5/uvi?appid=" + ApiKey + "&lat=" + lat + "&lon=" + lon;
    
    $.ajax({
        url: qURLSecond,
        method: "GET"
    }).then(function(response2) {
        console.log(response2);
        console.log(response2.value);

        var uvIndex = response2.value;

        var qURLThird = "http://api.openweathermap.org/data/2.5/forecast?appid=" + ApiKey + "&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: qURLThird,
            method: "GET"
        }).then(function(response3) {
            console.log(response3);
            
            for(var i = 0; i < 5; i++) {
                console.log(response3.list[i].main.temp);
                console.log(response3.list[i].main.humidity);
            }
        })
    })
  });