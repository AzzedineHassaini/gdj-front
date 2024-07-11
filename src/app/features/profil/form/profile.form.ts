import { Gender } from '../models/gender.enum';
import { IAddress } from '../models/address.models';
import { IPhone } from '../models/phone.models';
import { IPersonDetails } from '../models/profile.models';

export interface IProfileForm {
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
    address: IAddress;
    phones: IPhone;
}