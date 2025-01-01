import { useContext, useEffect, useState } from "react";
import { ICity } from "../types/City.ts";
import { getCityInfo } from "../API/getCityInfo.ts";
import { AuthContext } from "../contexts/AuthContext.ts";
import { editCityInfo } from "../API/editCityInfo.ts";
import "../styles/_edit-pfas.scss";
const formatTimestamp = (timestamp: any): string => {
  if (timestamp?.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toISOString().split("T")[0];
  }
  return "Ingen information";
};

const EditPfas = () => {
  const [cityInfo, setCityInfo] = useState<ICity | null>(null);
  const [level, setLevel] = useState<string>("");
  const context = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (cityInfo) {
      setLevel(cityInfo.pfasData);
      setLastUpdated(formatTimestamp(cityInfo.lastUpdate || null));
    }
  }, [cityInfo]);

  useEffect(() => {

    const fetchCityInfo = async () => {
      if (!context?.currentUser?.city) return;
      const res = await getCityInfo(context.currentUser.city);

      if (res) setCityInfo(res);
    };
    fetchCityInfo();
  }, [context?.currentUser?.city]);

  console.log("cityInfo", cityInfo);


  const handleEdit = async () => {
    setIsEditing(false);

    if (!cityInfo) return;
    if (isNaN(+level)) {
      setLevel(cityInfo.pfasData)
      return;
    };
    await editCityInfo(cityInfo.uid, level);
    setLastUpdated(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="edit-pfas">
      <h2>Uppdatera PFAS-information</h2>
      {cityInfo && (
        <div className="edit-pfas__container">
          <p className="edit-pfas__city">Stad: {cityInfo.name}</p>
          <div className="edit-pfas__level">
            <span className="edit-pfas__label">Pfas nivå:</span>
            {isEditing ? (
              <input
                className="edit-pfas__input"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                title="Pfas Level"
                placeholder="Enter Pfas Level"
              />
            ) : (
              <span className="edit-pfas__value">{level}</span>
            )}
            {isEditing ? (
              <button className="edit-pfas__button edit-pfas__button--save" onClick={handleEdit}>
                Spara
              </button>
            ) : (
              <button className="edit-pfas__button edit-pfas__button--edit" onClick={() => setIsEditing(true)}>
                Redigera
              </button>
            )}
          </div>
          <p className="edit-pfas__last-updated">
            Senast uppdaterad: {lastUpdated ? lastUpdated : "Ingen information"}
          </p>
        </div>
      )}
    </div>

  )
}

export default EditPfas
