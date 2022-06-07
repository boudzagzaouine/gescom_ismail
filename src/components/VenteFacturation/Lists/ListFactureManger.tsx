import ArchiveFacture from "components/reference2/ArchiveFacture";
import DeleteFacture from "components/reference2/DeleteFacture";
import RestoreFacture from "components/reference2/RestoreFacture";
import { OpenFactureProp, openFactures, openPaginationFactures } from "config/rtk/rtkFacture";
import React, { useEffect, useRef, useState } from "react";
import { REQUEST_EDIT, REQUEST_SAVE } from "tools/consts";
import { fa0, Facture } from "tools/types";
import { Button } from "widgets";
import Bcyan from "widgets/Bcyan";
import Icon from "widgets/Icon";
import Mitems from "widgets/Mitems";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import FormFactureManager from "../Forms/FormFacturManager";


const ListFactureManager = () => {
    const [form, setForm] = useState(false);
    const [facture0, setFacture0] = useState(fa0);
    const [request0, setRequest0] = useState(REQUEST_SAVE);
    const [page, setPage] = useState(0);
    const loadPage = (p: number) => {
        setPage(p);
        refetch();
    };
    //openPaginationFactures =(page:number):OpenFactureProp
    const openfactures: OpenFactureProp = openPaginationFactures(page);
    const factures: Facture[] = openfactures.data.content;
    const refetch = openfactures.refetch;
    const [disabled, setDisabled] = useState(true);
    const del = useRef(null);
    const archive = useRef(null);
    const restore = useRef(null);

    const showFormulaire = (facture: Facture) => {
        setFacture0(facture);
        setForm(true);
        setRequest0(REQUEST_EDIT);
    };
    const FormAsAdd = () => {
        setDisabled(false);
        setFacture0(fa0);
        setForm(true);
        setRequest0(REQUEST_SAVE);
    };
    const FormAsEdit = (facture: Facture) => {
        setDisabled(true);
        showFormulaire(facture);
    };
    const FormAsUpdate = (facture: Facture) => {
        setDisabled(false);
        showFormulaire(facture);
    };
    useEffect(() => {

    })

    return (
        <>
            {form && (
                <FormFactureManager
                    request={request0}
                    facture={facture0}
                    closed={() => {
                        setForm(false);
                        setRequest0(REQUEST_SAVE);
                        refetch();
                    }}
                    refetch={refetch}
                    disable={disabled}
                />
            )}
            {!form && (
                <Section>
                    <DeleteFacture id={""} ref={del} />
                    <ArchiveFacture id={""} ref={archive} />
                    <RestoreFacture id={""} ref={restore} />
                    <div className="float-left w-full">
                        <Bcyan
                            className="float-left"
                            onClick={() => {
                                //setFacture0(fa0);
                                //setForm(true);
                                FormAsAdd();
                            }}
                        >
                            Nouveau Facture
                        </Bcyan>
                        <div className="float-right">
                            <Button className="bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg">
                                <Icon i="search" cl="" />
                            </Button>
                            <input
                                type="text"
                                className="py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96"
                            />
                        </div>
                    </div>
                    <Table
                        className="tab-list float-left w-full mt-8"
                        thead={
                            <tr>
                                <Table.th>N° Facture</Table.th>
                                <Table.th>Client</Table.th>
                                <Table.th>N° colisage</Table.th>
                                <Table.th>Date</Table.th>
                                <Table.th>Montant</Table.th>
                                <Table.th>Reduction</Table.th>
                                <Table.th>TVA</Table.th>
                                <Table.th>Total</Table.th>
                                <Table.th>Payement</Table.th>
                                <Table.th></Table.th>
                            </tr>
                        }
                    >
                        {
                            //@ts-ignore
                            factures?.map((facture) => (
                                //   data?.map((facture) => (
                                <tr key={facture.id}>
                                    <Table.td>  {facture.NumFacture}   </Table.td>
                                    <Table.td>  {facture.client}</Table.td>
                                    <Table.td> {facture.numColisage}</Table.td>
                                    <Table.td>{facture.date}</Table.td>
                                    <Table.td>{facture.Montant}</Table.td>
                                    <Table.td>{facture.reduction}</Table.td>
                                    <Table.td>{facture.tva}</Table.td>
                                    <Table.td>{facture.total}</Table.td>
                                    <Table.td>{facture.payement}</Table.td>
                                    <Table.td>
                                        <Mitems
                                            archive={() => {
                                                //@ts-ignore
                                                archive.current(facture.id);
                                            }}
                                            del={() => {
                                                //@ts-ignore
                                                del.current(facture.id);
                                            }}
                                            edit={() => {
                                                FormAsEdit(facture);
                                            }}
                                            obj={facture}
                                            update={() => {
                                                FormAsUpdate(facture);
                                            }}
                                        />
                                    </Table.td>
                                </tr>
                            ))
                        }
                    </Table>

                    <Pagin load={loadPage} visible={factures?.length > 0} max={factures?.length} />
                </Section>
            )}
        </>
    );
};

export default ListFactureManager;
