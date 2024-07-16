import { Person } from "../../persons/models/person.model"

export interface PagedComplaints {
  content: Complaint[],
  pageSize: number,
  totalElements: number,
  totalPages: number
}

export interface Complaint {
  id: number,
  fileNumber: string,
  date: Date,
  complainant: Person,
  agent: Person,
  personConcerned: Person[]
}

export interface ComplaintDetail {
  id: number,
  fileNumber: string,
  status: string,
  date: Date,
  complainant: Person,
  agent: Person,
  personConcerned: Person[],
}

export interface ComplaintParams {
  fileNumber: string;
  dateLowerBound: Date | undefined;
  dateUpperBound: Date | undefined;
  type: Type,
  status: Status
}

export enum Type {
  DISMISSED = "DISMISSED",
  INFRINGEMENT = "INFRINGEMENT",
  OFFENSE = "OFFENSE",
  CRIME = "CRIME"
}

export enum Status {
  REGISTERED = "REGISTERED",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED"
}
