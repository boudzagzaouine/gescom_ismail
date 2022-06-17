
export type Num = {
  id: number;
};
export interface ClientJson {
  content: Client[];
}
export interface Client {
  id: string;
  design: string;
  contact: string;
  image: string;
  email: string;
  tel: string;
  device: string;
  adrLiv: string;
  incoterm: string;
  paymentChoice: string;
  adrFact: string;
  bank: string;
  rib: string;
  swift: string;
  adressLivs: AdressLiv[];
}
export const c0: Client = {
  id: "",
  design: "",
  contact: "",
  image: "",
  email: "",
  tel: "",
  device: "",
  adrLiv: "",
  incoterm: "",
  paymentChoice: "",
  adrFact: "",
  bank: "",
  rib: "",
  swift: "",
  adressLivs: [],
};
export interface CommandeJson {
  content: Commande[];
}
export interface Commande {
  id: string;
  date: Date;
  season: string;
  amount: string;
  idClient: string;
  adrLiv: string;
}
export const cm0: Commande = {
  id: "",
  date: new Date(),
  amount: "",
  season: "",
  idClient: "",
  adrLiv: "",
};

export interface AdressLivJson {
  content: AdressLiv[];
}
export interface AdressLiv {
  id: string;
  adress: string;
  country: string;
  city: string;
  idClient: string;
}
export const adr0: AdressLiv = {
  id: "",
  adress: "",
  country: "",
  city: "",
  idClient: "",
};
export interface ArticleCommandeJson {
  content: ArticleCommande[];
}
export interface ArticleCommande {
  id: string;
  design: string;
  qte: number;
  portion: string;
  pu: number;
  idCommande: string;
}
export const arc0: ArticleCommande = {
  id: "",
  design: "",
  //@ts-ignore
  qte: "",
  portion: "",
  //@ts-ignore
  pu: "",
  idCommande: "",
};
export interface ArticleJson {
  content: Article[];
}

export interface Article {
  id: string;
  design: string;
  nomenclature: string;
  tauxPertes: number;
}

export const article0: Article = {
  id: "",
  design: "",
  nomenclature: "",
  tauxPertes: 0,
};

export interface UnitMeasureJson {
  content: UnitMeasure[];
}

export interface UnitMeasure {
  id: string;
  design: string;
  symbole: string;
  decimal: number;
}

export const unitMeasure0: UnitMeasure = {
  id: "",
  design: "",
  symbole: "",
  decimal: 0,
};

export interface BureauDouaneJson {
  content: BureauDouane[];
}

export interface BureauDouane {
  id: string;
  code: string;
  design: string;
}

export const bureauDouane0: BureauDouane = {
  id: "",
  code: "",
  design: "",
};

export interface DeclarantJson {
  content: Declarant[];
}

export interface Declarant {
  id: string;
  design: string;
  ville: string;
}

export const declarant0: Declarant = {
  id: "",
  design: "",
  ville: "",
};

export interface IncotermJson {
  content: Incoterm[];
}

export interface Incoterm {
  id: string;
  code: string;
  design: string;
}

export const incoterm0: Incoterm = {
  id: "",
  code: "",
  design: "",
};

export interface PayementModeJson {
  content: PayementMode[];
}

export interface PayementMode {
  id: string;
  code: string;
  design: string;
}

export const payementMode0: PayementMode = {
  id: "",
  code: "",
  design: "",
};

export interface RegimeDouanierJson {
  content: RegimeDouanier[];
}

export interface RegimeDouanier {
  id: string;
  code: string;
  design: string;
}

export const regimeDouanier0: RegimeDouanier = {
  id: "",
  code: "",
  design: "",
};

export interface RawMaterialJson {
  content: RawMaterial[];
}

export interface RawMaterial {
  id: string;
  design: string;
  nomenclature: string;
  family: string;
  tauxPertes: number;
  measureUnit: string;
}

export const rawMaterial0: RawMaterial = {
  id: "",
  design: "",
  nomenclature: "",
  family: "",
  tauxPertes: 0,
  measureUnit: "",
};

export interface DumJson {
  content: Dum[];
}

export interface Dum {
  id: string;
  numDum: number;
  date: Date;
  valeur: number;
  fournisseur: string;
  bureauDouane: string;
  declarant: string;
  regime: string;
}

export const dum0: Dum = {
  id: "",
  numDum: 0,
  date: new Date(),
  valeur: 0.0,
  fournisseur: "",
  bureauDouane: "",
  declarant: "",
  regime: "",
};

export interface DechargeJson {
  content: Decharge[];
}

export interface Decharge {
  id: string;
  numDum: number;
  date: Date;
  valeur: number;
  client: string;
  transporteur: string;
  declarant: string;
}

export const decharge0: Decharge = {
  id: "",
  numDum: 0,
  date: new Date(),
  valeur: 0.0,
  client: "",
  transporteur: "",
  declarant: "",
};

//************************************************************ */
//************************************************************ */
//**********************reference 2*************************** */
export interface Transporteur {
  id: string;
  designation: string;
}
export const transporteur0: Transporteur = {
  id: "",
  designation: ""
}
export interface Document {
  id: string;
  designation: string;
}
export const document0: Document = {
  id: "",
  designation: ""
}
export interface Devise {
  id: string;
  code_iso: string;
  symbole: string;
  designation: string;
}
export const devise0: Devise = {
  id: "",
  code_iso: "",
  symbole: "",
  designation: "",
}
export interface Pays {
  id: string;
  designation: string;
}
export const pays0: Pays = {
  id: "",
  designation: ""
}
export interface Role {
  id: string;
  designation: string;
  nbrUtilisateur: string;
}
export const role0: Role = {
  id: "",
  designation: "",
  nbrUtilisateur: "",
}
export interface Ville {
  id: string;
  designation: string;
  pays: Pays;
}
export interface Type {
  id: string;
  designation: string;
}
export const type0: Type = {
  id: "",
  designation: ""
}
export const t0: Transporteur = {
  id: "",
  designation: "",
};
export const d0: Document = {
  id: "",
  designation: "",
};
export const v0: Devise = {
  id: "",
  code_iso: "",
  symbole: "",
  designation: "",
};
export const p0: Pays = {
  id: "",
  designation: "",
};
export const i0: Ville = {
  id: "",
  designation: "",
  pays: p0,
};
export const y0: Document = {
  id: "",
  designation: "",
};
export const r0: Role = {
  id: "",
  designation: "",
  nbrUtilisateur: "",
};

//************************************************************ */
//************************************************************ */
//**********************vente et facturation *************************** */
export interface FactureJson {
  content: Facture[]
}
export interface AvoirJson {
  content: Avoir[]
}
export interface ConversionJson {
  content: Conversion[]
}
export interface JournalJson {
  content: Journal[]
}
export interface Facture {
  id: string
  NumFacture: number;
  client: Client[];
  date: Date
  numColisage: number
  Montant: number
  payementChoice: String
  incoterme: String
  reduction: number
  tva: number
  total: number
  payement: string
}
export interface ArticleFacture {
  id: string,
  codeArticle: number
  deignation: string
  quantité: number
  idFacture: string
  prixUnitaire: number
}
export const af: ArticleFacture = {
  id: '',
  codeArticle: 0,
  idFacture: '',
  deignation: '',
  quantité: 0,
  prixUnitaire: 0
}
export const fa0: Facture = {
  id: '',
  NumFacture: 0,
  client: [],
  date: new Date(),
  numColisage: 0,
  payementChoice: "",
  incoterme: "",
  Montant: 0,
  reduction: 0,
  tva: 0,
  total: 0,
  payement: ''
}
export interface Avoir {
  id: string
  num: number;
  client: Client[];
  NumFacture: number;
  date: Date
  Montant: number
}
export const a0: Avoir = {
  id: '',
  NumFacture: 0,
  client: [],
  date: new Date(),
  Montant: 0,
  num: 0
}
export interface Conversion {
  id: string
  NumFacture: number;
  date: Date
  Montant: number
  tauxchange: number
  valeur: number
  client: Client[];
}
export const co0: Conversion = {
  id: '',
  NumFacture: 0,
  client: [],
  date: new Date(),
  Montant: 0,
  tauxchange: 0,
  valeur: 0
}
export interface Journal {
  id: string
  type: string;
  date: Date
  NumFacture: number;
  client: Client[];
  entree: number;
  sortie: number;
}
export const j0: Journal = {
  id: '',
  type: '',
  NumFacture: 0,
  client: [],
  date: new Date(),
  entree: 0,
  sortie: 0
}

//************************************************************ */
//************************************************************ */
//**********************Fournisseur*************************** */
export interface Fournisseur {
  id: string;
  raisonSociale: string;
  contact: string;
  tel: string;
  email: string;
  adresse: string;
  modeDeReglements: string;
  incoterm: string;
  devise: string;
  nomBanque: string;
  ribBanque: string;
  swift: string;
  image: string;
  commandes: CommandeFournisseur[];
  matiere: MatierePremiere[];
}

export const f0: Fournisseur = {
  id: "",
  raisonSociale: "",
  contact: "",
  tel: "",
  email: "",
  adresse: "",
  modeDeReglements: "",
  incoterm: "",
  devise: "",
  nomBanque: "",
  ribBanque: "",
  swift: "",
  image: "",
  commandes: [],
  matiere: [],
};
//************************************************************ */
//************************************************************ */
//*******************CommandeFournsieeur********************** */
export interface CommandeFournisseur {
  id: string;
  dateLivraison: Date;
  dateCommande: Date;
  montant: number;
  idFournisseur: string;
}
export const cf0: CommandeFournisseur = {
  id: "",
  dateLivraison: new Date(),
  dateCommande: new Date(),
  //@ts-ignore
  montant: "",
  idFournisseur: "",
};
export const getCf0 = (f: Fournisseur): CommandeFournisseur => {
  return {
    id: "",
    dateLivraison: new Date(),
    dateCommande: new Date(),
    //@ts-ignore
    montant: "",
    fournisseur: f,
    idFournisseur: f.id,
  };
};
export const getFournisseur = (
  id: string,
  obj: Fournisseur[]
): Fournisseur | undefined => {
  const apr = obj?.find((o: Fournisseur) => {
    return o.id === id;
  });
  return apr;
};
//************************************************************ */
//************************************************************ */
//********************MatierePremiere************************* */
export interface MatierePremiere {
  id: string;
  designation: string;
  familleMatierePremiere: string;
  prix: number;
  origine: string;
  fournisseur: Fournisseur;
  idFournisseur: string;
}
export const mp0: MatierePremiere = {
  id: "",
  designation: "",
  familleMatierePremiere: "",
  //@ts-ignore
  prix: "",
  origine: "",
  fournisseur: f0,
  idFournisseur: "",
};
export const getMp0 = (f: Fournisseur): MatierePremiere => {
  return {
    id: "",
    designation: "",
    familleMatierePremiere: "",
    //@ts-ignore
    prix: "",
    origine: "",
    fournisseur: f,
    idFournisseur: f.id,
  };
};
//************************************************************ */
//************************************************************ */
//********************LigneDeCommande************************* */
export interface LigneDeCommande {
  id: string;
  designation: string;
  quantite: number;
  prix: number;
  commandeFournisseur: CommandeFournisseur;
  matierePremiere: MatierePremiere;
  idCommandeFournisseur: string;
  idMatierePremiere: string;
}
export const lc0: LigneDeCommande = {
  id: "",
  designation: "",
  //@ts-ignore
  quantite: "",
  //@ts-ignore
  prix: "",
  commandeFournisseur: cf0,
  matierePremiere: mp0,
  idCommandeFournisseur: "",
  idMatierePremiere: "",
};
export const getlc0 = (
  c: CommandeFournisseur,
  m: MatierePremiere
): LigneDeCommande => {
  return {
    id: "",
    designation: "",
    //@ts-ignore
    quantite: "",
    //@ts-ignore
    prix: "",
    commandeFournisseur: c,
    matierePremiere: m,
    idCommandeFournisseur: c.id,
    idMatierePremiere: m.id,
  };
};
export interface Users {
  id: number;
  nom: string;
  prenom: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  tele: string;
  img: string;
  email: string;
  phone: string;
  role: string[];
}
export const u0: Users = {
  id: -1,
  nom: "",
  prenom: "",
  password: "",
  username: "",
  first_name: "",
  last_name: "",
  tele: "",
  img: "",
  email: "",
  phone: "",
  role: [],
};
export interface AccessUser {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}
export const access0: AccessUser = {
  manageGroupMembership: true,
  view: true,
  mapRoles: true,
  impersonate: true,
  manage: true,
};
export interface User {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: any[];
  requiredActions: any[];
  notBefore: number;
  access: AccessUser;
}
export const user0: User = {
  id: "",
  createdTimestamp: 0,
  username: "",
  enabled: true,
  totp: false,
  emailVerified: false,
  firstName: "",
  lastName: "",
  email: "",
  disableableCredentialTypes: [],
  requiredActions: [],
  notBefore: 0,
  access: access0,
};
export interface UserSession {
  name: string
  email: string
}
export const emptyUser: UserSession = { "name": "", "email": "" }
export interface SessionToken {
  user: UserSession
  expires: Date
  accessToken: string
}
export const emptySession: SessionToken = { "user": emptyUser, "expires": new Date(), "accessToken": "" }
export interface Chaine {
  val: string;
}
export interface Id {
  id: string;
}
export interface ArticleClientJson {
  content: ArticleClient[]
}
export interface ArticleClient {
  id: string
  design: string
  poid: number
  prix: number
  date: Date
  idClient: string
  idFamilleArticle: string
  idFournisseur: string
}
export const articleClient0: ArticleClient = {
  id: "",
  design: "",
  poid: 0,
  prix: 0,
  //@ts-ignore
  date: "",
  idClient: "",
  idFamilleArticle: "",
  idFournisseur: "",
}
export const code0: Id = {
  id: ""
}

