export interface ICityFromFirestore {
    lastUpdate: string;
    name: string;
    pfasLevel: string;
}


export interface ICity extends ICityFromFirestore {
    uid: string;
}
