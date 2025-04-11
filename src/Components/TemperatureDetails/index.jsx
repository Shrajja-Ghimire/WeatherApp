import React from "react";
import sun from "../../assets/sun.png";
import { FaThermometerEmpty } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
const TempertureDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
}) => {
  const detailList = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "RealFeel:",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: WiHumidity,
      title: "Humidity:",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind:",
      value: `${speed.toFixed()}m/s`,
    },
  ];
  const forecastdetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise:",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset:",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High:",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low:",
      value: `${temp_min.toFixed()}°`,
    },
  ];
  return (
    <>
      <p className="text-white text-center">{details}</p>
      <div className="flex justify-around items-center p-5">
        <img src={icon} width={90} height={60} alt="weather-icon" />
        <p className="text-2xl text-white font-bold">{`${temp.toFixed()}°`}</p>

        <div className="text-white">
          {detailList.map(({ id, Icon, title, value }) => {
            return (
              <div key={id} className="flex items-center gap-2 my-1">
                <Icon size={18} />
                <p className="text-sm">{title}</p>
                <span className="text-xs">{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* sun details */}
      <div className=" md:flex justify-around items-center text-white font-bold mb-4">
        {forecastdetails.map(({ id, Icon, title, value }) => {
          return (
            <div key={id} className="flex items-center gap-2 my-1">
              <Icon size={18} />
              <p className="text-sm">{title}</p>
              <span className="text-xs">{value}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TempertureDetails;
