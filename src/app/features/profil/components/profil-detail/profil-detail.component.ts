import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrl: './profil-detail.component.scss'
})
export class ProfilDetailComponent {

  selectedFiles: { [key: string]: File | null } = { profile: null, imprint: null };
  imgPreview: { [key: string]: string | ArrayBuffer | null } = { profile: null, imprint: null };
  uploadedimgUrl: { [key: string]: File | null } = { profile: null, imprint: null };

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event, type: string): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFiles[type] = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
          this.imgPreview[type] = reader.result;
        };


      }
    }
  }

  /*
  selectedProfileFile: File | null = null;
  profileImgPreview: string | ArrayBuffer | null = null;
  uploadedProfileImgUrl: string | null = null;

  selectedImprintFile: File | null = null;
  imprintImgPreview: string | ArrayBuffer | null = null;
  uploadedImprintImgUrl: string | null = null;

  



  onProfileImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedProfileFile = fileInput.files[0];
 
      // Prévisualiser l'image de profil
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImgPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedProfileFile);
    }
  }
 
  onImprintImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImprintFile = fileInput.files[0];
 
      // Prévisualiser l'image d'empreinte
      const reader = new FileReader();
      reader.onload = () => {
        this.imprintImgPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImprintFile);
    }
  }

*/


  /*selectedFileImg: File | null = null;
  selectedFileImprint: File | null = null;
  imgPreview: string | ArrayBuffer | null = null;
  imprintPreview: string | ArrayBuffer | null = null;
  imageUrl: string | null = null;

  constructor(private http: HttpClient){}

  onFileSelectedProfil(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileImg = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFileImg);
    }
  }

  onFileSelectedImprint(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileImprint = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imprintPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFileImprint);
    }
  }

  /*onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<{imageUrl: string}>('http://localhost:8080/upload', formData).subscribe(response => {
        this.imageUrl = response.imageUrl;
      })
    }
  }*/
