export interface ICityFromFirestore {
    lastUpdate: string;
    name: string;
    pfasData: string;
    lat: number;
    lng: number;
}
export interface ICity extends ICityFromFirestore {
    uid: string;
}
