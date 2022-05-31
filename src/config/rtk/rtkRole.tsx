import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Role } from "tools/types";
export const crudRole = createApi({
  reducerPath: "crud-Role",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Role", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /********************************************************************************************* */
      /********************************Role************************************************************* */
      /********************************************************************************************* */
      fetchRoles: builder.query<Role[], void>({
        query: () => `/roles`,
      }),
      paginationRoles: builder.query<Role[], number>({
        query: (page) => `/roles?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneRole: builder.query<Role, string>({
        query: (id) => `/roles/${id}`,
      }),
      addRole: builder.mutation<Role, Partial<Role>>({
        query: (body) => ({
          url: "/roles",
          method: "POST",
          body,
        }),
      }),
      editRole: builder.mutation<
        Role,
        //@ts-ignore
        Partial<Role> & Pick<Role, "id">
      >({
        query: (body) => ({
          url: `/roles/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteRole: builder.mutation<{ success: boolean; id: number }, number>({
        //@ts-ignore
        query(id: Num) {
          //  if (confirm(`do you want delete Role number ${id.id} ?`))
          return {
            url: `/roles/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
        //@ts-ignore
        invalidatesTags: (result, error, id) => [
          { type: "Role", id },
          { type: "Role", id: "LIST" },
        ],
      }),
      archiveRole: builder.mutation<
        Role,
        //@ts-ignore
        Partial<Role> & Pick<Role, "id">
      >({
        query: (id) => ({
          url: `/roles/${id}/archive`,
          method: "PATCH",
        }),
      }),
      restoreRole: builder.mutation<
        Role,
        //@ts-ignore
        Partial<Role> & Pick<Role, "id">
      >({
        query: (id) => ({
          url: `/roles/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});
/***********useMaMethodAfficjageQuery********************************************/
/***********useMaMethodeOperationMutaion*****************************************/
export const {
  /******************Role********************************/
  /*******************************************************/
  useFetchRolesQuery,
  usePaginationRolesQuery,
  useFetchOneRoleQuery,
  useAddRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
  useArchiveRoleMutation,
  useRestoreRoleMutation,
} = crudRole;
export type RoleJson = {
  content: Role[];
};
export type OpenRoleProp = {
  data: RoleJson;
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
export const openRoles = (): OpenRoleProp => {
  const { data = [], refetch } = useFetchRolesQuery();
  const [save] = useAddRoleMutation();
  const [edit] = useEditRoleMutation();
  //@ts-ignore
  const out: OpenRoleProp = { data, refetch, save, edit };
  return out;
};
