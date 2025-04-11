import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
const InputField = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCity("");
    } else {
      alert("Please enter name of city");
    }
  };
  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
        placeholder="Search by city..."
        className="my-6 w-full md:w-3/4 p-3 rounded-xl bg-white/20 text-white placeholder-white caret-white outline-none focus:outline-none  shadow-md "
        required
      />

      <button
        className="p-1 text-white hover:scale-125 transition-ease-out"
        onClick={handleSearchClick}
      >
        <FaSearch />
      </button>
      <span className="flex items-center">
        <button
          className="p-1 text-white transition-ease-out hover:scale-125 font-bold"
          onClick={() => setUnits("metric")}
        >
          &deg;C
        </button>
        <p className="text-white">|</p>
        <button
          className="p-1 text-white transition-ease-out hover:scale-125 font-bold"
          onClick={() => setUnits("imperial")}
        >
          &deg;F
        </button>
      </span>
    </div>
  );
};

export default InputField;
