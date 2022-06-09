import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import {
    Avoir, AvoirJson
} from "tools/types";

export const crudAvoir = createApi({
    reducerPath: "crud-avoir",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_URL,
        prepareHeaders(headers) {
            return headers;
        },
    }),
    tagTypes: ["Avoir", "UNAUTHORIZED", "UNKNOWN_ERROR"],
    endpoints(builder) {
        return {
            /*****************************************************************************/
            /*********************************avoir**************************************/
            /*****************************************************************************/
            fetchAvoirs: builder.query<Avoir[], void>({
                query: () => `/avoirs`,
            }),
            paginationAvoirs: builder.query<Avoir[], number>({
                query: (page) => `/avoirs?page=${page}&size=${PAGE_SIZE}`,
            }),
            fetchOneAvoir: builder.query<Avoir, string>({
                query: (id) => `/avoirs/${id}`,
            }),
            addAvoir: builder.mutation<Avoir, Partial<Avoir>>({
                query: (body) => ({
                    url: "/avoirs",
                    method: "POST",
                    body,
                }),
            }),
            editAvoir: builder.mutation<
                Avoir,
                Partial<Avoir> & Pick<Avoir, "id">
            >({
                query: (body) => ({
                    url: `/avoirs/${body.id}`,
                    method: "PUT",
                    body,
                }),
            }),
            deleteAvoir: builder.mutation<{ success: boolean; id: number }, number>({
                //@ts-ignore
                query(id: Num) {
                    //  if (confirm(`do you want delete Avoir number ${id.id} ?`))
                    return {
                        url: `/avoirs/${id.id}`,
                        method: "DELETE",
                    };
                },
            }),
            archiveAvoir: builder.mutation<
                Avoir,
                Partial<Avoir> & Pick<Avoir, "id">
            >({
                query: (id) => ({
                    url: `/avoirs/${id}/archive`,
                    method: "PUT",
                }),
            }),
            restoreAvoir: builder.mutation<
                Avoir,
                Partial<Avoir> & Pick<Avoir, "id">
            >({
                query: (id) => ({
                    url: `/avoirs/${id}/restore`,
                    method: "PUT",
                }),
            }),
        };
    },
});
/***********useMaMethodAfficjageQuery********************************************/
/***********useMaMethodeOperationMutaion*****************************************/
export const {
    /******************Avoir********************************/
    /*******************************************************/
    useFetchAvoirsQuery,
    usePaginationAvoirsQuery,
    useFetchOneAvoirQuery,
    useAddAvoirMutation,
    useEditAvoirMutation,
    useDeleteAvoirMutation,
    useArchiveAvoirMutation,
    useRestoreAvoirMutation,
} = crudAvoir;
export type OpenAvoirProp = {
    data: AvoirJson;
    refetch: () => void;
    save: () => void;
    edit: () => void;
};
export const openAvoirs = (): OpenAvoirProp => {
    const { data = [], refetch } = useFetchAvoirsQuery();
    const [save] = useAddAvoirMutation();
    const [edit] = useEditAvoirMutation();
    //@ts-ignore
    const out: OpenAvoirProp = { data, refetch, save, edit };
    return out;
};
export const openPaginationAvoirs = (page: number): OpenAvoirProp => {
    const { data = [], refetch } = usePaginationAvoirsQuery(page);
    const [save] = useAddAvoirMutation();
    const [edit] = useEditAvoirMutation();
    //@ts-ignore
    const out: OpenAvoirProp = { data, refetch, save, edit };
    return out;
};

