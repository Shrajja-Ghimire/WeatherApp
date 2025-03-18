import React, { useEffect, useRef, useState } from "react"; //manage component state and side effects
import { FaSearch } from "react-icons/fa";
import Cloudy from "../../assets/clouds.png";
import Drizzle from "../../assets/drizzle.png";
import Rainy from "../../assets/rain.png";
import Sunny from "../../assets/sun.png";
import Thunder from "../../assets/thunderstrom.png";
import Humidity from "../../assets/humidity.png";
import Wind from "../../assets/wind.png";

//function based component
const WeatherApp = () => {
  const inputRef = useRef(); //directly references the search input field
  const [weatherData, setWeatherData] = useState(false); //it store weatherdat aonce fetch from api if no data itis initialized as false

  //search function is responsible to fetch data
  const search = async (city) => {
    //input validation if city is an empty , alert is shown.
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      //we add &units=metric to convert temp into degree celsius
      //we add $ to make it dynamic
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`; //apikey are appear in .env file with the name VITE_APP_ID

      const response = await fetch(url);
      const data = await response.json(); //console.log(data); to check the data
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      //updateWeatherData state,takes object as an argument to display on screen
      setWeatherData({
        humidity: data.main.humidity, //key:value from api
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp), //floor(24.7 becomes 24)
        location: data.name,
        icon: iconUrl,
      });
    } catch (error) {
      //if error occur setWeatherData becomes false
      setWeatherData(false);
      console.log("Error in fetching", error);
    }
  };

  useEffect(() => {
    search("Nepal"); //when component mounts it display nepal as a default
  }, []);

  return (
    <>
      <h1 className="text-center p-10 text-3xl font-bold text-blue-800">
        Weather App
      </h1>

      <div className="m-auto w-80 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-10 rounded-2xl shadow-xl md:w-96 p-6">
        {/* Search Bar */}
        <div className="flex justify-between items-center">
          <button
            className="p-3 bg-blue-700 text-white rounded-full"
            onClick={() => search(inputRef.current.value)} // search funtion is triggered,able to read current valueof input when user clicks the button
          >
            <FaSearch />
          </button>
          <input
            type="search"
            ref={inputRef}
            placeholder="Search for a city..."
            className="my-6 w-3/4 p-3 border border-gray-300 rounded-2xl shadow-lg outline-none"
            required
          />
        </div>
        {/* Conditional rendering*/}
        {weatherData ? (
          //is weather data available it display ...(all the below)
          <>
            <img
              src={weatherData.icon}
              alt="weather-image"
              className="mx-auto"
              width={150}
            />
            <p className="text-4xl text-white font-semibold mt-3 text-center">
              {weatherData.temperature}
            </p>
            <p className="text-gray-300 font-black text-2xl text-center">
              {weatherData.location}
            </p>
            <div className="flex justify-between items-center mt-5 p-5 text-white ">
              <div className="flex items-center gap-3">
                <img src={Humidity} alt="weather-data" width={30} />
                <div>
                  <p className="font-bold">{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={Wind} alt="weather-data" width={30} />
                <div>
                  <p className="font-bold">{weatherData.windSpeed}km/hr</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          //not Avaible in weather Data,displays empty
          <></>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
