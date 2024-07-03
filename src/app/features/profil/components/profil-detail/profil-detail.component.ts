import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrl: './profil-detail.component.scss'
})
export class ProfilDetailComponent {
  selectedFileImg: File | null = null;
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
}
