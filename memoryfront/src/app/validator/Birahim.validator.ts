import { AbstractControl} from '@angular/forms';

export class BirahimValidator {
  static dateValide(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const dateChoisie = new Date(control.value);
    const dateActuelle = new Date();
    const dateMinimale = new Date();
    dateMinimale.setDate(dateActuelle.getDate());
    if (dateChoisie < dateMinimale) {
      return { dateInvalide: true };
    }
    return null;
  }
}
