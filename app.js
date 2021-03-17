const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({
    extended :  true
}))

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.listen(3000, function () {
  console.log("Server Working !!! 3000");
});


app.post("/", function(req, res){

    const query = req.body.cityName;
const apiKey = "2c65e00ef9a08ffe08337ae45e538b01";
const unit = "metric";
const url =
"https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit ;

https.get(url, function (response) {
console.log(response.statusCode);
response.on("data", function (data) {
  //JSON to javascript
  const weatherData = JSON.parse(data);

  const temp = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const cityName = weatherData.name;

  const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

  console.log(weatherDescription);
  console.log(imageURL);
  console.log(cityName);
  console.log(temp);

  res.write("<p>Weather is currently :: " + weatherDescription + "</p>");
  res.write("<h1>The temperature in " + query + " " + temp + " Degree celcius</h1>");
  res.write("<img src=" + imageURL + ">");
  res.send();
});
});
    console.log(req.body.cityName);
    console.log("Received!!!" );
})


