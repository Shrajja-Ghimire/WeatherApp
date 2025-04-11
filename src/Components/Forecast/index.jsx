import React from "react";

const Forecast = ({ title, data }) => {
  return (
    <div className="mt-10 text-gray-50">
      <p className="uppercase text-gray-300 font-bold ml-4 md:ml-8">{title}</p>
      <hr className="my-2 border-gray-400" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 shadow-md"
          >
            <p className="font-light">{d.title}</p>
            <img
              src={d.icon}
              alt="weatherIcon"
              width={50}
              height={40}
              className="my-2"
            />
            <p className="text-sm text-gray-200 font-semibold">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
