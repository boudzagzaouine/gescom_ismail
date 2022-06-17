
import { useAddAvoirMutation, useEditAvoirMutation } from "components/VenteFacturation/rtk/rtkAvoir";
import { openClients } from "config/rtk/RtkClient";
import React, { useState } from "react";
import {
  REQUEST_EDIT,
  REQUEST_SAVE
} from "tools/consts";
import { a0, Avoir, Client } from "tools/types";
import { Field, Form } from "widgets";
import Avatar from "widgets/Avatar";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import Bupdate from "widgets/Bupdate";
import Section from "widgets/Section";
import Xclose from "widgets/Xclose";
import ListFacturation from "../Lists/ListFacturation";
type FormAvoirManagerProp = {
  closed: () => void;
  avoir: Avoir;
  request: number;
  disable: boolean;
  refetch: () => void;
}; //
const FormAvoirManager = ({
  closed,
  avoir,
  request,
  disable,
  refetch,
}: FormAvoirManagerProp) => {
  const [save] = useAddAvoirMutation();
  const [edit] = useEditAvoirMutation();
  const tabClients: Client[] = openClients().data.content;
  const clients: string[] = tabClients?.map((d) => d.design);

  const onSubmit =
    request == REQUEST_SAVE ? save : request == REQUEST_EDIT ? edit : undefined;
  const [disabled, setDisabled] = useState(disable);
  return (
    <Section>
      <Xclose close={closed} />
      <div className="float-left w-full text-xs">
        <Form defaultValues={avoir} onSubmit={onSubmit}>
          <h1 className="mb-4">Nouveau avoir</h1>
          <div className="float-left w-5/6">
            <div className="float-left w-1/2">
              {request == REQUEST_EDIT && (
                <Field type="hidden" name="id" />
              )}
              <Field label="N° Facture" name="NumFacture" disabled={disabled} />
              <Field label="date avoir" name="date" disabled={disabled} />

            </div>
            <div className="float-left w-1/2">
              <Field
                label="Client"
                name="Client"
                options={[a0, ...(clients || [])]}
                as="select"
                disabled={disabled}
              />
            </div>
          </div>
          <div className="float-left w-1/6">
            <Avatar />
          </div>
          <div className="float-left w-full mt-1">
            {!disabled && (
              <Bsave
                className="float-right b-ajust-r"
                onClick={() => {
                  setTimeout(() => {
                    closed();
                  }, 500);
                }}
              />
            )}
          </div>
        </Form>
        {!disabled && (
          <Bcancel
            className={
              "float-right b-ajust " + (request == REQUEST_SAVE && "b-ajustf")
            }
            onClick={() => {
              if (avoir.id != "")
                setDisabled(true);
              else closed()
            }}
          />
        )}

        {disabled && (
          <Bupdate
            className="float-right"
            onClick={() => {
              setDisabled(false);
            }}
          />
        )}
      </div>

    </Section>
  );
};

export default FormAvoirManager;
