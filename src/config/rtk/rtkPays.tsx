import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Pays } from "tools/types";

export const crudPays = createApi({
  reducerPath: "crud-Pays",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Pays", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /********************************************************************************************* */
      /********************************Pays************************************************************* */
      /********************************************************************************************* */
      fetchPays: builder.query<Pays[], void>({
        query: () => `/pays`,
      }),
      paginationPays: builder.query<Pays[], number>({
        query: (page) => `/pays?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOnePays: builder.query<Pays, string>({
        query: (id) => `/pays/${id}`,
      }),
      addPays: builder.mutation<Pays, Partial<Pays>>({
        query: (body) => ({
          url: "/pays",
          method: "POST",
          body,
        }),
      }),
      editPays: builder.mutation<
        Pays,
        //@ts-ignore
        Partial<Pays> & Pick<Pays, "id">
      >({
        query: (body) => ({
          url: `/pays/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deletePays: builder.mutation<{ success: boolean; id: number }, number>({
        //@ts-ignore
        query(id: Num) {
          //  if (confirm(`do you want delete Pays number ${id.id} ?`))
          return {
            url: `/pays/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
        //@ts-ignore
        invalidatesTags: (result, error, id) => [
          { type: "Pays", id },
          { type: "Pays", id: "LIST" },
        ],
      }),
      archivePays: builder.mutation<
        Pays,
        //@ts-ignore
        Partial<Pays> & Pick<Pays, "id">
      >({
        query: (id) => ({
          url: `/pays/${id}/archive`,
          method: "PATCH",
        }),
      }),
      restorePays: builder.mutation<
        Pays,
        //@ts-ignore
        Partial<Pays> & Pick<Pays, "id">
      >({
        query: (id) => ({
          url: `/pays/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});
/***********useMaMethodAfficjageQuery********************************************/
/***********useMaMethodeOperationMutaion*****************************************/
export const {
  /******************Pays********************************/
  /*******************************************************/
  useFetchPaysQuery,
  usePaginationPaysQuery,
  useFetchOnePaysQuery,
  useAddPaysMutation,
  useEditPaysMutation,
  useDeletePaysMutation,
  useArchivePaysMutation,
  useRestorePaysMutation,
} = crudPays;
export type PaysJson = {
  content: Pays[];
};
export type OpenPaysProp = {
  data: PaysJson;
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
export const openPays = (): OpenPaysProp => {
  const { data = [], refetch } = useFetchPaysQuery();
  const [save] = useAddPaysMutation();
  const [edit] = useEditPaysMutation();
  //@ts-ignore
  const out: OpenPaysProp = { data, refetch, save, edit };
  return out;
};
