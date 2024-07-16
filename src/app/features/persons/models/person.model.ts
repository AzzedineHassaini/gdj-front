export interface PagedPersons {
  content: Person[],
  pageSize: number,
  totalElements: number,
  totalPages: number
}

export interface Person {
  id: number,
  nationalRegister: string,
  name: string,
  firstname: string,
  birthDate: Date,
  birthPlace: string,
  gender: string
}

export interface PersonParams {
  birthDateLowerBound: Date | undefined;
  birthDateUpperBound: Date | undefined;
  name: string
  firstname: string
  nationalRegister: string
  birthPlace: string
  gender: string
}

