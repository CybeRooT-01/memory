export interface Discussion {
  id: number;
  receiver: Receiver;
  message: string;
  created_at: string;
  chatter: Chatter;
}

export interface Receiver {
  id: number;
  nom: string;
  email: string;
  photo: any;
  login: string;
  description: string;
  id_bizzare: string;
  role: string;
  facebook: any;
  twitter: any;
  instagram: any;
  telephone: any;
}

export interface Chatter {
  id: number;
  nom: string;
  email: string;
  photo: any;
  login: string;
  description: string;
  id_bizzare: string;
  role: string;
  facebook: any;
  twitter: any;
  instagram: any;
  telephone: any;
}
