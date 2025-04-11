import React from "react";

const TimeandLocation = ({
  weather: { formattedLocalTime, name, country },
}) => (
  <div className="mt-0">
    <p className="text-gray-50 text-center ">{formattedLocalTime}</p>

    <p className="text-gray-50 font-bold text-3xl text-center p-4">{`${name},${country}`}</p>
  </div>
);

export default TimeandLocation;
