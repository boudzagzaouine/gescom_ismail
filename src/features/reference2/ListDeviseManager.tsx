import { TrashIcon } from "@heroicons/react/outline";
import {
  ArchiveIcon,
  PencilAltIcon
} from "@heroicons/react/solid";
import ArchiveDevise from "components/reference2/ArchiveDevise";
import DeleteDevise from "components/reference2/DeleteDevise";
import RestoreDevise from "components/reference2/RestoreDevise";
import { DeviseJson, OpenDeviseProp, openDevises } from "config/rtk/rtkDevise";
import React, { useRef, useState } from "react";
import { Devise, v0 } from "tools/types";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Mitems0 from "widgets/Mitems0";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormDeviseManager from "./FormDevise";
function ListDeviseManager() {

  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };

  const devisesToOpen: OpenDeviseProp = openDevises(page);
  const deviseJson: DeviseJson = devisesToOpen.data;
  const devises: Devise[] = deviseJson.content;
  const refetch: () => void = devisesToOpen.refetch;
  const save = devisesToOpen.save;
  const edit = devisesToOpen.edit;


  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);



  const menu = (devise: Devise): MenuItems[] => {
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
          //@ts-ignore
          refCom.current(devise, false);
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
          del.current(Devise.id);
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
          archive.current(Devise.id);
        },
      },
    ];
  };
  const imputFocus = useRef();


  return (
    <>
      <Section>
        <DeleteDevise refetch={refetch} id={""} ref={del} />
        <ArchiveDevise id={""} ref={archive} />
        <RestoreDevise id={""} ref={restore} />
        <h1>Devise</h1>
        <div className="float-left w-full">
          <Bcyan
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(v0, false);

            }}
          >
            Novelle Devise
          </Bcyan>
          <FormDeviseManager
            refetch={refetch}
            save={save}
            edit={edit}
            Devise={v0}
            disable={false}
            ref={refCom}
          />

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
              <Table.th>Code ISO</Table.th>
              <Table.th>Symbole</Table.th>
              <Table.th></Table.th>
            </tr>
          }
        >
          {
            devises?.map((Devise) => (
              <tr key={Devise.id}>
                <Table.td>{Devise.designation} </Table.td>
                <Table.td>{Devise.code_iso} </Table.td>
                <Table.td>{Devise.symbole} </Table.td>
                <Table.td>
                  <Mitems0 key={Devise.id} menu={menu(Devise)} />
                </Table.td>
              </tr>
            ))
          }
        </Table>

        <Pagin load={loadPage} max={300} visible={devises?.length > 0} />
      </Section>

    </>
  );
}

export default ListDeviseManager;
