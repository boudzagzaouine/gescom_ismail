import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Facture, FactureJson } from "tools/types";

export const crudFacture = createApi({
    reducerPath: "crud-Facture",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_URL,
        prepareHeaders(headers) {
            return headers;
        },
    }),
    tagTypes: ["Facture", "UNAUTHORIZED", "UNKNOWN_ERROR"],
    endpoints(builder) {
        return {
            /********************************************************************************************* */
            /********************************Facture************************************************************* */
            /********************************************************************************************* */
            fetchFactures: builder.query<Facture[], void>({
                query: () => `/factures`,
            }),
            paginationFactures: builder.query<Facture[], number>({
                query: (page) => `/factures?page=${page}&size=${PAGE_SIZE}`,
            }),
            fetchOneFacture: builder.query<Facture, string>({
                query: (id) => `/factures/${id}`,
            }),
            addFacture: builder.mutation<Facture, Partial<Facture>>({
                query: (body) => ({
                    url: "/factures",
                    method: "POST",
                    body,
                }),
            }),
            editFacture: builder.mutation<

                Facture,
                //@ts-ignore
                Partial<Facture> & Pick<Facture, "id">
            >({
                query: (body) => ({
                    url: `/factures/${body.id}`,
                    method: "PUT",
                    body,
                }),
            }),
            deleteFacture: builder.mutation<{ success: boolean; id: number }, number>({
                //@ts-ignore
                query(id: Num) {
                    //  if (confirm(`do you want delete Facture number ${id.id} ?`))
                    return {
                        url: `/factures/${id.id}`,
                        method: "DELETE",
                    };
                    // else return
                },
            }),
            archiveFacture: builder.mutation<
                Facture,
                //@ts-ignore
                Partial<Facture> & Pick<Facture, "id">
            >({
                query: (id) => ({
                    url: `/factures/${id}/archive`,
                    method: "PATCH",
                }),
            }),
            restoreFacture: builder.mutation<
                Facture,
                //@ts-ignore
                Partial<Facture> & Pick<Facture, "id">
            >({
                query: (id) => ({
                    url: `/factures/${id}/restore`,
                    method: "PUT",
                }),
            }),

        };
    },
});
/***********useMaMethodAfficjageQuery********************************************/
/***********useMaMethodeOperationMutaion*****************************************/
export const {
    /******************Facture********************************/
    /*******************************************************/
    useFetchFacturesQuery,
    usePaginationFacturesQuery,
    useFetchOneFactureQuery,
    useAddFactureMutation,
    useEditFactureMutation,
    useDeleteFactureMutation,
    useArchiveFactureMutation,
    useRestoreFactureMutation,

} = crudFacture;
export type OpenFactureProp = {
    data: FactureJson
    refetch: () => void
    save: () => void
    edit: () => void
}
export const openFactures = (): OpenFactureProp => {
    const { data = [], refetch } = usePaginationFacturesQuery(0);
    const [save] = useAddFactureMutation();
    const [edit] = useEditFactureMutation();
    //@ts-ignore
    const out: OpenFactureProp = { data, refetch, save, edit }
    return out;
}
export const openPaginationFactures = (page: number): OpenFactureProp => {
    const { data = [], refetch } = usePaginationFacturesQuery(page);
    const [save] = useAddFactureMutation();
    const [edit] = useEditFactureMutation();
    //@ts-ignore
    const out: OpenFactureProp = { data, refetch, save, edit };
    return out;
};