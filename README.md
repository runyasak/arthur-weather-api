# Arthur Weather API
The service for request current forecasting of country by country name or id, according to [Yahoo Weather](https://developer.yahoo.com/weather/).

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

Get weather data
	
	/* REQUEST CURRENT FORECAST AND FUTURE */
	localhost:3000/api/v1/weather/
	
	/* REQUEST HISTORY DATA */
	localhost:3000/api/v1/weather/history

	/* REQUEST DATA BY MONTH */
	localhost:3000/api/v1/weather/month/:month

	/* REQUEST DATA BY YEAR */
	localhost:3000/api/v1/weather/year/:year

## ❄️ Config Variables
The environment variables for running on project

	PORT='<SERVICE LISTENER PORT>'
