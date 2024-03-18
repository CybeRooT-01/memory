import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Prestataire } from 'src/app/Interfaces/Prestataire';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { PrestataireService } from 'src/app/services/prestataire.service';

@Component({
  selector: 'app-profil-prestataire',
  templateUrl: './profil-prestataire.component.html',
  styleUrls: ['./profil-prestataire.component.css'],
})
export class ProfilPrestataireComponent implements OnInit {
  formulaire: FormGroup;
  @ViewChild('fileInputField') fileInputField!: ElementRef;
  @ViewChild('fileInputField2') fileInputField2!: ElementRef;
  @ViewChild('fileInputField3') fileInputField3!: ElementRef;
  selectedFile1: File | undefined;
  selectedFile2: File | undefined;
  selectedFile3: File | undefined;
  imageUrl1: string | ArrayBuffer | null = '';
  imageUrl2: string | ArrayBuffer | null = '';
  imageUrl3: string | ArrayBuffer | null = '';
  IdUser: number | undefined;

  prestatire: Prestataire[] = [];
  loggedPrestataire: Prestataire | undefined;
  loggeduserImg1: any;
  constructor(
    private imageservice: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authservice: AuthService,
    private prestataireService: PrestataireService
  ) {
    this.formulaire = this.fb.group({
      nom: [this.loggedPrestataire?.nom, Validators.required],
      service: ['', Validators.required],
      tarifs: ['', Validators.required],
      photo1: [''],
      photo2: [''],
      photo3: [''],
    });
  }
  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe((user) => {
      this.IdUser = user.data?.id;
    });
    this.prestataireService.All().subscribe((response) => {
      this.prestatire = response.data;
      this.prestatire.forEach((element) => {
        if (element.user?.id == this.IdUser) {
          this.loggedPrestataire = element;
        }
      });
      console.log(this.loggedPrestataire);
    });
  }

  simulateFileInput(e: Event) {
    if (this.fileInputField && this.fileInputField.nativeElement) {
      const fileInput = this.fileInputField.nativeElement as HTMLInputElement;
      fileInput.click();
    }
  }
  simulateFileInput2(e: Event) {
    if (this.fileInputField2 && this.fileInputField2.nativeElement) {
      const fileInput = this.fileInputField2.nativeElement as HTMLInputElement;
      fileInput.click();
    }
  }
  simulateFileInput3(e: Event) {
    if (this.fileInputField3 && this.fileInputField3.nativeElement) {
      const fileInput = this.fileInputField3.nativeElement as HTMLInputElement;
      fileInput.click();
    }
  }
  onFileSelected1(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageservice.uploadImageAndGetBase64(file).then(
        (base64) => {
          this.imageUrl1 = base64;
          // console.log(base64);
          this.selectedFile1 = file;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  onFileSelected2(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageservice.uploadImageAndGetBase64(file).then(
        (base64) => {
          this.imageUrl2 = base64;
          // console.log(base64);
          this.selectedFile2 = file;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  onFileSelected3(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageservice.uploadImageAndGetBase64(file).then(
        (base64) => {
          this.imageUrl3 = base64;
          // console.log(base64);
          this.selectedFile3 = file;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  tarifConainslettre(tarif: any): boolean {
    let regex = /[a-zA-Z]/;
    return regex.test(tarif);
  }

  enregistrer() {
    if (this.tarifConainslettre(this.formulaire.value.tarifs)) {
      this.toastr.error('Veuillez saisir un tarif valide');
      return;
    }

    let data: Prestataire = {
      nom: this.formulaire.value.nom || this.loggedPrestataire?.nom || '',
      services: this.formulaire.value.service || this.loggedPrestataire?.services || '',
      tarif: this.formulaire.value.tarifs || this.loggedPrestataire?.tarif || '',
      photo1: this.imageUrl1 || this.loggedPrestataire?.photo1 || '',
      photo2: this.imageUrl2 || this.loggedPrestataire?.photo2 || '',
      photo3: this.imageUrl3 || this.loggedPrestataire?.photo3 || '',
      user_id: this.IdUser,
    };
  
    console.log(data);
    this.prestataireService.create(data).subscribe(
      (response: any) => {
        console.log(response.message);
        this.toastr.success(response.message);
      },
      (error: any) => {
        this.toastr.error(error.message);
      }
    );
  }
}
