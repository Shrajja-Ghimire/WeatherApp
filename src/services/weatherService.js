import { DateTime } from "luxon";

const API_KEY = "b0531ca23e7f59c8941cb7fc76c7bbd1"; //unique identifier to acces openweathermap
const BASE_URL = "https://api.openweathermap.org/data/2.5/"; //base url for weather related data

//asynchronous funtion to fetch data from api
const getWeatherData = async (infoType, searchParams) => {
  //type of weatherdata to fetch,searchthrough params like citynames,geographical,units.
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

//funtion to create icon url making dyanamic$
const iconUrlFromCode = (
  icon
) => `https://openweathermap.org/img/wn/${icon}@2x.png
`;

//convert human readable local time
const formatToLocalTime = (
  secs, //unix timestamp
  offset, //timezone
  format = "cccc,dd LLL yyyy'| Localtime: 'hh:mm a" //default format
) => {
  return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
};

//process current weatherdata:Extracts values from the API response ,Converts the sunrise and sunset timestamps into human-readable time using formatToLocalTime.,
//Returns an object with all relevant data, including a formatted local time (formattedLocalTime) and weather icon (icon).
const formatCurrent = (data) => {
  //name with api must be same otherwise not work
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;
  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

//formatForecastWeather processes forecast data into hourly and daily forecast:
const formatForecastWeather = (secs, offset, data) => {
  //hourly =>It filters forecast data to show only upcoming hours
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  //daily=>It filters the data to show only the forecast for "00:00:00" times
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));
  return { hourly, daily }; //The function returns an object with hourly and daily forecast arrays.
};

//getFormattedWeatherData combines both the current weather data and the forecast data:
//first fetches the current weather using the getWeatherData function with the weather info type and formats it using formatCurrent.
//then fetches the forecast data using the getWeatherData function with the forecast info type, passing latitude, longitude, and units, and formats the result using formatForecastWeather.
const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
  //The function returns an object that combines both the current weather data (formattedCurrentWeather) and the forecast data (formattedForecastWeather).
};
export default getFormattedWeatherData;
