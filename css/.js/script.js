/DONE GIVEN a weather app with form inputs
//DONE WHEN I search for a city
//DONE THEN I am presented with current and future conditions for that city and that city is added to the search history
//DONE WHEN I view current weather conditions for that city
//DONE THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//DONE WHEN I view the UV index
//DONE THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//DONE WHEN I view future weather conditions for that city
//DONE THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//DONE WHEN I click on a city in the search history
//DONE  **making the <button> tag have the on click function inside to invoke the api call again just like the search
//DONE THEN I am again presented with current and future conditions for that city

//DONE  have the forecast unhide after selecting the city and updating to the document

//DONE HOW TO MAKE TEXT FIELD NOT REFRESH PAGE WHEN I HIT ENTER AFTER TYPING IN A CITY NAME
//DONE SO THAT THE TEXT FIELD CAN ACT LIKE A SUBMIT BUTTON TOO??
//????? HOW TO TRACK HOW MANY API CALLS I HAVE DONE AND STORE INTO STORAGE MAYBE??
//????? HOW TO HIDE API KEY AND STILL USE THE APP NORMALLY??
//????? repeat searches just go to the top of the history
//????? if city could not be found dont prepend to the history
//????? how to display local time of the searched city??



//document variables
//  form input textarea element
//  
//select textarea element
const formInputTextAreaEl = document.querySelector("#city-name");
//  button element
const buttonEl = document.querySelector("#search-button");
//select the city list element we are prepending the city name to
const citylistEl = document.querySelector("#city-list");

//select element for the 5 day forecast dates
const forecastRowEl = document.querySelector("#forecast-row");

// var imported = document.createElement('script');
// imported.src = './assets/js/config.js';
// document.head.appendChild(imported);

// const WEATHER_KEY = config.WEATHER_KEY;
const WEATHER_KEY = window.prompt("Notice: Until a partial backend solution is found for this application- Please enter your personal Open Weather API-key to use this app.\n\nPress OK after you have entered in your key and enjoy the app! ");

const apiCurrentUrl = `x-rapidapi-key": "1e7bed241dmshfd2d554452d35aep17922cjsn4692c648f953`;

const apiFiveDayUrl = `x-rapidapi-key": "1e7bed241dmshfd2d554452d35aep17922cjsn4692c648f953`;

//const apiUVIndexUrl = "x-rapidapi-key": "1e7bed241dmshfd2d554452d35aep17922cjsn4692c648f953";

const apiFiveDayUVIndexUrl = "";

//initializing a city array for use with local storage
let cityArray = []

//make saveCity function
function saveCity(cityName){
    //save everytime user searches a city
    //so place this function where
    //place the cityname passed in, to the array that we are storing
    cityArray.push(cityName);
    console.log(cityArray);
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    console.log("city array got updated in storage!")
}
//push the city string name into a temparray that gets pushed into localStorage
//have to check notes again for the storage...

//make loadCity function
//on the clicked <a> element that has the city name inside execute load city
loadCity();
function loadCity(){
    console.log("loading clicked city from the past searches list")
    cityArray = JSON.parse(localStorage.getItem("cityArray"));
    if (!cityArray || cityArray === null){
        cityArray = []
    }
    citylistEl.classList.remove("hide-before-append");
    for (let i = 0; i < cityArray.length; i++){
        //create the element to store the value of the index we are iterating through
        const cityNameEl = document.createElement("span");
        //add the classes that we want to the element
        cityNameEl.classList = "slight-margin-allaround width-100 border-bottom-user";
        //assign the value of new element with the text of the array index
        cityNameEl.textContent = cityArray[i];
        //create an <button> element we want to append the city name span to
        const cityNameButtonEl = document.createElement("button");
        cityNameButtonEl.classList = "slight-margin-allaround width-100 button-search-name"
        cityNameButtonEl.setAttribute("type", "submit");
        //prepend the citynamebuttonEl into the citylistEl
        citylistEl.prepend(cityNameButtonEl);
        //append the span into the button
        cityNameButtonEl.appendChild(cityNameEl);
        cityNameButtonEl.addEventListener("click", function(event){
            //console.log("here is the element we targeted with our click event")
            console.log(event.target);
            formInputTextAreaEl.value = cityArray[i];
            displaySearchedCityFromButton(formInputTextAreaEl.value);
        });
    }
}

function displaySearchedCityFromButton(cityName){
    event.preventDefault();
    const cityHeader = document.querySelector("#city-header");
    citylistEl.classList.remove("hide-before-append");
    cityHeader.classList.remove("hide-before-append");
    updateCurrentDate();
    cityHeader.innerText = cityName;
    clearInputField();
    cityCurrentApiCall(cityName);
    cityFiveDayApiCall(cityName);
    getFiveDayForecastDates();

}
//check if the array in localStorage is null or falsey set it to empty array
//else make for loop for each string inside the storage array
//place each string inside the element that will prepend into the city-list element





//moment variables and objects
function updateCurrentDate(){
    var nowDate = moment().format('MM/DD/YYYY');
    const currentDateEl = document.querySelector("#current-date");
    currentDateEl.textContent = nowDate;
}
//display current time in that city??
//for now will have time function here, maybe try to get local time of city?
// var updateTime = document.querySelector("#current-time")
// function time() {
//     var d = new Date();
//     var s = ('0'+ d.getSeconds()).slice(-2);
//     var m = ('0'+ d.getMinutes()).slice(-2);
//     var h = d.getHours(); 
//     if(h >= 12){
//         updateTime.textContent = h + ":" + m + ":" + s + " pm";
//     } else if (h <= 11){
//         updateTime.textContent = h + ":" + m + ":" + s + " am";
//     }
// }
//   setInterval(time, 1000);

//display the dates 1-5 days from current date

function getFiveDayForecastDates(){
    forecastRowEl.classList.remove("hide-before-append");
    for (i = 1; i < 6; i++){
        const futureForecastDateEl = document.querySelector("#forecast-" + i + "-date")
        futureForecastDateEl.textContent = "";
        futureForecastDateEl.classList = "text-light slight-margin-allaround";
        
        var startdate = moment().format("MM/DD/YYYY");
        var new_date = moment(startdate, "MM/DD/YYYY").add(i, 'days');
        var month = new_date.format('MM');
        var day = new_date.format('DD');
        var year = new_date.format('YYYY');
        var daySelectorElDate = month + '/' + day + '/' + year
        futureForecastDateEl.textContent = daySelectorElDate;

        //will this work accordingly 
        //console.log(i);
    }
}

//place this function inside the main city search api call
//and get the lat lon from that response2
function cityCurrentUVIndexApiCall(lat, lon){
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=London%252Cuk", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "1e7bed241dmshfd2d554452d35aep17922cjsn4692c648f953"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
        //get the UV index number
        var currentUVnum = response2.value;

        //select element to put the text in
        var currentUVnumEl = document.querySelector("#day-current-UV");
        //set the text in the element
        currentUVnumEl.textContent = currentUVnum;
        //if statement determining the index value to change the color of the background of the text
        //and change the text color to match the background color to the UV index standard 
        if (currentUVnum === 0 || currentUVnum < 1){
            currentUVnumEl.classList = "low";
        } else if (currentUVnum >= 1 && currentUVnumEl <= 2){
            currentUVnumEl.classList = "low";
        } else if(currentUVnum >= 3 && currentUVnum <= 5) {
            currentUVnumEl.classList = "moderate";
        } else if (currentUVnum >=5 && currentUVnum < 6){
            currentUVnumEl.classList = "moderate";
        } else if(currentUVnum >= 6 && currentUVnum <= 7) {
            currentUVnumEl.classList = "high";
        } else if (currentUVnum >= 7 && currentUVnum < 8){
            currentUVnumEl.classList = "high";
        } else if (currentUVnum >= 8 && currentUVnum <= 9){
            currentUVnumEl.classList = "very-high";
        } else if(currentUVnum >= 8 && currentUVnum <= 10) {
            currentUVnumEl.classList = "very-high";
        } else if (currentUVnum > 10 && currentUVnum <= 11){
            currentUVnumEl.classList = "very-high";
        } else if(currentUVnum > 11) {
            currentUVnumEl.classList = "extreme";
        }
    });
}
//not placing the UV index into the 5 day forecast just yet
//place this inside the main five day forecast function  
//
// function cityCurrentUVIndexApiCall(lat, lon){
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q=London%252Cuk", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "1e7bed241dmshfd2d554452d35aep17922cjsn4692c648f953"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});

    //     //for loop to iterate through each date based on the 12pm index value
    //     for (let i = 1; i < 6; i++){
    //         //get the value of the UV index from the response
    //        // var uvDayNum = response2.
    //         //select element we are putting the text inside
    //         var uvDayEl = document.querySelector("#day-" + i + "UV");

    //     }
    //     //day1 UV Index

    //     //day2 UV Index
        
    //     //day3 UV Index
        
    //     //day4 UV Index
        
    //     //day5 UV Index
    // });
// }

function cityFiveDayApiCall(searchedCity){
    fetch(
        apiFiveDayUrl + searchedCity
    )
    .then(function(response){
        return response.json()
    })
    .then(function(response2){
        console.log("fetched 5 day forecast of city searched");
        console.log(response2);//get the 12pm midday hour weather indexes
        //day1 response2.list[6]
        //day2 response2.list[14]
        //day3 response2.list[22]
        //day4 response2.list[30]
        //day5 response2.list[38]
        
        //DONE
        //get day1 icon
        var day1IconId = response2.list[6].weather[0].icon;
        iconDay1El = document.querySelector("#day1-img");
        iconDay1El.setAttribute("src", "https://openweathermap.org/img/wn/" + day1IconId + "@2x.png");
        
        //get day2 icon
        var day2IconId = response2.list[14].weather[0].icon;
        iconDay2El = document.querySelector("#day2-img")
        iconDay2El.setAttribute("src", "https://openweathermap.org/img/wn/" + day2IconId + "@2x.png");
        
        //get day3 icon
        var day3IconId = response2.list[22].weather[0].icon;
        iconDay3El = document.querySelector("#day3-img")
        iconDay3El.setAttribute("src", "https://openweathermap.org/img/wn/" + day3IconId + "@2x.png");
        
        //get day4 icon
        var day4IconId = response2.list[30].weather[0].icon;
        iconDay4El = document.querySelector("#day4-img")
        iconDay4El.setAttribute("src", "https://openweathermap.org/img/wn/" + day4IconId + "@2x.png");
        
        //get day5 icon
        var day5IconId = response2.list[38].weather[0].icon;
        iconDay5El = document.querySelector("#day5-img")
        iconDay5El.setAttribute("src", "https://openweathermap.org/img/wn/" + day5IconId + "@2x.png");
        
        //get temp day1 CONVERT UNITS!!!
        var tempDay1 = response2.list[6].main.temp;
        //target the element we are placing in
        var tempDay1El = document.querySelector("#day-one-temp");
        //convert units
        var tempFOne = tempConvKtoF(tempDay1);
        var tempCOne = tempConvKtoC(tempDay1);
        //set textContent
        tempDay1El.textContent = tempFOne + "°F / " + tempCOne + "°C";

        //get temp day2
        var tempDay2 = response2.list[14].main.temp;
        //target the element we are placing in
        tempDay2El = document.querySelector("#day-two-temp");
         //convert units
         var tempFTwo = tempConvKtoF(tempDay2);
         var tempCTwo = tempConvKtoC(tempDay2);
         //set textContent
         tempDay2El.textContent = tempFTwo + "°F / " + tempCTwo + "°C";

        //get temp day3
        var tempDay3 = response2.list[22].main.temp;
        //target the element we are placing in
        tempDay3El = document.querySelector("#day-three-temp");
         //convert units
         var tempFThree = tempConvKtoF(tempDay3);
         var tempCThree = tempConvKtoC(tempDay3);
         //set textContent
         tempDay3El.textContent = tempFThree + "°F / " + tempCThree + "°C";

        //get temp day4
        var tempDay4 = response2.list[30].main.temp;
        //target the element we are placing in
        tempDay4El = document.querySelector("#day-four-temp");
         //convert units
         var tempFFour = tempConvKtoF(tempDay4);
         var tempCFour = tempConvKtoC(tempDay4);
         //set textContent
         tempDay4El.textContent = tempFFour + "°F / " + tempCFour + "°C";

        //get temp day5
        var tempDay5 = response2.list[38].main.temp;
        //target the element we are placing in
        tempDay5El = document.querySelector("#day-five-temp");
         //convert units
         var tempFFive = tempConvKtoF(tempDay5);
         var tempCFive = tempConvKtoC(tempDay5);
         //set textContent
         tempDay5El.textContent = tempFFive + "°F / " + tempCFive + "°C";

        //get humidity day1
        var humidDay1 = response2.list[6].main.humidity;
        //target the element we are placing in
        const humidDay1El = document.querySelector("#day-one-humid");
        //set textContent for each one
        humidDay1El.textContent = humidDay1;

        //get humidity day2
        var humidDay2 = response2.list[14].main.humidity;
        //target the element we are placing in
        const humidDay2El = document.querySelector("#day-two-humid");
        //set textContent for each one
        humidDay2El.textContent = humidDay2;

        //get humidity day3
        var humidDay3 = response2.list[22].main.humidity;
        //target the element we are placing in
        const humidDay3El = document.querySelector("#day-three-humid");
        //set textContent for each one
        humidDay3El.textContent = humidDay3;

        //get humidity day4
        var humidDay4 = response2.list[30].main.humidity;
        //target the element we are placing in
        const humidDay4El = document.querySelector("#day-four-humid");
        //set textContent for each one
        humidDay4El.textContent = humidDay4;

        //get humidity day5
        var humidDay5 = response2.list[38].main.humidity;
        //target the element we are placing in
        const humidDay5El = document.querySelector("#day-five-humid");
        //set textContent for each one
        humidDay5El.textContent = humidDay5;

        //get windspeed day1
        var windDay1 = response2.list[6].wind.speed;
        //target the element we are placing in
        const windDay1El = document.querySelector("#day-one-wind");
        //set textContent for each one
        windDay1El.textContent = windDay1 + " mph";

        //get windspeed day2
        var windDay2 = response2.list[14].wind.speed;
        //target the element we are placing in
        const windDay2El = document.querySelector("#day-two-wind");
        //set textContent for each one
        windDay2El.textContent = windDay2 + " mph";

        //get windspeed day3
        var windDay3 = response2.list[22].wind.speed;
        //target the element we are placing in
        const windDay3El = document.querySelector("#day-three-wind");
        //set textContent for each one
        windDay3El.textContent = windDay3 + " mph";

        //get windspeed day4
        var windDay4 = response2.list[30].wind.speed;
        //target the element we are placing in
        const windDay4El = document.querySelector("#day-four-wind");
        //set textContent for each one
        windDay4El.textContent = windDay4 + " mph";

        //get windspeed day5
        var windDay5 = response2.list[38].wind.speed;
        //target the element we are placing in
        const windDay5El = document.querySelector("#day-five-wind");
        //set textContent for each one
        windDay5El.textContent = windDay5 + " mph";

        //get description day1
        var descDay1 = response2.list[6].weather[0].description;
        //target the element we are placing in
        const descDay1El = document.querySelector("#day-one-description");
        //set textContent for each one
        descDay1El.textContent = descDay1;

        //get description day2
        var descDay2 = response2.list[14].weather[0].description;
        //target the element we are placing in
        const descDay2El = document.querySelector("#day-two-description");
        //set textContent for each one
        descDay2El.textContent = descDay2;

        //get description day3
        var descDay3 = response2.list[22].weather[0].description;
        //target the element we are placing in
        const descDay3El = document.querySelector("#day-three-description");
        //set textContent for each one
        descDay3El.textContent = descDay3;
        
        //get description day4
        var descDay4 = response2.list[30].weather[0].description;
        //target the element we are placing in
        const descDay4El = document.querySelector("#day-four-description");
        //set textContent for each one
        descDay4El.textContent = descDay4;

        //get description day5
        var descDay5 = response2.list[38].weather[0].description;
        //target the element we are placing in
        const descDay5El = document.querySelector("#day-five-description");
        //set textContent for each one
        descDay5El.textContent = descDay5;
    });
}

//add catch for when a city name could not be found, send a message to user and return
//check if searched city is null and alert user no city name was entered
function cityCurrentApiCall(searchedCity){
    fetch(
        apiCurrentUrl + searchedCity
        )
        .then(function(response){
            console.log(response);
            if(response.ok){
                response.json()
                .then(function(response2){
                    console.log("city name object fetched from server")
                    console.log(response2);
                    console.log("city name fetched from server");
                    console.log(response2.name);
                    
                    getCurrentWeatherIcon(response2.weather[0].icon);
                    getCurrentTemp(response2.main.temp);
                    getCurrentHumidity(response2.main.humidity);
                    getCurrentWindSpeed(response2.wind.speed);
                    getCurrentDescription(response2.weather[0].description);
                    
                    //get the lat and lon values from the response place as arguments for this function
                    //let lat = response2.coord.lat;
                    //let lon = response2.coord.lon;
                    cityCurrentUVIndexApiCall(response2.coord.lat, response2.coord.lon);
                
                    var fetchedCityContainer = document.querySelector("#city-header");
                    //change this element to an <a> anchor element
                    //set the function inside the HTML on click execute displaySearchedCity
                    var fetchedCityEl = document.createElement("p");
                    fetchedCityEl.classList = "city-alt";
                    fetchedCityEl.textContent = "(" + response2.name + ", " + response2.sys.country + ")";
                    fetchedCityContainer.appendChild(fetchedCityEl);
                });
            } else {
                window.alert("We could not find that city: " + response.statusText);
            }
        })
    .catch(
        err => alert("Possible network error occurred. " + err)
    );
    
}

function tempConvKtoF(valNum) {
    valNum = parseFloat(valNum);
    var newTempF = Math.floor(((valNum-273.15)*1.8)+32);
    return newTempF;
}
  
function tempConvKtoC(valNum) {
    valNum = parseFloat(valNum);
    var newTempC = Math.floor(valNum-273.15);
    return newTempC;
}

function getCurrentTemp(weatherTempObject){
    var currentTemp = document.querySelector("#current-temp");
    var tempF = tempConvKtoF(weatherTempObject);
    var tempC = tempConvKtoC(weatherTempObject);
    currentTemp.textContent = tempF + "°F / " + tempC + "°C";
}

function getCurrentHumidity(weatherHumidObject){
    var currentHumid = document.querySelector("#current-humid");
    currentHumid.textContent = weatherHumidObject;
}

function getCurrentWindSpeed(weatherWindObject){
    var currentWind = document.querySelector("#current-wind");
    currentWind.textContent = weatherWindObject + " mph";
}

function getCurrentDescription(weatherDescriptionObject){
    var currentDescription = document.querySelector("#current-description")
    currentDescription.textContent = weatherDescriptionObject;
}

function getCurrentWeatherIcon(weatherIconObject){
    
    var weatherIconEl = document.createElement("img");
    weatherIconEl.classList = "img-background ml-2 mt-2";
    var weatherIconContainer = document.querySelector("#city-header");
    weatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIconObject + "@2x.png");
    weatherIconContainer.appendChild(weatherIconEl);

}

//search city button function and past city searches function
//DONE need to add in the api fetches here, some changes will be made to this later to append info
//DONE  *from the api call to the city list and the city info section

function displaySearchedCity(){


    //prevent the submit button default action of refreshing the page
    event.preventDefault();
    
    //check button was clicked
    console.log("here is the element we targeted with our click event");
    console.log(event.target);
    console.log("search button was clicked")
    
    const cityHeader = document.querySelector("#city-header");
    //remove the hide class before we append
    //get the value of the text field to place into the city span element
    const cityName = document.querySelector("#city-name").value;
    //check if the value was falsey or null return out of function
    //  **alert user that no city name was entered
    if (!cityName){
        window.alert("no city name was entered!")
        return;
    }
    citylistEl.classList.remove("hide-before-append");
    cityHeader.classList.remove("hide-before-append");

    //create element containing city name
    const citySearchEl = document.createElement("span");
    //create button element to append the span to
    const citySearchedButtonEl = document.createElement("button");
    citySearchedButtonEl.classList = "slight-margin-allaround width-100 button-search-name";
    citySearchedButtonEl.setAttribute("type", "submit");
    citySearchedButtonEl.appendChild(citySearchEl);
    
    //set class list for city name container
    citySearchEl.classList = "slight-margin-allaround width-100 border-bottom-user"
    
    //check we are getting it in the console
    console.log("here is the city name")
    console.log(cityName);

    //put the city name inside the cityEl span element and the city-name-header element
    updateCurrentDate();
    cityHeader.innerText = cityName;    
    citySearchEl.innerText = cityName;
    
    //prepend the cityEl into the citylistEl
    citylistEl.prepend(citySearchedButtonEl);
    citySearchedButtonEl.addEventListener("click", function(event){
        //console.log("here is the element we targeted with our click event")
        console.log(event.target);
        formInputTextAreaEl.value = cityName;
        displaySearchedCityFromButton(formInputTextAreaEl.value);
    });
    clearInputField();
    getFiveDayForecastDates();
    cityCurrentApiCall(cityName);
    cityFiveDayApiCall(cityName);
    //updateTime.classList.remove("hide-before-append");
    saveCity(cityName);

}

function clearInputField(){
    let inputForm = document.querySelector("#input-form");
    //console.log(text);
    inputForm[0].value = "";
    //console.log("cleared the input field")
    //console.log(inputForm[0].value);
}

//submit button event listener
buttonEl.addEventListener("click", displaySearchedCity);

const inputFormEl = document.querySelector("#input-form");
//fixing the submit default of the input form which refreshes the page
//after hitting enter, preventDefault fixes this
inputFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    displaySearchedCity();
});