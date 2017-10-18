# Arthur Weather API
The service for request current forecasting of country by country name or id, according to [openWeatherMap](http://openweathermap.org/current).

## 💡 Requirements
* Node v7.7.2
* NPM latest version

## 📦 Packages
* axios
* Express
* sql.js

## ✨ Usage
Install all packages and run on development

	npm run dev

Get current weather of country by route /weather
	
	/* REQUEST BY COUNTRY NAME */
	http://localhost:3000/weather/Thailand
	
	/* REQUEST BY COUNTRY ID */
	http://localhost:3000/weather/1608132

## ❄️ Config Variables
The environment variables for running on project, using dotenv on ` NODE_ENV='development'`.

	NODE_ENV='<STATE OF NODE ENVIRONMENT>'
	
	PORT='<SERVICE LISTENER PORT>'
	
	APP_ID='<OPEN_WEATHER APP ID>'