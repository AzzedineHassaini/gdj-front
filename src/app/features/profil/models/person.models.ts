import { Gender } from './gender.enum';
import { IAddress } from './address.models';
import { IPhone } from './phone.models';

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
    lawyer?: IPersonDetails;
    addresses: IAddress[];
    phones: IPhone[];
}

export interface IPersonList {
    id: number;
    lastName: string;
    firstName: string;
    nationalRegister: string;
}