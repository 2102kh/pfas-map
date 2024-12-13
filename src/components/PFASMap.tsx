import { useEffect } from "react";
import L from "leaflet"; 
import "leaflet/dist/leaflet.css"; 

export const PFASMap = () => {
  useEffect(() => {
    // Kolla om en karta redan finns i detta element och ta bort den
    const existingMap = L.DomUtil.get("map");
    if (existingMap) {
      (existingMap as HTMLElement & { _leaflet_id?: string | null })._leaflet_id = null;
    }

    // Skapa en ny karta och centrera den över Sverige
    const map = L.map("map").setView([59.3293, 18.0686], 5); 

    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    
    const locations = [
      { city: "Stockholm", lat: 59.3293, lng: 18.0686, info: "Stockholm: PFAS nivå 25" },
      { city: "Göteborg", lat: 57.7089, lng: 11.9746, info: "Göteborg: PFAS nivå 15" },
      { city: "Malmö", lat: 55.605, lng: 13.0038, info: "Malmö: PFAS nivå 10" },
    ];

    locations.forEach((location) => {
      L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(location.info); 
    });
  }, []); 

  return (
    <div
      id="map" 
      style={{ 
        height: "600px",
        width: "100%",
        position: "relative",
        zIndex: 1,}} 
    ></div>
  );
};
