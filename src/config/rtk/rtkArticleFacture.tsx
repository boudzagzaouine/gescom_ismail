import { PAGE_SIZE } from '../../tools/consts';
import { ArticleFacture } from '../../tools/types';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const crudArticleFacture = createApi({
  reducerPath: "crud-articleFacture",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["ArticleFacture", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /****************************************************************************/
      /*************************COMMANDE*******************************************/
      /****************************************************************************/
      fetchArticleFactures: builder.query<ArticleFacture[], void>({
        query: () => `/articleFactures`,
      }),
      paginationArticleFactures: builder.query<ArticleFacture[], number>({
        query: (page) => `/articleFactures?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetcharticleFacturesByIdFacture: builder.query<ArticleFacture[], string>({
        query: (idFacture) => `/articleFactures/idfacture/${idFacture}`,
      }),
      fetchOneArticleFacture: builder.query<ArticleFacture, string>({
        query: (id) => `/articleFactures/${id}`,
      }),
      addArticleFacture: builder.mutation<ArticleFacture, Partial<ArticleFacture>>({
        query: (body) => ({
          url: `/articleFactures`,
          method: "POST",
          body,
        }),
      }),
      editArticleFacture: builder.mutation<
        ArticleFacture,
        Partial<ArticleFacture> & Pick<ArticleFacture, "id">
      >({
        query: (body) => ({
          url: `/articleFactures/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteArticleFacture: builder.mutation<
        { success: boolean; id: number },
        number
      >({
        //@ts-ignore
        query(id: Num) {
          return {
            url: `/articleFactures/${id.id}`,
            method: "DELETE",
          };
        },
      }),
      archiveArticleFacture: builder.mutation<
        ArticleFacture,
        Partial<ArticleFacture> & Pick<ArticleFacture, "id">
      >({
        query: (id) => ({
          url: `/articleFactures/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreArticleFacture: builder.mutation<
        ArticleFacture,
        Partial<ArticleFacture> & Pick<ArticleFacture, "id">
      >({
        query: (id) => ({
          url: `/articleFactures/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});
export const {
  useFetchArticleFacturesQuery,
  usePaginationArticleFacturesQuery,
  useFetcharticleFacturesByIdFactureQuery,
  useFetchOneArticleFactureQuery,
  useAddArticleFactureMutation,
  useEditArticleFactureMutation,
  useDeleteArticleFactureMutation,
  useArchiveArticleFactureMutation,
  useRestoreArticleFactureMutation,
} = crudArticleFacture;
export type ArticleFactureJson = {
  content: ArticleFacture[];
};
export type OpenArticleFactureProp = {
  data: ArticleFactureJson;
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
//const articleFacturesOpen: OpenArticleFactureProp =openArticleFactures()
export const openArticleFactures = (): OpenArticleFactureProp => {
  const { data = [], refetch } = useFetchArticleFacturesQuery();
  const [save] = useAddArticleFactureMutation();
  const [edit] = useEditArticleFactureMutation();
  //@ts-ignore
  const out: OpenArticleFactureProp = { data, refetch, save, edit };
  return out;
};
export type OpenArticleFactureByFactureProp = {
  data: ArticleFacture[];
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
export const openArticleFacturesByFacture = (idfacture: string): OpenArticleFactureByFactureProp => {
  const { data = [], refetch } = useFetcharticleFacturesByIdFactureQuery(idfacture);
  const [save] = useAddArticleFactureMutation();
  const [edit] = useEditArticleFactureMutation();
  //@ts-ignore
  const out: OpenArticleFactureByFactureProp = { data, refetch, save, edit };
  return out;
};
export const openArticleFacturesPagination = (page: number): OpenArticleFactureProp => {
  const { data = [], refetch } = usePaginationArticleFacturesQuery(page);
  const [save] = useAddArticleFactureMutation();
  const [edit] = useEditArticleFactureMutation();
  //@ts-ignore
  const out: OpenArticleFactureProp = { data, refetch, save, edit };
  return out;
};
