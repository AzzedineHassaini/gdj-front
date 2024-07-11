import { Component, OnInit } from '@angular/core';
import { IPersonDetails } from '../../models/profile.models';
import { ProfileService } from '../../services/profile.service';
import { map, Observable, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddress } from '../../models/profile.models';
import { IPhone } from '../../models/profile.models';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent implements OnInit {

  formPerson: FormGroup;
  person$: Observable<IPersonDetails>
  selectedFile: File | null = null;
  imageUrl: string | undefined;
  imageName: string | undefined;
  pictureFile: File | null = null;
  imprintFile: File | null = null;
  userRole: string | undefined;

  genderOptions = [
    {value: 'MALE', label: 'profile.male'},
    {value: 'FEMALE', label: 'profile.female'},
    {value: 'OTHER', label: 'profile.other'}
  ]

  constructor(
    private readonly _route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {

    this.person$ = _route.data.pipe( map( resolveList => resolveList[0] ));

    this.formPerson = this.fb.group({
      id: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      nationalRegister: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      addresses: this.fb.array([]),
      phones: this.fb.array([]),
      deathDate: [''],
      picture: ['', [Validators.required]],
      imprint: ['', [Validators.required]],
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
        deathDate: person.deathDate,
        picture: person.picture,
        imprint: person.imprint,
      });
      this.setAddresses(person.addresses);
      this.setPhones(person.phones);
   });

   this.userRole = this.authService.currentUser?.role;
   
  }



  get addresses(): FormArray {
    return this.formPerson.get('addresses') as FormArray;
  }

  setAddresses(addresses: IAddress[]): void {
    const addressFGs = addresses.map(address => this.fb.group({
      id: [address.id, [Validators.required]],
      street: [address.street, [Validators.required]],
      number: [address.number, [Validators.required]],
      city: [address.city, [Validators.required]],
      postCode: [address.postCode, [Validators.required]],
      country: [address.country, [Validators.required]],
      label: [address.label, [Validators.required]]
    }));

    

    const addressFormArray = this.fb.array(addressFGs);
    this.formPerson.setControl('addresses', addressFormArray);
  }

  get phones(): FormArray {
    return this.formPerson.get('phones') as FormArray;
  }

  setPhones(phones: IPhone[]): void {
    const phoneFGs = phones.map(phone => this.fb.group({
      number: [phone.number, [Validators.required]],
      label: [phone.label, [Validators.required]]
    }));

    const phoneFormArray = this.fb.array(phoneFGs);
    this.formPerson.setControl('phones', phoneFormArray);
  }

  onUploadPicture(event: any) {
    if (event.files.length > 0) {
      this.pictureFile  = event.files[0];
    }
  }

  onUploadImprint(event: any) {
    if (event.files.length > 0) {
      this.imprintFile  = event.files[0];
    }
  }

  onSubmit() {
    console.log(this.pictureFile?.name);
    console.log(this.imprintFile?.name);
    console.log(this.formPerson.value)
    if (this.formPerson.valid) {
      const personData: IPersonDetails = this.formPerson.value;
      personData.picture = this.pictureFile?.name;
      personData.imprint = this.imprintFile?.name;
      console.log("PERSONDATA : ", personData);

      if (this.pictureFile) {
        this.profileService.uploadFile(this.pictureFile).subscribe(
          () => {
            console.log('Fichier picture uploadé avec succès');
          },
          (error) => {
            console.error('Erreur lors de l\'upload du fichier picture', error);
          }
        );
      } else {
        console.log('Aucun fichier picture sélectionné');
      }

      if (this.imprintFile) {
        this.profileService.uploadFile(this.imprintFile).subscribe(
          () => {
            console.log('Fichier imprint uploadé avec succès');
          },
          (error) => {
            console.error('Erreur lors de l\'upload du fichier imprint', error);
          }
        );
      } else {
        console.log('Aucun fichier imprint sélectionné');
      }

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
