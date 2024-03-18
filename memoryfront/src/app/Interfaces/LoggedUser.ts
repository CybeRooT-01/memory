export interface LoggedUser{
  [x: string]: any;
  data?: Data
}

export interface Data {
  id?: number;
  nom: string;
  login: string;
  role?: string;
  email: string;
  photo: string;
  identifiant_bizzare?: string;
  description?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  telephone?: string;
}
