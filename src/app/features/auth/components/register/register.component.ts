import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";
import {REGISTER_FORM} from "../../form/register.form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;

  constructor(
    builder: FormBuilder,
    private readonly _auth: AuthService,
    private readonly _router: Router
  ) {
    this.form = builder.group(REGISTER_FORM)
  }

  onSubmit(){
    this._auth.register( this.form.value ).subscribe({
      next: (auth) => {
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
