import {Validators} from "@angular/forms";

export interface ILoginForm {
  mail: string;
  password: string;
}

export const LOGIN_FORM = {
  'mail': [ '', [] ],
  'password': [ '', [] ]
}
