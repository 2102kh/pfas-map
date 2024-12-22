
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NavLink } from "react-router-dom";
import { ICity } from "../types/City.ts";
import { getAllCitiesInfo } from "../API/getAllCitiesInfo.ts";

export const Home = () => {
  const [citiesInfo, setCitiesInfo] = useState<ICity[]>([]);

  useEffect(() => {
    const fetchCitiesInfo = async () => {
      const citiesInfo = await getAllCitiesInfo();
      setCitiesInfo(citiesInfo);
    };
    fetchCitiesInfo();
  }, []);

  console.log(citiesInfo)

  useEffect(() => {

    const existingMap = L.DomUtil.get("map");
    if (existingMap) {
      (existingMap as any)._leaflet_id = null;
    }


    const map = L.map("map").setView([59.3293, 18.0686], 5);


    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);


    const locations = citiesInfo.filter(city => city.lng && city.lat && city.pfasData).map((city) => ({ city: city.name, lat: city.lat, lng: city.lng, info: `${city.name}: PFAS nivå  ${city.pfasData}` }));
    

    locations.forEach((location) => {
      L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(location.info);
    });
  }, [citiesInfo]);

  return (

    <>
      <NavLink to="/admin-login" className="form-link">
        Är du länsstyrelse-administratör? logga in här
      </NavLink>
      <div
        id="map"
        style={{
          height: "60vh",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >


      </div>
    </>

  );
};

