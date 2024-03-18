import { BooleanInput } from '@angular/cdk/coercion';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoggedUser } from 'src/app/Interfaces/LoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { EvenementService } from 'src/app/services/evenement.service';
import { BirahimValidator } from 'src/app/validator/Birahim.validator';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateEventComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  readonlyDate: BooleanInput = true;
  isLinear = false;
  user_id: number | undefined;
  constructor(
    private _formBuilder: FormBuilder,
    private authservice: AuthService,
    private evenementservice: EvenementService,
    private toastr: ToastrService
  ) {
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      date: ['', [Validators.required, BirahimValidator.dateValide]],
    });

    this.secondFormGroup = this._formBuilder.group({
      heure: ['', Validators.required],
      lieu: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      type_evenement: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authservice.getCurrentUser().subscribe((user: LoggedUser) => {
      this.user_id = user.data?.id;
    });
  }

  ajouterEvent() {
    let data: any = {
      nom: this.firstFormGroup.value.nom,
      date: this.firstFormGroup.value.date.toISOString().slice(0, 10),
      heure: this.secondFormGroup.value.heure,
      lieu: this.secondFormGroup.value.lieu,
      type_evenement: this.thirdFormGroup.value.type_evenement,
      description: this.thirdFormGroup.value.description,
      user_id: this.user_id,
    };
    this.evenementservice.create(data).subscribe((response: any) => {
      if (response.status === 201) {
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.thirdFormGroup.reset();
        this.toastr.success("Evénement créé avec succès");
      } else {
        this.toastr.error("Erreur lors de la création de l'événement");
      }
    });
  }
}
