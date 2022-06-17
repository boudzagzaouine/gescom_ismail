import ArchiveCommand from "components/manager/client/ArchiveCommand";
import DeleteCommand from "components/manager/client/DeleteCommand";
import { OpenClientProp, openClients } from "config/rtk/RtkClient";
import {
  OpenCommandeProp, openCommandesPagination
} from "config/rtk/RtkCommande";
//@ts-ignore
import dateFormat from "dateformat";
import React, { useRef, useState } from "react";
import { getClient } from "tools/Methodes";
import { c0, Client, cm0, Commande } from "tools/types";
import Bcyan from "widgets/Bcyan";
import Mitems from "widgets/Mitems";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import FormCommande from "./FormCommande";
const ListAllCommandes = () => {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };
  const commandesToOpen: OpenCommandeProp = openCommandesPagination(page);
  const commandes: Commande[] = commandesToOpen.data.content;
  const refetch = commandesToOpen.refetch;
  const add=commandesToOpen.save
  const edit=commandesToOpen.edit
  //const { data = [], isFetching, refetch } = usePaginationCommandesQuery(page);

  const clientsToOpen: OpenClientProp = openClients();
  const clients: Client[] = clientsToOpen.data.content;
  const refCom = useRef(null);
  const cm1: Commande = cm0;
  cm1.idClient = "";
  const del = useRef(null);
  const archive = useRef(null);
  return (
    <Section>
      <DeleteCommand id={""} ref={del} />
      <ArchiveCommand id={""} ref={archive} />
      {clients?.length != 0 && (
        <Bcyan
          className="float-left mt-2"
          onClick={() => {
            //@ts-ignore
            refCom.current(cm1,c0,false);
          }}
        >
          Nouvelle commande
        </Bcyan>
      )}
      <FormCommande
      add={add}
      edit={edit}      
        command={cm1}
        client={c0}
        clients={clients || []}
        refetchList={refetch}
        ref={refCom}
        disabled={false}
      />
      <Table
        className="tab-list float-left w-full mt-2"
        thead={
          <tr>
            <Table.th>N° BC</Table.th>
            <Table.th>Client</Table.th>
            <Table.th>Date</Table.th>
            <Table.th>Saison</Table.th>
            <Table.th>Montant</Table.th>
            <Table.th></Table.th>
          </tr>
        }
      >
        {commandes?.map((commande) => (
          <tr key={commande.id}>
            <Table.td>{commande.id}</Table.td>
            <Table.td>{getClient(commande.idClient, clients).design}</Table.td>
            <Table.td>{dateFormat(commande.date, "dd-mm-yyyy")}</Table.td>
            <Table.td>{commande.season}</Table.td>
            <Table.td>{commande.amount}</Table.td>
            <Table.td>
            <Mitems
                      archive={() => {
                        //@ts-ignore
                        archive.current(commande.id);
                      }}
                      del={() => {
                        //@ts-ignore
                        del.current(commande.id);
                      }}
                      edit={() => {
                        //@ts-ignore
                        refCom.current(
                          commande,
                          getClient(commande.idClient, clients),
                          true
                        );
                      }}
                      obj={commande}
                      update={() => {
                        //@ts-ignore
                        refCom.current(
                          commande,
                          getClient(commande.idClient, clients),
                          false
                        );
                      }}
                    />
            </Table.td>
          </tr>
        ))}
      </Table>
      <Pagin load={loadPage} visible={commandes?.length > 0}  max={commandes?.length} />
    </Section>
  );
};

export default ListAllCommandes;
