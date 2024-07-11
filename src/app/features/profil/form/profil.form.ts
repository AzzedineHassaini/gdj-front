import { Gender } from '../models/gender.enum';
import { IAddress } from '../models/address.models';
import { IPhone } from '../models/phone.models';
import { IPersonDetails } from '../models/person.models';
import {Validators} from "@angular/forms";

export interface IProfilForm {
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