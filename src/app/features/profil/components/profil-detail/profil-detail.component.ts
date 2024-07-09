import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { IPersonDetails } from '../../models/person.model';
import { ProfileService } from '../../services/profile.service';
import { map, Observable, delay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrl: './profil-detail.component.scss'
})
export class ProfilDetailComponent {
  private readonly $person = inject( ProfileService )

  persons = this.$person.getPersonById(1)


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