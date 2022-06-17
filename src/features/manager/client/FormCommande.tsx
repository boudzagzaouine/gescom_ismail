import React, { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react'
import { adr0, AdressLiv, c0, Client, cm0, Commande } from 'tools/types'
//@ts-ignore
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";
import Calendar from "widgets/Calendar";
import { Field, Form } from 'widgets';
import Bsave from 'widgets/Bsave';
import Bcancel from 'widgets/Bcancel';
import Modal from 'widgets/Modal'
import { openAdressLivByIdClientProps } from 'components/manager/client/openAdressLivByIdClient';
import { openAdressLivsByIdClient } from 'config/rtk/RtkAdressLiv';
import NavTabs from 'widgets/NavTabs';
import { BriefcaseIcon } from '@heroicons/react/solid';
import { style_icon, style_span } from 'tools/constStyle';
import ListArticleCommandes from './ListArticleCommandes';
import { SEASON } from 'tools/consts';
import Bupdate from 'widgets/Bupdate';
import CloseCalendar from 'widgets/CloseCalendar';
type FormCommandeProp = {
  command: Commande
  client: Client
  clients: Client[]
  refetchList: () => void
  add: () => void
  edit: () => void
  disabled: boolean
}
const FormCommande = ({ command, add, edit, refetchList, client, clients, disabled }: FormCommandeProp, ref: Ref<void>) => {
  const [showModal, setShowModal] = useState(false);
  const [command0, setCommand0] = useState(command);
  const [client0, setClient0] = useState(client)
  const [disabled0, setDisabled0] = useState(disabled)
  const adressLivsToOpen: openAdressLivByIdClientProps =
    openAdressLivsByIdClient(client0?.id);
  const adressLivs: AdressLiv[] = adressLivsToOpen.data;
  const [startDate, setStartDate] = useState(command0.date);
  const [openCalendar, setOpenCalendar] = useState(false);
  const openModal = (c: Commande, cl: Client, disabled: boolean) => {
    setCommand0(c);
    setClient0(cl)
    setShowModal(true);
    setDisabled0(disabled)
  };
  const save = command0.id == "" ? add : edit;
  const close = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  })

  return (
    <Modal close={close} format={5} show={showModal} title={command0.id === "" ? "Nouvelle commande" : "Mise à jour de la commande"} >
      <Form defaultValues={command0} onSubmit={save} >
        <CloseCalendar open={openCalendar} setOpen={setOpenCalendar} />

        <div className="float-left w-1/2 relative">
          {command0.id != "" ?
            <Field disabled={true} label="Client" value={client0?.design} /> :
            <Field
              label="Client"
              name="client__"
              as="select"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                let c: Client = JSON.parse(e.target.value);
                setClient0(c);
                setCommand0({ ...command0, idClient: c.id })
              }}
            >
              {[c0, ...(clients || [])]?.map((c: Client) => (
                <option value={JSON.stringify(c)}>{c.design}</option>
              ))}
            </Field>}
          <Field disabled={disabled0}
            label="Date Commande"
            name="date33"
            value={dateFormat(startDate, "dd-mm-yyyy")}
            onFocus={() => {
              setOpenCalendar(true);
            }}
          />
          {openCalendar && (
            <>
              <DatePicker
                selected={startDate}
                name="date11"
                onChange={(d: Date) => {
                  setStartDate(d);
                  setCommand0({ ...command0, date: d })
                  setOpenCalendar(false);
                }}
                dateFormat="dd-MM-yyyy"
                calendarContainer={Calendar}
                inline
              />

            </>
          )}
        </div>
        <div className="float-left w-1/2">
          <Field disabled={disabled0}
            label="Adress de livraison"
            name="adrLiv"
            as="select"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setCommand0({ ...command0, adrLiv: e.target.value })
            }}
          >
            {[adr0, ...(adressLivs || [])]?.map((c: AdressLiv) => (
              <option value={c.adress}>{c.adress}</option>
            ))}
          </Field>
          <Field disabled={disabled0}
            label="Saison"
            name="season"
            as="select"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setCommand0({ ...command0, season: e.target.value })
            }}

          >
            {["", ...SEASON]?.map((c: string) => (
              <option value={c}>{c}</option>
            ))}
          </Field>
        </div>
        <div className="float-left w-full mt-1">
          {!disabled0 && (
            <Bsave
              className="float-right b-ajust-r"
              onClick={() => {
                setTimeout(() => {
                  refetchList();
                  close();
                }, 500);
              }}
            />
          )}
        </div>
      </Form>
      {!disabled0 && (
        <Bcancel
          className={
            "float-right b-ajust " + (command0.id == "" && "b-ajustf")
          }
          onClick={() => {
            if (command0.id != "")
              setDisabled0(true);
            else close()
          }}
        />
      )}

      {disabled0 && (
        <Bupdate
          className="float-right"
          onClick={() => {
            setDisabled0(false);
          }}
        />
      )}
      {command0.id != "" && <NavTabs tab={[
        {
          id: 1,
          name: (
            <>
              <BriefcaseIcon className={style_icon} aria-hidden="true" />
              <span className={style_span}>Articles de la commande</span>
            </>
          ),
          featured: <ListArticleCommandes idClient={client0.id} idCommande={command0.id} />,
        },
      ]} />}
    </Modal>
  )
}

export default forwardRef(FormCommande)