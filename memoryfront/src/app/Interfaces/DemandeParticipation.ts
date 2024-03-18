export interface DemandeParticipation {
  id: number;
  reservation: {
    id: number;
    prestataire: {
      id: number;
      user_id: number;
      nom: string;
      services: string;
      tarif: string;
      photo1: string;
      photo2: string;
      photo3: string;
      avis: string;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    evenement: {
      id: number;
      nom: string;
      date: string;
      heure: string;
      lieu: string;
      type_evenement: string;
      description: string;
      user_id: number;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
  };
  etat: string;
  commentaire: string;
}
export interface DemandeParticipationRequest {
  evenement_id: number;
  prestataire_id: number | undefined;
  commentaire: string;
}
