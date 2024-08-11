import { useEffect, useState } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";

const UserLoaction = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
        );
        const address = response.data.display_name;
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=704c7883b656bc78b1d2dd26f690250a`
        );
        console.log(response);
        const weatherInfo = weatherRes.data.weather[0].description;

        setLocation(address.split(","));
        setWeather(weatherInfo);
        setLatitude(lat);
        setLongitude(lng);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getLocation();
  });

  return (
    <div className="w-full md:py-8">
      <div className=" w-[100%] md:w-[80%] mx-auto bg-white shadow-lg rounded-lg flex flex-col md:flex-row p-3 md:p-6 justify-between">
        <div className="w-[100%] h-[250px] md:h-[400px] md:[40%] border border-black">
          <MapComponent latitude={latitude} longitude={longitude} />
        </div>

        <div className="w-[100%] md:w-[40%] flex flex-col gap-2 ">
          <h1 className="text-lg md:text-2xl font-bold mt-6 md:mt-0 mb-4">Your Location</h1>
          <div className="grid grid-cols-2 items-center  p-3 bg-[#eeeeeea2]">
            <h3 className="text-sm md:text-[15px] font-semibold">City </h3>
            <h3 className=" bg-[#e6e4e4] p-2 px-3 rounded-xl text-xs md:text-[13px]">
              {location ? location[0] : ""}
            </h3>
          </div>
          <div className="grid grid-cols-2 items-center  p-3 bg-[#eeeeeea2]">
            <h3 className="text-sm md:text-[15px] font-semibold">State </h3>
            <h3 className=" bg-[#e6e4e4] p-2 px-3 rounded-xl text-xs md:text-[13px]">
              {location ? location[1] : ""} , {location ? location[2] : ""}
            </h3>
          </div>
          <div className="grid grid-cols-2 items-center  p-3 bg-[#eeeeeea2]">
            <h3 className="text-sm md:text-[15px] font-semibold">Country </h3>
            <h3 className=" bg-[#e6e4e4] p-2 px-3 rounded-xl text-xs md:text-[13px] font-bold uppercase">
              {location ? location[3] : ""}
            </h3>
          </div>
          <div className="grid grid-cols-2 items-center  p-3 bg-[#eeeeeea2]">
            <h3 className="text-sm md:text-[15px] font-semibold">Current Weather </h3>
            <h3 className=" bg-[#e6e4e4] p-2 px-3 rounded-xl text-xs md:text-[13px] uppercase">
              {weather}{" "}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoaction;
