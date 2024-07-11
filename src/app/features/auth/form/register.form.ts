
export interface IRegisterForm {
  mail: string,
  password: string,
  nationalRegisterNumber: string,
  firstName: string,
  lastName: string,
  birthDate: Date,
  birthPlace: string,
  gender: string,
  picture: string
}

export const REGISTER_FORM = {
  'mail': [ '', [] ],
  'password': [ '', [] ],
  'nationalRegisterNumber': [ '', [] ],
  'firstName': [ '', [] ],
  'lastName': ['', [] ],
  'birthDate': [ '', [] ],
  'birthPlace': [ '', [] ],
  'gender': [ '', [] ],
  'picture': [ '', [] ],
}
