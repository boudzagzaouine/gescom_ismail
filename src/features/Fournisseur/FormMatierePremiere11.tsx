import { BriefcaseIcon, SaveIcon, XCircleIcon } from "@heroicons/react/solid";
import { useAddCommandeMutation, useEditCommandeMutation, useFetchClientsQuery } from "config/rtk";
import React, { ChangeEvent, forwardRef, Ref, useEffect, useRef, useState } from "react";
import { STYLE_ICON, style_icon, style_span } from "tools/constStyle";
import { AdressLiv, c0,adr0, Client, Commande} from "tools/types";
import { Field, Form } from "widgets";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Modal from "widgets/Modal";
import NavTabs from "widgets/NavTabs";
import { MenuNavTabs } from "widgets/TypeWidgets";
import ArticlesCommande from "./ArticlesCommande";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Bsave from "widgets/Bsave";
import Bcancel from "widgets/Bcancel";
import { openClients } from "components/manager/client/openClients";
import { openAdressLivByIdClient } from "components/manager/client/openAdressLivByIdClient";
import { openOneClient } from "components/manager/client/openOneClient";
import {  openAdressLivs } from "components/manager/client/openAdressLivs";
type CommandProps = {
  command: Commande;
  client:Client
  clients:Client[]
  refetch:()=>void
};

const FormCommande = ({ command,client,clients,refetch }: CommandProps, ref: Ref<void>) => {
  const [showModal, setShowModal] = React.useState(false);
  const [command0, setCommand0] = useState(command);
  const [idClient,setIdClient]=useState<string>("")
  const [client0,setClient0]=useState<Client>(client)
  console.log("teqsttt client ="+JSON.stringify(client))
  //const clients:Client[]=openClients()
  const openModal = (c: Commande,cl:Client) => {
    setCommand0(c);
    setClient0(cl)
    setShowModal(true);
  };
    const [add]=useAddCommandeMutation();
    const [edit]=useEditCommandeMutation();
  const save=command0.id==""?add:edit
  const close=()=>{
    setShowModal(false);
  }
  useEffect(() => {
  //  setClient(openClient)
   //@ts-ignore
    ref.current = openModal;
  });
  const commanndes: MenuNavTabs[] = [
    {
      id: 1,
      name: (
        <>
          <BriefcaseIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Articles de la commande</span>
        </>
      ),
      featured: <ArticlesCommande idCommande={command0.id} />,
    },
  ];
  const fieldIdClient = useRef(null)
  const fieldAdressLiv = useRef(null)
 
    return (
    <Modal title={command0.id===""?"Nouvelle commande":"Mise ?? jour de la commande"} 
    show={showModal} format={5} close={close}>
      
      <Form defaultValues={command0} onSubmit={save}>
    
            <>
              <div className="float-left w-1/2">
                
                <Field type="hidden" name="idClient" value={client0?.id} ref={fieldIdClient}/>
                <Field type="hidden" name="id" value={command0.id} />
                {command0.idClient != "" ? (
                  <>
                   <Field label="client0" value={client0?.design} />
                  </>
                ) : (
                  <Field
                    label="Client"
                    name="cococo"
                    as="select"
                    onChange={
                      (e:ChangeEvent<HTMLSelectElement>)=>{
                        let c:Client = JSON.parse(e.target.value)
                        setClient0(c)
                        //@ts-ignore
                        fieldIdClient.current.value=c.id
                      }
                    }
                  >
                  {[c0,...clients||[]].map((c:Client)=>(
                    <option value={JSON.stringify(c)}>{c.design}</option>
                  ))}
                  </Field>
                  
                )}
                <Field label="Date Commande" name="date" type="date"  />
             </div>
              <div className="float-left w-1/2">
              <Field type="hidden" name="adrLiv" ref={fieldAdressLiv} />
                <Field
                  label="Adress de livraison"
                  name="adrLiv555"
                  as="select"
                  optionLabelName="adress"
                  optionKeyName="adress"
                  options={[adr0,...client0?.adressLivs||[]]}
                  onChange={
                    (e:ChangeEvent<HTMLSelectElement>)=>{
                      //@ts-ignore
                      fieldAdressLiv.current.value=e.target.value+""
                    }
                  }
                />
               {/*   {[adr0,...client0?.adressLivs||[]].map((c:AdressLiv)=>(
                    <option value={JSON.stringify(c)}>{c.adress}</option>
                  ))}
                  </Field> */}
                <Field label="Saison" name="season" />
              </div>
              <Bsave className="float-right mt-2 b-ajust-r" onClick={() => {
                
          setTimeout(() => {
            refetch()
            close();
          }, 600);
        }} />
              </>
          
  
      </Form>
      <Bcancel
        className="float-right mt-2 b-ajust"
        onClick={() => {
          close();
        }}
      />
     {command0.id!="" && <NavTabs tab={commanndes} /> }
    </Modal>
  );
};

export default forwardRef(FormCommande);
