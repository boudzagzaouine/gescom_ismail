import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Transporteur } from "tools/types";

export const crudTransporteur = createApi({
  reducerPath: "crud-Transporteur",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Transporteur", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /********************************************************************************************* */
      /********************************Transporteur************************************************************* */
      /********************************************************************************************* */
      fetchTransporteurs: builder.query<Transporteur[], void>({
        query: () => `/transporteurs`,
      }),
      paginationTransporteurs: builder.query<Transporteur[], number>({
        query: (page) => `/transporteurs?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneTransporteur: builder.query<Transporteur, string>({
        query: (id) => `/transporteurs/${id}`,
      }),
      addTransporteur: builder.mutation<Transporteur, Partial<Transporteur>>({
        query: (body) => ({
          url: "/transporteurs",
          method: "POST",
          body,
        }),
      }),
      editTransporteur: builder.mutation<
        Transporteur,
        //@ts-ignore
        Partial<Transporteur> & Pick<Transporteur, "id">
      >({
        query: (body) => ({
          url: `/transporteurs/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteTransporteur: builder.mutation<
        { success: boolean; id: number },
        number
      >({
        //@ts-ignore
        query(id: Num) {
          //  if (confirm(`do you want delete Transporteur number ${id.id} ?`))
          return {
            url: `/transporteurs/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
        //@ts-ignore
        invalidatesTags: (result, error, id) => [
          { type: "Transporteur", id },
          { type: "Transporteur", id: "LIST" },
        ],
      }),
      archiveTransporteur: builder.mutation<
        Transporteur,
        //@ts-ignore
        Partial<Transporteur> & Pick<Transporteur, "id">
      >({
        query: (id) => ({
          url: `/transporteurs/${id}/archive`,
          method: "PATCH",
        }),
      }),
      restoreTransporteur: builder.mutation<
        Transporteur,
        //@ts-ignore
        Partial<Transporteur> & Pick<Transporteur, "id">
      >({
        query: (id) => ({
          url: `/transporteurs/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});
/***********useMaMethodAfficjageQuery********************************************/
/***********useMaMethodeOperationMutaion*****************************************/
export const {
  /******************Transporteur********************************/
  /*******************************************************/
  useFetchTransporteursQuery,
  usePaginationTransporteursQuery,
  useFetchOneTransporteurQuery,
  useAddTransporteurMutation,
  useEditTransporteurMutation,
  useDeleteTransporteurMutation,
  useArchiveTransporteurMutation,
  useRestoreTransporteurMutation,
} = crudTransporteur;
export type TransporteurJson = {
  content: Transporteur[];
};
export type OpenTransporteurProp = {
  data: TransporteurJson;
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
export const openTransporteurs = (): OpenTransporteurProp => {
  const { data = [], refetch } = useFetchTransporteursQuery();
  const [save] = useAddTransporteurMutation();
  const [edit] = useEditTransporteurMutation();
  //@ts-ignore
  const out: OpenTransporteurProp = { data, refetch, save, edit };
  return out;
};
