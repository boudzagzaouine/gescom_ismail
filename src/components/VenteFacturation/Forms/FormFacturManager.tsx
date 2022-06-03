import { openClients } from "config/rtk/RtkClient";
import { useAddFactureMutation, useEditFactureMutation } from "config/rtk/rtkFacture";
import { openIncoterms } from "config/rtk/rtkIncoterm";
import { openPayementModes } from "config/rtk/rtkPayementMode";
import React, { useState } from "react";
import {
    REQUEST_EDIT,
    REQUEST_SAVE
} from "tools/consts";
import { c0, Client, Facture, Incoterm, incoterm0, PayementMode, payementMode0 } from "tools/types";
import { Field, Form } from "widgets";
import Avatar from "widgets/Avatar";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import Bupdate from "widgets/Bupdate";
import Required from "widgets/Required";
import Section from "widgets/Section";
import ShowCheckedsField from "widgets/ShowCheckedsField";
import Title from "widgets/Title";
import Xclose from "widgets/Xclose";
import ListFacturation from "../Lists/ListFacturation";
//14:28
type FormFactureManagerProp = {
    closed: () => void;
    facture: Facture;
    request: number;
    disable: boolean;
    refetch: () => void;
}; //
const FormFactureManager = ({
    closed,
    facture,
    request,
    disable,
    refetch,
}: FormFactureManagerProp) => {
    const [save] = useAddFactureMutation();
    const [edit] = useEditFactureMutation();
    const tabClients: Client[] = openClients().data.content;
    const tabIncoterms: Incoterm[] = openIncoterms().data.content;
    const tabPayementModes: PayementMode[] = openPayementModes().data.content;
    const clients: string[] = tabClients?.map((d) => d.design);
    const incoterms = tabIncoterms?.map((d) => d.code);
    const payementModes = tabPayementModes?.map((d) => d.code);
    const onSubmit =
        request == REQUEST_SAVE ? save : request == REQUEST_EDIT ? edit : undefined;
    const [disabled, setDisabled] = useState(disable);
    return (
        <Section>
            <Xclose close={closed} />
            <div className="float-left w-full text-xs">
                <Form defaultValues={facture} onSubmit={onSubmit}>
                    <Title msg="facture" id={facture.id} edit={disabled} />
                    <div className="float-left w-5/6">
                        <div className="float-left w-1/2">
                            {request == REQUEST_EDIT && (
                                <Field type="hidden" name="id" />
                            )}
                            <Field label={<Required msg="Numero facture" />} name="NumFacture" disabled={disabled} />
                            <Field label="Date facture" name="date" disabled={disabled} />
                            <Field label="email" name="email" disabled={disabled} />
                            <Field
                                label={<Required msg="client" />}
                                name="client"
                                options={[c0, ...(clients || [])]}
                                as="select"
                                disabled={disabled}
                            />
                            <Field label={<Required msg="TVA" />} name="tva" disabled={disabled} />
                        </div>
                        <div className="float-left w-1/2">

                            <Field
                                label={<Required msg="incoterm" />}
                                name="incoterm"
                                options={[incoterm0, ...(incoterms || [])]}
                                as="select"
                                disabled={disabled}
                                optionKeyName="code"
                                optionLabelName="code"
                            />
                            <Field
                                label={<Required msg="mode de règlement" />}
                                name="paymentChoice"
                                options={[payementMode0, ...(payementModes || [])]}
                                as="select"
                                disabled={disabled}
                                optionKeyName="code"
                                optionLabelName="code"
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
                            if (facture.id != "")
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
            {facture.id != "" && (
                <ListFacturation facture={facture} refetch={refetch} />
            )}
        </Section>
    );
};

export default FormFactureManager;
