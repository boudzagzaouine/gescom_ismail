import { TrashIcon } from '@heroicons/react/outline';
import { ArchiveIcon, ClipboardListIcon, PencilAltIcon, ReplyIcon } from '@heroicons/react/solid';
import ArchiveFacture from 'components/reference2/ArchiveFacture';
import DeleteFacture from 'components/reference2/DeleteFacture';
import RestoreFacture from 'components/reference2/RestoreFacture';
import { OpenFactureProp, openFactures, usePaginationFacturesQuery } from 'config/rtk/rtkFacture';
import React, { useRef, useState } from 'react';
import { REQUEST_EDIT, REQUEST_SAVE } from 'tools/consts';
import { fa0, Facture, FactureJson } from 'tools/types';
import Bcyan from 'widgets/Bcyan';
import { Button } from 'widgets/Button';
import Icon from 'widgets/Icon';
import Mitems0 from 'widgets/Mitems0';
import Pagin from 'widgets/Pagin';
import Section from 'widgets/Section';
import Table from 'widgets/Table';
import { MenuItems } from 'widgets/TypeWidgets';
import FormFactureManager from '../Forms/FormFacturManager';

function ListFactureManager() {
    const facturesToOpen: OpenFactureProp = openFactures();
    const factureJson: FactureJson = facturesToOpen.data
    const factures: Facture[] = factureJson.content
    const refetchFacture: () => void = facturesToOpen.refetch
    const saveFacture = facturesToOpen.save
    const editFacture = facturesToOpen.edit
    const [form, setForm] = useState(false)
    const [Facture0, setFacture0] = useState(fa0)
    const [requesfa0, setRequesfa0] = useState(REQUEST_SAVE)
    const [page, setPage] = useState(0);
    const { data = [], isFetching, refetch } = usePaginationFacturesQuery(page)
    const [button, setButton] = useState("")
    const loadPage = (p: number) => {
        setPage(p);
        refetch();
    };
    const [disabled, setDisabled] = useState(true);
    const del = useRef(null);
    const archive = useRef(null);
    const restore = useRef(null);

    const showFormulaire = (Facture: Facture) => {
        setFacture0(Facture);
        setForm(true);
        setRequesfa0(REQUEST_EDIT);
    };
    const FormAsAdd = () => {
        setDisabled(false);
        setFacture0(fa0);
        setForm(true);
        setRequesfa0(REQUEST_SAVE);
    };
    const FormAsEdit = (Facture: Facture) => {
        setDisabled(true);
        showFormulaire(Facture);
    };
    const FormAsUpdate = (Facture: Facture) => {
        setDisabled(false);
        showFormulaire(Facture);
    };
    const menu = (Facture: Facture): MenuItems[] => {
        return [
            {
                icon: (
                    <ClipboardListIcon
                        className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Détail",
                action: () => {
                    FormAsEdit(Facture);
                },
            },
            {
                icon: (
                    <PencilAltIcon
                        className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Modifier",
                action: () => {
                    FormAsUpdate(Facture);
                },
            },
            {
                icon: (
                    <TrashIcon
                        className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Supprimer",
                action: () => {
                    //@ts-ignore
                    del.current(Facture.id);
                },
            },
            {
                icon: (
                    <ArchiveIcon
                        className="mr-3 h-8 w-8 text-gray-800 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Archiver",
                action: () => {
                    //@ts-ignore
                    archive.current(Facture.id);
                },
            },
            {
                icon: (
                    <ReplyIcon
                        className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Restorer",
                action: () => {
                    //@ts-ignore
                    restore.current(Facture.id);
                },
            },
        ];
    };
    const imputFocus = useRef()
    const handle = () => {
        //@ts-ignore
        imputFocus.current.focus()
    }

    return (
        <>
            {form && (
                <FormFactureManager imputFocus={imputFocus}

                    request={requesfa0}
                    Facture={Facture0}
                    closed={() => {
                        setForm(false);
                        setRequesfa0(REQUEST_SAVE);
                        refetch();
                    }}
                    disable={disabled}
                />
            )}
            {!form && (
                <Section>
                    <DeleteFacture refetch={refetch} id={""} ref={del} />
                    <ArchiveFacture id={""} ref={archive} />
                    <RestoreFacture id={""} ref={restore} />
                    <div className="float-left w-full">
                        <Bcyan
                            className="float-left"
                            onClick={() => {
                                handle
                                //setClienfa0(c0);
                                //setForm(true);
                                FormAsAdd()
                            }}


                        >
                            ajouter facture
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
                    <Table className="tab-list float-left w-full mt-8"
                        thead={
                            <tr>
                                <Table.th>id</Table.th>
                                <Table.th>NumFacture</Table.th>
                                <Table.th>client</Table.th>
                                <Table.th>date</Table.th>
                                <Table.th>numColisage</Table.th>
                                <Table.th>Montant</Table.th>
                                <Table.th>tva</Table.th>
                                <Table.th>total</Table.th>
                                <Table.th>payement</Table.th>
                                <Table.th></Table.th>
                            </tr>
                        }
                    >
                        {

                            //@ts-ignore
                            factures?.map((Facture) => (
                                //   data?.map((facture) => (
                                <tr key={Facture.id}>
                                    <Table.td>
                                        {Facture.id}
                                    </Table.td>
                                    <Table.td>{Facture.NumFacture}  </Table.td>
                                    <Table.td>{Facture.client}  </Table.td>
                                    <Table.td>{Facture.date} </Table.td>
                                    <Table.td>{Facture.numColisage} </Table.td>
                                    <Table.td>{Facture.Montant} </Table.td>
                                    <Table.td>{Facture.tva} </Table.td>
                                    <Table.td>{Facture.total} </Table.td>
                                    <Table.td>{Facture.payement} </Table.td>
                                    <Table.td>
                                        <Mitems0 key={Facture.id} menu={menu(Facture)} />
                                    </Table.td>
                                </tr>
                            ))
                        }
                    </Table>


                    <Pagin load={loadPage} max={300} visible={factures?.length > 0} />
                </Section>
            )}
        </>
    )
}

export default ListFactureManager