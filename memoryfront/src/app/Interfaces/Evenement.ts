export type Event = Evenement[];

export interface Evenement {
  id: number;
  nom: string;
  date: string;
  heure: string;
  lieu: string;
  type_evenement: string;
  description: string;
  createur: Createur;
}

export interface Createur {
  id: number;
  name: string;
  email: string;
  photo: string;
  login: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  role_id: number;
  identifiant_bizzare: string;
  description?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  telephone?: string;
}

export interface EventRequest {
  nom: string;
  date: string;
  heure: string;
  lieu: string;
  type_evenement: string;
  description: string;
  user_id: number | undefined;
}
