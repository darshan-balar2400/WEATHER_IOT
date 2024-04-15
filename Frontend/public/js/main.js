
// const searchInput = document.getElementById("searchInput");
// const searchButton = document.getElementById("searchButton")
let error = document.querySelector(".error");

// https://api.geoapify.com/v1/ipinfo?apiKey=1b8f225a24dc4e5b89a2952a86e56f2d
// API KEy = 1b8f225a24dc4e5b89a2952a86e56f2d
// const getUserCurrentCity = async(e) => {
// 	const url = "https://weather-iot-eight.vercel.app/";
// 	const fetchData = await fetch(url);
// 	const jsonData = await fetchData.json();

// 	fetchWeather();
// }

// getUserCurrentCity();

const getModifiedDate = () => {
	const d = new Date();
	let date = document.getElementById('date');

	const days = [
		"SUN",
		"MON",
		"TUE",
		"WED",
		"THU",
		"FRI",
		"SAT"
	];

	const months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JULY",
		"AUG",
		"SEPT",
		"OCT",
		"NOV",
		"DEC"
	];
	
	let minute = d.getMinutes();
	let hour = d.getHours();

	let period = "AM";

	if(minute < 10){
		minute = "0" + minute;
	}
	if(hour > 11){
		hour = hour - 12;
		period = "PM";
	}

	let day = days[d.getDay()];
	let month = months[d.getMonth()];
	let date_ = d.getDate();

	date.innerHTML = `${day} | ${month} ${date_} | ${hour} : ${minute} ${period}`;
}

const calculateAmbience = (temperature_C, humidity, airQuality_ppm) => {
	const normalizedTemp = (temperature_C - 30.0) / (45.0 - 30.0);
	const normalizedHumidity = (humidity - 60.0) / (80.0 - 60.0);
	const normalizedAirQuality = (airQuality_ppm - 600.0) / (1200.0 - 600.0);
	
	const weightTemp = 0.4;
	const weightHumidity = 0.4;
	const weightAirQuality = 0.3;
	
	const ambience = (weightTemp * normalizedTemp) + (weightHumidity * normalizedHumidity) + (weightAirQuality * normalizedAirQuality);
	
	let scaledAmbience = 1.0 + 9.0 * ambience;
	scaledAmbience = scaledAmbience.toFixed(2);
	
	return Math.min(10.0, Math.max(1.0, scaledAmbience));
}


// const calculateAmbience = (temperature_C, humidity, airQuality_ppm) => {
//     const normalizedTemp = (temperature_C - 30.0) / (45.0 - 30.0);
//     const normalizedHumidity = (humidity - 60.0) / (80.0 - 60.0);
//     const normalizedAirQuality = (airQuality_ppm - 600.0) / (1200.0 - 600.0);
    
//     const weightTemp = 0.4;
//     const weightHumidity = 0.3;
//     const weightAirQuality = 0.3;
    
//     // Additional factor: Time of day (example)
//     const timeOfDayFactor = getTimeOfDayFactor(); // Example function to get time of day factor
    
//     // Adjust weights based on additional factor
//     const adjustedWeightTemp = weightTemp * timeOfDayFactor;
//     const adjustedWeightHumidity = weightHumidity * timeOfDayFactor;
//     const adjustedWeightAirQuality = weightAirQuality * timeOfDayFactor;
    
//     const ambience = (adjustedWeightTemp * normalizedTemp) + 
//                      (adjustedWeightHumidity * normalizedHumidity) + 
//                      (adjustedWeightAirQuality * normalizedAirQuality);
    
//     const scaledAmbience = 1.0 + 9.0 * ambience;
    
//     return Math.min(10.0, Math.max(1.0, scaledAmbience));
// }

// Example function to calculate time of day factor
const getTimeOfDayFactor = () => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    
    // Adjust weights based on time of day
    if (hour >= 6 && hour < 12) {
        // Morning: Increase weights
        return 1.2;
    } else if (hour >= 12 && hour < 18) {
        // Afternoon: Keep weights unchanged
        return 1.0;
    } else {
        // Evening/Night: Decrease weights
        return 0.8;
    }
}

const fetchWeather = async() =>{
	
	let content = document.getElementById('content');

	const url = `https://weather-iot-eight.vercel.app/`;
	content.innerHTML = "<button class='spinner-border'></button>";
	const fetchData = await fetch(url);
	const jsonData = await fetchData.json();

	console.log(jsonData);

    let temp = jsonData.data.temp;
	let humidity = jsonData.data.humidity;
	let aqi = jsonData.data.aqi;
	let status = jsonData.data.status;

	let ambience = calculateAmbience(41,72, 957);

	

	if(jsonData.success == false){
		error.innerText = "** Something went wrong !";
		return;
	}
	
	content.innerHTML = `
		<div class="top_layer">
			<h2 class="title">Ambience Level : </h2>
			<span class="lead" id="date"></span>

			<div class="temprature">
				<h1>${ambience} PT</h1>
			</div>
		</div>
		<hr style="background-color:lightgray;">
		<div class="bottom_layer">
			<div class="row">
				<div class="col-md-6 col-12 ">
				<h4> Temp : ${jsonData.data.temp}&deg; C</h4>
					<h4>Humidity : ${jsonData.data.humidity}</h4>
				</div>
				<div class="col-md-6 col-12 text-left">
					<h4>AQI : ${jsonData.data.aqi} PPM</h4>
						<h4> AIR Status : ${jsonData.data.status}</h4>		
				</div>
	
				<div class="col-md-6 col-12 text-left">
					<h4>Location : Vellore, Tamilnadu </h4>	
				</div>
			</div>
		</div>
	`;
}

setInterval(() => {
	fetchWeather();
},5000);

fetchWeather();
// const getData = async (e) => {
// 	e.preventDefault();

// 	let cityName = searchInput.value;

// 	if(cityName == ""){
// 		error.innerText = " ** Please enter city Name ";
// 	}
// 	else{
// 		try{
// 			fetchWeather(cityName);
// 			error.innerText = "";
// 			getModifiedDate();
// 		}catch{
// 			content.innerHTML = "";
// 		}
// 	}
// }

// searchButton.addEventListener("click",getData);
