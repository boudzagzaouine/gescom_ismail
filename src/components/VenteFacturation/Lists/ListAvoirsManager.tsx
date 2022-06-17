
import ArchiveAvoir from "components/VenteFacturation/methods/ArchiveAvoir";
import { OpenAvoirProp, openPaginationAvoirs } from "components/VenteFacturation/rtk/rtkAvoir";
import React, { useEffect, useRef, useState } from "react";
import { REQUEST_EDIT, REQUEST_SAVE } from "tools/consts";
import { a0, Avoir } from "tools/types";
import { Button } from "widgets";
import Bcyan from "widgets/Bcyan";
import Icon from "widgets/Icon";
import Mitems from "widgets/Mitems";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import FormAvoirManager from "../Forms/FormAvoirManager";
import DeleteAvoir from "../methods/DeleteAvoir";
import RestoreAvoir from "../methods/RestoreAvoir";

const ListAvoirManager = () => {
  const [form, setForm] = useState(false);
  const [avoir0, setAvoir0] = useState(a0);
  const [request0, setRequest0] = useState(REQUEST_SAVE);
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };
  //openPaginationAvoirs =(page:number):OpenAvoirProp
  const openAvoirs: OpenAvoirProp = openPaginationAvoirs(page);
  const avoirs: Avoir[] = openAvoirs.data.content;
  const refetch = openAvoirs.refetch;
  const [disabled, setDisabled] = useState(true);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const showFormulaire = (avoir: Avoir) => {
    setAvoir0(avoir);
    setForm(true);
    setRequest0(REQUEST_EDIT);
  };
  const FormAsAdd = () => {
    setDisabled(false);
    setAvoir0(a0);
    setForm(true);
    setRequest0(REQUEST_SAVE);
  };
  const FormAsEdit = (avoir: Avoir) => {
    setDisabled(true);
    showFormulaire(avoir);
  };
  const FormAsUpdate = (avoir: Avoir) => {
    setDisabled(false);
    showFormulaire(avoir);
  };
  useEffect(() => {

  })

  return (
    <>
      {form && (
        <FormAvoirManager
          request={request0}
          avoir={avoir0}
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
          <DeleteAvoir id={""} ref={del} />
          <ArchiveAvoir id={""} ref={archive} />
          <RestoreAvoir id={""} ref={restore} />
          <div className="float-left w-full">
            <Bcyan
              className="float-left"
              onClick={() => {
                //setAvoir0(a0);
                //setForm(true);
                FormAsAdd();
              }}
            >
              Nouveau Avoir
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
                <Table.th>N°</Table.th>
                <Table.th>Client</Table.th>
                <Table.th>N° Facture</Table.th>
                <Table.th>Date</Table.th>
                <Table.th>Montant</Table.th>
                <Table.th></Table.th>
              </tr>
            }
          >
            {
              //@ts-ignore
              avoirs?.map((avoir) => (
                //   data?.map((avoir) => (
                <tr key={avoir.id}>
                  <Table.td>{avoir.num}</Table.td>
                  <Table.td>{avoir.client}</Table.td>
                  <Table.td>{avoir.NumFacture}</Table.td>
                  <Table.td>{avoir.date}</Table.td>
                  <Table.td>{avoir.Montant}</Table.td>
                  <Table.td>
                    <Mitems
                      archive={() => {
                        //@ts-ignore
                        archive.current(avoir.id);
                      }}
                      del={() => {
                        //@ts-ignore
                        del.current(avoir.id);
                      }}
                      edit={() => {
                        FormAsEdit(avoir);
                      }}
                      obj={avoir}
                      update={() => {
                        FormAsUpdate(avoir);
                      }}
                    />
                  </Table.td>
                </tr>
              ))
            }
          </Table>

          <Pagin load={loadPage} visible={avoirs?.length > 0} max={avoirs?.length} />
        </Section>
      )}
    </>
  );
};

export default ListAvoirManager;
