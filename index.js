const apiKey = "d4597972782feb48ea458af269e0a811";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search-input");

const searchButton = document.querySelector(".search-button");

const weatherIcon = document.querySelector(".weather-icon");

const bgImage = document.querySelector(".main-container");

const checkWeather = async(city) => {
	const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
	const data = await res.json();
	console.log(data);

	if(!res.ok == true){
		document.querySelector(".error").style.display="block";
		document.querySelector(".weather-container").style.display="none";
		bgImage.dataset.weather = "none";
	}

	document.querySelector(".city-name").innerHTML = data.name;
	document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
	document.querySelector(".humidity").firstElementChild.innerHTML = data.main.humidity + "%";
	document.querySelector(".windspeed").firstElementChild.innerHTML = data.wind.speed + "Km/h";


	if (data.weather[0].main == "Clear") {
		data.weather[0].icon.includes("d") ? weatherIcon.src = "media/icons/sun.png" : weatherIcon.src = "media/icons/moon.png";
		data.weather[0].icon.includes("d") ? bgImage.dataset.weather = "sun" : bgImage.dataset.weather = "moon";
	} else if (data.weather[0].main == "Clouds"){
		weatherIcon.src = "media/icons/clouds.png";
		bgImage.dataset.weather = "clouds";
	} else if (data.weather[0].main == "Thunderstorm"){
		weatherIcon.src = "media/icons/storm.png";
	} else if (data.weather[0].main == "Drizzle"){
		weatherIcon.src = "media/icons/drizzle.png";
		bgImage.dataset.weather = "drizzle";
	} else if (data.weather[0].main == "Rain"){
		weatherIcon.src = "media/icons/rain.png";
		bgImage.dataset.weather = "rain";
	} else if (data.weather[0].main == "Snow"){
		weatherIcon.src = "media/icons/snow.png";
	}

	document.querySelector(".weather-container").style.display="flex";
	document.querySelector(".error").style.display="none";
}

searchButton.addEventListener('click', ()=>{
	checkWeather(searchInput.value);
})