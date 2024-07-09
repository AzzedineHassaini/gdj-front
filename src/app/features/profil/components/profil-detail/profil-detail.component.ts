import { Component, OnInit, inject, signal } from '@angular/core';
import { IPersonDetails } from '../../models/person.models';
import { ProfileService } from '../../services/profile.service';
import { map, Observable, delay, first, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddress } from '../../models/address.models';
import { IPhone } from '../../models/phone.models';



@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrl: './profil-detail.component.scss'
})
export class ProfilDetailComponent implements OnInit {

  formPerson: FormGroup;
  person$: Observable<IPersonDetails>

  genderOptions = [
    {value: 'MALE', label: 'profile.male'},
    {value: 'FEMALE', label: 'profile.female'},
    {value: 'OTHER', label: 'profile.other'}
  ]

  constructor(
    private readonly _route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {

    this.person$ = _route.data.pipe( map( resolveList => resolveList[0] ));

    this.formPerson = this.fb.group({
      id: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      nationalRegister: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthPlace: ['', Validators.required],
      gender: ['', Validators.required],
      addresses: this.fb.array([]),
      /*deathDate: ['', Validators.required],
      picture: ['', Validators.required],
      imprint: ['', Validators.required],
      lawyer: ['', Validators.required],

      phones: ['', Validators.required]*/
    });
  }

  ngOnInit(): void {
   this.person$.subscribe((person) => {
    this.formPerson.patchValue({
      id: person.id,
      lastName: person.lastName,
      firstName: person.firstName,
      nationalRegister: person.nationalRegister,
      birthDate: person.birthDate,
      birthPlace: person.birthPlace,
      gender: person.gender,

      /*deathDate: person.deathDate,
      picture: person.picture,
      imprint: person.imprint,
      lawyer: person.lawyer*/
    });
    this.setAddresses(person.addresses);
    this.setPhones(person.phones);


   });

  }

  get addresses(): FormArray {
    return this.formPerson.get('addresses') as FormArray;
  }

  setAddresses(addresses: IAddress[]): void {
    const addressFGs = addresses.map(address => this.fb.group({
      id: [address.id, Validators.required],
      street: [address.street, Validators.required],
      number: [address.number, Validators.required],
      city: [address.city, Validators.required],
      postCode: [address.postCode, Validators.required],
      country: [address.country, Validators.required],
      label: [address.label, Validators.required]
    }));

    const addressFormArray = this.fb.array(addressFGs);
    this.formPerson.setControl('addresses', addressFormArray);
  }

  get phones(): FormArray {
    return this.formPerson.get('phones') as FormArray;
  }

  setPhones(phones: IPhone[]): void {
    const phoneFGs = phones.map(phone => this.fb.group({
      number: [phone.number, Validators.required],
      label: [phone.label, Validators.required]
    }));

    const phoneFormArray = this.fb.array(phoneFGs);
    this.formPerson.setControl('phones', phoneFormArray);
  }



  onSubmit() {
    if (this.formPerson.valid) {
      const personData: IPersonDetails = this.formPerson.value;
      // console.log("PERSONDATA : ", personData);
      this.profileService.updateProfile(personData).subscribe({
        next: (response) => {
          console.log('Profil mis à jour avec succès', response);

          const addressData: IAddress[] = personData.addresses;
          const updateAddressRequest = addressData.map(address => this.profileService.updateAddress(address));

          forkJoin(updateAddressRequest).subscribe({
            next: (response) => {
              console.log("Toutes les adresses ont été mises à jour avec succès", response);
            },
            error: (error) => {
              console.log("Erreur lors de la mise à jour des adresses", error);
            }
          });
        },
        error: (error) => {
          console.log('Erreur lors de la mise à jour du profil', error);
        }
      });
    } else {
      console.log('Formulaire invalide');
      Object.keys(this.formPerson.controls).forEach(key => {
        const control = this.formPerson.get(key);
        if (control?.invalid) {
          console.log(`champ ${key} invalide :`, control.errors);
        }
      })
    }
  }


}








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
