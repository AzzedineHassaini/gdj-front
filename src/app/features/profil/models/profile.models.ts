export interface IPersonDetails {
    id: number;
    lastName: string;
    firstName: string;
    nationalRegister: string;
    birthDate: Date;
    birthPlace: String;
    gender: Gender;
    deathDate?: Date;
    picture?: string;
    imprint?: string;
    addresses: IAddress[];
    phones: IPhone[];
}

export interface IPersonList {
    id: number;
    lastName: string;
    firstName: string;
    nationalRegister: string;
}

export interface IPhone {
    id: number;
    number: String;
    label: String;
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export interface IAddress {
    id: number;
    street: String;
    number: String;
    city: String;
    postCode: String;
    country: String;
    label: String;
}