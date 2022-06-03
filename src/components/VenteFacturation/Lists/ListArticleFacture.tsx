
import { OpenArticleFactureByFactureProp, openArticleFacturesByFacture } from "config/rtk/rtkArticleFacture";
import React, { useRef } from "react";
import { af, ArticleFacture, Facture } from "tools/types";
import Bcyan from "widgets/Bcyan";
import Table from "widgets/Table";
type ListArticlesProp = {
    facture: Facture;
    refetchParent: () => void;
};
const ListArticles = ({ facture, refetchParent }: ListArticlesProp) => {
    const commandesOpen: OpenArticleFactureByFactureProp = openArticleFacturesByFacture(facture.id)
    const factures: ArticleFacture[] = commandesOpen.data
    const save = commandesOpen.save
    const edit = commandesOpen.edit
    const refetch = commandesOpen.refetch
    const af1: ArticleFacture = af;
    af1.idFacture = facture.id;
    const refCom = useRef(null);
    const refetchAll = () => {
        refetch();
        refetchParent();
    };
    return (
        <>
            <Bcyan
                className="float-left mt-2"
                onClick={() => {
                    //@ts-ignore
                    refCom.current(cm0, facture);
                }}
            >
                Nouvelle commande
            </Bcyan>
            <Table
                className="tab-list float-left w-full mt-2"
                thead={
                    <tr>
                        <Table.th>code article</Table.th>
                        <Table.th>dasignation</Table.th>
                        <Table.th>quantité</Table.th>
                        <Table.th>prix unitaire</Table.th>
                    </tr>
                }
            >
                {factures?.map((article) => (
                    <tr key={article.id}>
                        <Table.td>{article.id}</Table.td>
                        <Table.td>{article.deignation}</Table.td>
                        <Table.td>{article.quantité}</Table.td>
                        <Table.td>{article.prixUnitaire}</Table.td>

                    </tr>
                ))}
            </Table>
        </>
    );
};

export default ListArticles;
