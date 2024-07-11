import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";
import {REGISTER_FORM} from "../../form/register.form";

interface Gender{
  value: string,
  label: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;

  genderOptions: Gender[] = []

  constructor(
    builder: FormBuilder,
    private readonly _auth: AuthService,
    private readonly _router: Router
  ) {
    this.form = builder.group(REGISTER_FORM)

    this.genderOptions = [
      {value: 'MALE', label: 'profile.male'},
      {value: 'FEMALE', label: 'profile.female'},
      {value: 'OTHER', label: 'profile.other'}
    ]

  }

  onSubmit(){
    this._auth.register( this.form.value ).subscribe({
      next: () => {
        console.log(this._auth.currentUser)
        this._router.navigate(['home']);
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {

      }
    })

  }

}
