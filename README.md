# Arthur Weather API
The service for request current forecasting of country by country name or id, according to [openWeatherMap](http://openweathermap.org/current).

## 💡 Requirements
* Node V6
* NPM latest version

## 📦 Packages
* Express
* node-sqlite3

## ✨ Usage
Install all packages and run on development

	npm run dev

Get current weather of country by route /weather
	
	/* REQUEST BY COUNTRY NAME */
	http://localhost:3000/weather/Thailand
	
	/* REQUEST BY COUNTRY ID */
	http://localhost:3000/weather/1608132