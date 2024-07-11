import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';
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
export class RegisterComponent implements OnInit {

  form: FormGroup;

  genderOptions: Gender[] = []

  role: string = 'citizen'

  constructor(
    builder: FormBuilder,
    private readonly _auth: AuthService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    this.form = builder.group(REGISTER_FORM)

    this.genderOptions = [
      {value: 'MALE', label: 'profile.male'},
      {value: 'FEMALE', label: 'profile.female'},
      {value: 'OTHER', label: 'profile.other'}
    ]


  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.role = params['role'];
    });
    console.log("registering : "+this.role)
  }

  onSubmit(){
    console.log("Registering as : "+this.role)
    let login: boolean = true
    if (this.role === 'admin' || this.role === 'agent') {
      login = false
    }
    this._auth.register( this.form.value, this.role, login ).subscribe({
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
