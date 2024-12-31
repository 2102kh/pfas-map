import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ICity } from "../types/City.ts";
import { getAllCitiesInfo } from "../API/getAllCitiesInfo.ts";
import "../styles/_pfas-map.scss";

export const Home = () => {
  const [citiesInfo, setCitiesInfo] = useState<ICity[]>([]);

  useEffect(() => {
    const fetchCitiesInfo = async () => {
      const citiesInfo = await getAllCitiesInfo();
      setCitiesInfo(citiesInfo);
    };
    fetchCitiesInfo();
  }, []);

  useEffect(() => {
    const existingMap = L.DomUtil.get("map");
    if (existingMap) {
      (existingMap as any)._leaflet_id = null;
    }

    const map = L.map("map", {
      center: [60.128161, 18.643501],
      zoom: 5,
      maxBoundsViscosity: 1.0,
      zoomSnap: 0.1,
      zoomDelta: 0.5,
    });
    map.setMaxBounds([
      [50, 0],
      [70, 30],
    ]);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const locations = citiesInfo
      .filter((city) => city.lng && city.lat && city.pfasData)
      .map((city) => ({
        city: city.name,
        lat: city.lat,
        lng: city.lng,
        info: `${city.name}: PFAS nivå ${city.pfasData}`,
        pfas: Number(city.pfasData),
      }));


    function getIcon(location: { pfas: number }) {
      const isMobile = window.innerWidth <= 768;
      const iconSize: [number, number] = isMobile ? [15, 25] : [22, 35];

      if (location.pfas >= 4 && location.pfas <= 10) {
        return new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
          iconSize,
          iconAnchor: [iconSize[0] / 2, iconSize[1]],
          popupAnchor: [1, -iconSize[1] / 2],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [iconSize[0], iconSize[1]],
        });
      } else if (location.pfas > 10 && location.pfas <= 40) {
        return new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
          iconSize,
          iconAnchor: [iconSize[0] / 2, iconSize[1]],
          popupAnchor: [1, -iconSize[1] / 2],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [iconSize[0], iconSize[1]],
        });
      } else if (location.pfas > 40) {
        return new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          iconSize,
          iconAnchor: [iconSize[0] / 2, iconSize[1]],
          popupAnchor: [1, -iconSize[1] / 2],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [iconSize[0], iconSize[1]],
        });
      } else {
        return new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
          iconSize,
          iconAnchor: [iconSize[0] / 2, iconSize[1]],
          popupAnchor: [1, -iconSize[1] / 2],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [iconSize[0], iconSize[1]],
        });
      }
    }


    locations.forEach((location) => {
      return L.marker([location.lat, location.lng], {
        icon: getIcon(location),
      })
        .addTo(map)
        .bindPopup(location.info);
    });
  }, [citiesInfo]);

  return (
    <>
      <div id="map"></div>
    </>
  );
};
