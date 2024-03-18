export interface Prestataire {
  id?: number;
  nom: string;
  services: string;
  tarif: string | number; 
  avis?: string;
  photo1: string |ArrayBuffer | null;
  photo2: string |ArrayBuffer | null;
  photo3: string | ArrayBuffer | null;
  user_id: number | undefined;
  user?: {
    id: number;
    name: string;
    email: string;
    photo: null | string;
    login: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
    role_id: number;
    identifiant_bizzare: string;
    description: string;
    facebook: null | string;
    twitter: null | string;
    instagram: null | string;
    telephone: null | string;
  };
}
