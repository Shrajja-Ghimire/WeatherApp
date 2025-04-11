import React, { useEffect, useState } from "react";
import InputField from "../Inputs";
import TimeandLocation from "../TimeandLocation";
import TempertureDetails from "../TemperatureDetails";
import Forecast from "../Forecast";
import getFormattedWeatherData from "../../services/weatherService";

//function based component
const WeatherApp = () => {
  const [query, setQuery] = useState({ q: "kathmandu" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "bg-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "bg-blue-700";
    return "bg-gradient-to-t from-yellow-600 to-orange-700";
  };

  return (
    <div className={`${formatBackground()}`}>
      <h1 className="text-center mb-2 font-bold text-white text-2xl  animate-pulse underline md:text-3xl md:text-start md:p-5">
        Weather App
      </h1>

      <div
        className={`m-auto w-auto ${formatBackground()} shadow-xl md:w-auto min-h-screen p-3 mb-5 `}
      >
        <div className="w-full md:w-1/3 mb-6">
          <InputField setQuery={setQuery} setUnits={setUnits} />
        </div>
        {/* <InputField setQuery={setQuery} setUnits={setUnits} /> */}
        {weather && (
          <div className="w-full ">
            <TimeandLocation weather={weather} />
            <TempertureDetails weather={weather} />

            <div className=" ">
              <Forecast title="3-Hour Forecast" data={weather.hourly} />
              <Forecast title="Daily Forecast" data={weather.daily} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
