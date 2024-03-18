import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit, OnInit {
  isLoading: boolean = true;
  login: string = '';
  password: string = '';
  formulaire: FormGroup;
  container: HTMLElement | null = null;
  loading: boolean = false;
  loading2: boolean = false;
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private elementRef: ElementRef,
    private fb: FormBuilder
  ) {
    this.formulaire = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      login: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.authService.verifyToken().subscribe(
      (response: any) => {
        console.log(response);
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  creercompte() {
    if (this.formulaire.value.password.length < 8) {
      this.toastr.error('Le mot de passe doit contenir au moins 8 caractères');

      return;
    }
    if (this.formulaire.controls['email'].invalid) {
      this.toastr.error('Veuillez saisir un email valide');

      return;
    }
    if (
      this.formulaire.value.nom == '' ||
      this.formulaire.value.email == '' ||
      this.formulaire.value.password == '' ||
      this.formulaire.value.login == '' ||
      this.formulaire.value.role == ''
    ) {
      this.toastr.error('Veuillez remplir tous les champs');

      return;
    }
    let data: any = {
      nom: this.purificateur(this.formulaire.value.nom),
      email: this.purificateur(this.formulaire.value.email),
      password: this.purificateur(this.formulaire.value.password),
      login: this.purificateur(this.formulaire.value.login),
      role_id: parseInt(this.purificateur(this.formulaire.value.role)),
    };
    this.loading2 = true;
    this.authService.register(data).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Compte créé avec succès');
        this.formulaire.reset();
      },
      (error: any) => {
        this.toastr.error('Erreur lors de la création du compte');
      }
    );
    setTimeout(() => {
      this.loading2 = false;
    }, 2000);
  }

  purificateur(texte: string): string {
    return texte.replace(/[<>]/g, '');
  }

  ngAfterViewInit(): void {
    this.container = this.elementRef.nativeElement.querySelector(
      '.container'
    ) as HTMLElement;
    console.log(this.container);
    
    if (this.container) {
      // console.log(this.container);
    }
  }
  loginUser() {
    this.loading = true;
    console.log(this.login, this.password);
    this.authService.login(this.login, this.password).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        this.toastr.error('Login ou mot de passe incorrect');
      }
    );
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  toggleSignUp() {
    console.log(this.container);
    this.container?.classList.add('sign-up-mode');
  }

  toggleSigngIn() {
    this.container?.classList.remove('sign-up-mode');
  }
}
