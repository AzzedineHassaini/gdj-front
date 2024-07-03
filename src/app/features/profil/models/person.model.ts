import { Gender } from './gender.enum';
import { IAddress } from './address.models';
import { IPhone } from './phone.models';

export interface IPerson {
    id: number;
    nationalRegister: string;
    name: string;
    firstName: string;
    birthdate: Date;
    birthplace: String;
    gender: Gender;
    deathDate?: Date;
    picture?: string;
    imprint?: string;
    lawyer?: IPerson;
    address: IAddress[];
    phones: IPhone[];
}