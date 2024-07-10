import { IPersonList } from "../../profil/models/profile.models";

export interface IComplaintDetail {
  fileNumber: string;
  status: string;
  date: Date;
  complainant: IPersonList;
  agent: IPersonList;
  personConcerned: IPersonList[];
}

export interface IComplaintList {
  fileNumber: string;
  status: string;
  date: Date;
  complainant: IPersonList;
  agent: IPersonList;
}
