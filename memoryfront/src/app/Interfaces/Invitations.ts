export interface Invitation {
    data: Invitation[]
  }
  
  export interface Invitation {
    id: number
    inviteur: Inviteur
    invite: Invite
    evenement: Evenement
  }
  
  export interface Inviteur {
    id: number
    name: string
    email: string
    photo: any
    login: string
    deleted_at: any
    created_at: string
    updated_at: string
    role_id: number
    identifiant_bizzare: string
    description: string
    facebook: any
    twitter: any
    instagram: any
    telephone: any
  }
  
  export interface Invite {
    id: number
    name: string
    email: string
    photo: any
    login: string
    deleted_at: any
    created_at: string
    updated_at: string
    role_id: number
    identifiant_bizzare: string
    description: any
    facebook: any
    twitter: any
    instagram: any
    telephone: any
  }
  
  export interface Evenement {
    id: number
    nom: string
    date: string
    heure: string
    lieu: string
    type_evenement: string
    description: string
    user_id: number
    deleted_at: any
    created_at: string
    updated_at: string
  }
  