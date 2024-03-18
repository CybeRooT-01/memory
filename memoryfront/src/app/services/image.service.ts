import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private toastr: ToastrService) {}
  AuthorizedExtensions: string[] = ['jpg', 'jpeg', 'png'];
  extension: string = '';
  TailleMax: number = 1000000;
  uploadImageAndGetBase64(file: any): Promise<string> {
    this.extension = file.name.split('.')[1];
    if (file.name.split('.').length > 2) {
      this.toastr.error('Nom de fichier non valide');
      return Promise.reject('Nom de fichier non valide');
    }
    if (!this.AuthorizedExtensions.includes(this.extension)) {
      this.toastr.error('Extension de fichier non autorisée');
      return Promise.reject('Extension de fichier non autorisée');
    }
    if (file.size > this.TailleMax) {
      this.toastr.error('Fichier trop volumineux');
      return Promise.reject('Fichier trop volumineux');
    }
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result as string;
        resolve(imageBase64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
}
