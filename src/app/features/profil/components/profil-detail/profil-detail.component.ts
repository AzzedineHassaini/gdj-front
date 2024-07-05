import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { IPersonDetails } from '../../models/person.models';
import { ProfileService } from '../../services/profile.service';
import { map, Observable, delay, first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDateTime } from '@js-joda/core';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrl: './profil-detail.component.scss'
})
export class ProfilDetailComponent implements OnInit {

  form: FormGroup;
  person$: Observable<IPersonDetails>

  genderOptions = [
    {value: 'MALE', label: 'profil.male'},
    {value: 'FEMALE', label: 'profil.female'},
    {value: 'OTHER', label: 'profil.other'}
  ]

  constructor(
    private readonly _route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    
    this.person$ = _route.data.pipe( map( resolveList => resolveList[0] ));

    this.form = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      nationalRegister: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthPlace: ['', Validators.required],
      gender: ['', Validators.required],
      adresses: this.fb.group([])
      /*deathDate: ['', Validators.required],
      picture: ['', Validators.required],
      imprint: ['', Validators.required],
      lawyer: ['', Validators.required],
      
      phones: ['', Validators.required]*/
    });
  }

  ngOnInit(): void {
   this.person$.subscribe((person) => {
    const test = typeof(person.birthDate)
    console.log("Test : " + person.address)
    this.form.setValue({
      lastName: person.lastName,
      firstName: person.firstName,
      nationalRegister: person.nationalRegister,
      birthDate: person.birthDate,
      birthPlace: person.birthPlace,
      gender: person.gender,

      /*deathDate: person.deathDate,
      picture: person.picture,
      imprint: person.imprint,
      lawyer: person.lawyer,
      
      phones: person.phones*/
    })
   })
    
  }

  onSubmit() {
    if (this.form.valid) {
      const profileData: IPersonDetails = this.form.value;
      this.profileService.updateProfile(profileData).subscribe({
        next: (response) => {
          console.log('Profil mis à jour avec succès', response);
        },
        error: (error) => {
          console.log('Erreur lors de la mise à jour du profil', error);
        }
      });
    } else {
      console.log('Formulaire invalide');
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) {
          console.log(`champ ${key} invalide :`, control.errors);
        }
      })
    }
  }

 
}





  /*private readonly $person = inject( ProfileService )


  persons: IPersonDetails = this.$person.getPersonById(1)
  

  constructor() {
    console.log("Personne : " + this.persons);
  }*/

    /*readonly genders = [
      {
        value: 'male',
        label: ''
      }
    ]

    person$: Observable<IPersonDetails>;

    constructor(
      private readonly _route: ActivatedRoute,
    ) {
      
      this.person$ = _route.data.pipe(
        map( resolveList => resolveList[0])
      )
    
    }*/





  /*selectedFiles: { [key: string]: File | null } = { profile: null, imprint: null };
  imgPreviews: { [key: string]: string | ArrayBuffer | null } = { profile: null, imprint: null };
  uploadedimgUrl: { [key: string]: string | null } = { profile: null, imprint: null };

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event, type: string): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFiles[type] = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
          this.imgPreviews[type] = reader.result;
      };

      const selectedFile = this.selectedFiles[type];
      if (selectedFile) {
        reader.readAsDataURL(selectedFile);
      }
    }
  }

  onSubmit(): void {
    for (const type in this.selectedFiles) {
      const selectedFile = this.selectedFiles[type];

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        this.http.post<{imageUrl: string}>('http://localhost:8080/upload', formData).subscribe(response => {
          this.uploadedimgUrl[type] = response.imageUrl;
        })
      }
    }
  }*/