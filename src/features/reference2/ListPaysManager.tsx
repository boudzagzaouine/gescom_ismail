import { TrashIcon } from "@heroicons/react/outline";
import {
  ArchiveIcon, PencilAltIcon
} from "@heroicons/react/solid";
import ArchivePays from "components/reference2/ArchivePays";
import DeletePays from "components/reference2/DeletePays";
import { OpenPaysProp } from "components/reference2/OpenPays";
import RestorePays from "components/reference2/RestorePays";
import { openPays, usePaginationPaysQuery } from "config/rtk/rtkPays";
import React, { useRef, useState } from "react";
import { REQUEST_EDIT, REQUEST_SAVE } from "tools/consts";
import { p0, Pays, PaysJson } from "tools/types";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Mitems0 from "widgets/Mitems0";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormPaysManager from "./FormPaysManager";
function ListPaysManager() {
  const paysToOpen: OpenPaysProp = openPays();
  const paysJson: PaysJson = paysToOpen.data;
  const pays: Pays[] = paysJson.content;
  const refetchPays: () => void = paysToOpen.refetch;
  const savePays = paysToOpen.save;
  const editPays = paysToOpen.edit;
  const search = (key: string, obj: Pays[]): Pays[] => {
    const Payssearch: Pays[] = obj.filter((o: Pays) => {
      return o.id.match(key) != null || o.designation.match(key) != null;
    });
    return Payssearch;
  };
  const [form, setForm] = useState(false);
  const [Pays0, setPays0] = useState(p0);
  const [requesp0, setRequesp0] = useState(REQUEST_SAVE);
  const [page, setPage] = useState(0);
  const { data = [], isFetching, refetch } = usePaginationPaysQuery(page);
  const [button, setButton] = useState("");
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };
  const [disabled, setDisabled] = useState(true);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const showFormulaire = (Pays: Pays) => {
    setPays0(Pays);
    setForm(true);
    setRequesp0(REQUEST_EDIT);
  };
  const FormAsAdd = () => {
    setDisabled(false);
    setPays0(p0);
    setForm(true);
    setRequesp0(REQUEST_SAVE);
  };
  const FormAsEdit = (Pays: Pays) => {
    setDisabled(true);
    showFormulaire(Pays);
  };
  const FormAsUpdate = (Pays: Pays) => {
    setDisabled(false);
    showFormulaire(Pays);
  };
  const menu = (Pays: Pays): MenuItems[] => {
    return [
      {
        icon: (
          <PencilAltIcon
            className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Modifier",
        action: () => {
          FormAsUpdate(Pays);
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
          del.current(Pays.id);
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
          archive.current(Pays.id);
        },
      },
    ];
  };

  return (
    <>
      {form && (
        <FormPaysManager
          request={requesp0}
          Pays={Pays0}
          closed={() => {
            setForm(false);
            setRequesp0(REQUEST_SAVE);
            refetch();
          }}
          disable={disabled}
        />
      )}
      {!form && (
        <Section>
          <DeletePays refetch={refetch} id={""} ref={del} />
          <ArchivePays id={""} ref={archive} />
          <RestorePays id={""} ref={restore} />
          <h1>Pays</h1>
          <div className="float-left w-full">
            <Bcyan
              className="float-left"
              onClick={() => {
                //setClienp0(c0);
                //setForm(true);
                FormAsAdd();
              }}
            >
              Nouveau Pays
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
                <Table.th>Désignation</Table.th>
                <Table.th></Table.th>
              </tr>
            }
          >
            {
              //@ts-ignore
              pays?.map((Pays) => (
                //   data?.map((pays) => (
                <tr key={Pays.id}>
                  <Table.td>{Pays.designation}</Table.td>

                  <Table.td>
                    <Mitems0 menu={menu(Pays)} />
                  </Table.td>
                </tr>
              ))
            }
          </Table>

          <Pagin load={loadPage} max={300} visible={pays?.length > 0} />
        </Section>
      )}
    </>
  );
}

export default ListPaysManager;
