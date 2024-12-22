import {useContext, useEffect, useState} from "react";
import {ICity} from "../types/City.ts";
import {getCityInfo} from "../API/getCityInfo.ts";
import {AuthContext} from "../contexts/AuthContext.ts";
import {editCityInfo} from "../API/editCityInfo.ts";

const EditPfas = () => {
    const [cityInfo, setCityInfo] = useState<ICity | null>(null);
    const [level, setLevel] = useState<string>("");
    const context = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (cityInfo) setLevel(cityInfo.pfasData);
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
    };



    return (
        <div>
            <h1>EditPfas</h1>
            {
                cityInfo && (
                    <div>
                        <p>City: {cityInfo.name}</p>
                        <div>Pfas Level:
                            {isEditing ? <input value={level} onChange={(e) => setLevel(e.target.value)} title="Pfas Level" placeholder="Enter Pfas Level"/> :
                                <span>{level}

                        </span>}
                            {isEditing ?
                                <button onClick={handleEdit}>Save</button>
                                :
                                <button onClick={() => setIsEditing(true)}>Edit</button>}


                        </div>


                    </div>
                )
            }
        </div>
    )
}

export default EditPfas
