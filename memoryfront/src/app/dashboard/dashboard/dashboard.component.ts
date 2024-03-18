import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedUser, Data } from '../../Interfaces/LoggedUser';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { UrlSegment } from '@angular/router';
import { Chart } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  validateTelephone($event: Event) {
    let val = ($event.target as HTMLInputElement).value;
    const cleanedValue = val.replace(/[a-zA-Z]/g, '');
    ($event.target as HTMLInputElement).value = cleanedValue;
  }
  purificateur(texte: string): string {
    return texte.replace(/[<>]/g, '');
  }
  initialFormValues: any;
  showModal: boolean = false;
  settings: boolean = true;
  userLogged: LoggedUser = {};
  formulaire: FormGroup = this.fb.group({
    nom: [''],
    email: [''],
    login: [''],
    telephone: [''],
    facebook: [''],
    twitter: [''],
    linkedin: [''],
    instagram: [''],
    description: [''],
  });
  isModified: boolean = false;
  dataform: any;
  constructor(
    private authService: AuthService,
    private imageService: ImageService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    // console.log(this.userLogged);
  }

  updateUser() {
    const nomInput = document.getElementById('first_name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const loginInput = document.getElementById('login') as HTMLInputElement;
    const tel = document.getElementById('tel') as HTMLInputElement;
    const facebook = document.getElementById('facebook') as HTMLInputElement;
    const twitter = document.getElementById('twitter') as HTMLInputElement;
    const insta = document.getElementById('instagram') as HTMLInputElement;
    if (this.formulaire.value.nom === '') {
      console.log('hello update');

      this.formulaire.value.nom = nomInput.value;
    }
    if (this.formulaire.value.email === '') {
      this.formulaire.value.email = emailInput.value;
    }
    if (this.formulaire.value.login === '') {
      this.formulaire.value.login = loginInput.value;
    }
    if (this.formulaire.value.telephone === '') {
      this.formulaire.value.telephone = tel.value;
    }
    if (this.formulaire.value.facebook === '') {
      this.formulaire.value.facebook = facebook.value;
    }
    if (this.formulaire.value.twitter === '') {
      this.formulaire.value.twitter = twitter.value;
    }
    if (this.formulaire.value.instagram === '') {
      this.formulaire.value.instagram = insta.value;
    }

let data: Data = {
  id: this.userLogged.data?.id,
  nom: this.formulaire.value.nom
    ? this.purificateur(this.formulaire.value.nom)
    : '',
  email: this.formulaire.value.email
    ? this.purificateur(this.formulaire.value.email)
    : '',
  login: this.formulaire.value.login
    ? this.purificateur(this.formulaire.value.login)
    : '',
  telephone: this.formulaire.value.telephone
    ? this.purificateur(this.formulaire.value.telephone)
    : '',
  facebook: this.formulaire.value.facebook
    ? this.purificateur(this.formulaire.value.facebook)
    : '',
  twitter: this.formulaire.value.twitter
    ? this.purificateur(this.formulaire.value.twitter)
    : '',
  instagram: this.formulaire.value.instagram
    ? this.purificateur(this.formulaire.value.instagram)
    : '',
  description: this.formulaire.value.description
    ? this.purificateur(this.formulaire.value.description)
    : '',
  photo: this.image,
};


    console.log(data);
    this.authService.update(data).subscribe((response: any) => {
      this.isModified = false;
      this.showModal = false;
      // this.toastr.success('Votre profil a bien été modifié');
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.imageService.uploadImageAndGetBase64(file).then((base64: string) => {
      this.image = base64;
      this.formulaire.value.photo = this.image;
    });
  }

  togglemenu() {
    document.querySelector('.sidebar')?.classList.toggle('close');
  }
  showSetting() {
    this.settings = !this.settings;
  }
  ouvrirModal(): void {
    this.showModal = true;
  }
  fermerModal() {
    this.showModal = false;
  }
  activeItem: string = window.location.toString().split('/')[3];
  setActive(item: string): void {
    this.activeItem = item;
  }

  isActive(item: string): boolean {
    return this.activeItem === item;
  }
  isDarkTheme = true;
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
  deconnecter() {
    this.authService.logout();
  }
  image: any;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((response: LoggedUser) => {
      // console.log(response.data);
      this.userLogged = response;
      this.sharedService.setUserData(response);
      // console.log(this.userLogged);
      this.image = this.userLogged.data?.photo;
      this.dataform = this.userLogged.data;

      this.formulaire = this.fb.group({
        nom: [this.userLogged.data?.nom],
        email: [this.userLogged.data?.email],
        login: [this.userLogged.data?.login],
        telephone: [this.userLogged.data?.telephone],
        facebook: [this.userLogged.data?.facebook],
        twitter: [this.userLogged.data?.twitter],
        instagram: [this.userLogged.data?.instagram],
        description: [this.userLogged.data?.description],
      });
      const initialData: any = { ...this.userLogged.data };
      this.initialFormValues = { ...this.userLogged.data };

      const nomInput = document.getElementById(
        'first_name'
      ) as HTMLInputElement;
      const emailInput = document.getElementById('email') as HTMLInputElement;
      const loginInput = document.getElementById('login') as HTMLInputElement;
      const photoInput = document.getElementById('avatar') as HTMLInputElement;
      const tel = document.getElementById('telephone') as HTMLInputElement;
      const facebook = document.getElementById('facebook') as HTMLInputElement;
      const twitter = document.getElementById('twitter') as HTMLInputElement;
      const insta = document.getElementById('instagram') as HTMLInputElement;
      const description = document.getElementById(
        'description'
      ) as HTMLInputElement;

      nomInput?.addEventListener('input', () => {
        console.log('hello oninit');

        if (nomInput.value !== initialData.nom && nomInput.value !== '') {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });

      emailInput.addEventListener('input', () => {
        if (emailInput.value !== initialData.email && emailInput.value !== '') {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });

      loginInput.addEventListener('input', () => {
        if (loginInput.value !== initialData.login && loginInput.value !== '') {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      photoInput.addEventListener('input', () => {
        if (photoInput.value !== initialData.photo) {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      tel.addEventListener('input', () => {
        if (tel.value !== initialData.telephone && tel.value !== '') {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      facebook.addEventListener('input', () => {
        if (facebook.value !== initialData.facebook && facebook.value !== '') {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      twitter.addEventListener('input', () => {
        if ((twitter.value !== initialData.twitter, twitter.value !== '')) {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      insta.addEventListener('input', () => {
        if ((insta.value !== initialData.instagram, insta.value !== '')) {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      description.addEventListener('input', () => {
        if (
          (description.value !== initialData.description,
          description.value !== '')
        ) {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
    });
  }
}
