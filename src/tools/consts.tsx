export const INPUT: number = 0;
export const TEXTAREA: number = 1;
export const SELECT: number = 2;
export const HIDDEN: number = 3;
export const LABEL = -1;
export const REQUEST_SAVE = 4;
export const REQUEST_EDIT = 5;
export const REQUEST_DELETE = 6;
export const PAGE_SIZE = 30000;

export const PAYMENT_CHOICE = [" ", "CHECK", "ESPECE", "CARTE"];
export const INCOTERM = [" ", "CTP", "CIP", "DAP", "DDP"];
export const CLIENT = [" ", "ISMAIL", "IMANE", "ILIAS", "JON"];
export const MODEREGELEMENT = [" ", "LIC", "VIREMENT"];
export const DEVISE = [" ", "MAD", "EUR", "DLR", "YEN"];

export const HOME = 7;
export const CLIENT_MANAGER = 8;
export const VENDOR_MANAGER = 9;
export const PURCHASE_MANAGER = 10;
export const FACTURATION_MANAGER = 11
export const TABLE_MANAGER = 12


export const DECIMAL = [" ", "0.0", "0.00", "0.000", "0.0000"];
export const VILLE = [" ", "Fes", "El Jadida", "Casa", "Rabat"];
export const FAMILLE = [
  " ",
  "Plastique",
  "Organique",
  "Céramique",
  "Métallique",
];
export const UNIT = [" ", "Kg", "Gr", "M", "Cm", "Mm", "L"];

export const PAYS_CHOICE = ["", "Morocco", "Algerie", "Spain"];

export const INCOTERM_GES = 15;
export const DECLARANT_GES = 16;
export const MODE_PAYEMENT = 17;
export const REGIME_DOUANIER = 18;
export const UNIT_MEASURE = 19;
export const FAMILLE_ARTICLE = 20;
export const FAMILLE_MATIERE_PREMIERE = 21;
export const BUREAU_DOUANE = 22;

export const TRANSPORTEUR_MANAGER = 23;
export const DOCUMENT_MANAGER = 24;
export const DEVISE_MANAGER = 25;
export const PAYS_MANAGER = 26;
export const VILLE_MANAGER = 27;
export const TYPE_MANAGER = 28;
export const ROLE_MANAGER = 29;
export const USER_MANAGER = 30;
export const LIST_FAMILLE_MATIERE_PREMIERE = [
  "",
  "energetiques",
  "metalliques",
  "minerales",
];
export const ORIGINE = ["", "Maroc", "France", "Canada", "Italie"];

export const ROLE = ["", "Admin", "User"];
export const SEASON = ["hiver","printemps","automne","été"];
export const URL_API_SEC = process.env.NEXT_URL_API;
