import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';
import {IRegisterForm, REGISTER_FORM} from "../../form/register.form";

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
  pictureFile: File | null = null;
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

  onUploadPicture(event: any) {
    if (event.files.length > 0) {
      this.pictureFile  = event.files[0];
    }
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
    const registerForm: IRegisterForm = this.form.value;
    if (this.role === 'admin' || this.role === 'agent') {
      login = false
    }

    if (this.pictureFile) {
      this._auth.uploadFile(this.pictureFile).subscribe(
        () => {
          
          console.log('Fichier picture uploadé avec succès');
        },
        (error) => {
          console.error('Erreur lors de l\'upload du fichier picture', error);
        }
      );
    }

    registerForm.picture = this.pictureFile?.name;
    this._auth.register( registerForm, this.role, login ).subscribe({
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
