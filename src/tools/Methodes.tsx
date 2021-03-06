import { Article, article0, c0, Client, f0, Fournisseur } from "./types";

export const getClient = (id: string, obj: Client[]): Client => {
  const apr = obj?.find((o: Client) => {
    return o.id === id;
  });
  return apr || c0;
};
export const getFamilleArticle = (id: string, obj: Article[]): Article => {
  const apr = obj?.find((o: Article) => {
    return o.id === id;
  });
  return apr || article0;
};
export const getFournisseur = (id: string, obj: Fournisseur[]): Fournisseur => {
  const apr = obj?.find((o: Fournisseur) => {
    return o.id === id;
  });
  return apr || f0;
};
