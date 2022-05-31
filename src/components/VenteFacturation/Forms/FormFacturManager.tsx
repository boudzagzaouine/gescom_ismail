
import { useAddFactureMutation, useEditFactureMutation } from "config/rtk/rtkFacture";
import React, { useEffect, useRef, useState } from "react";
import {
    INCOTERM,
    MODEREGELEMENT,
    REQUEST_EDIT,
    REQUEST_SAVE,
    CLIENT
} from "tools/consts";
import { Facture } from 'tools/types';
import { Field, Form } from "widgets";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Section from "widgets/Section";

type FormFactureManagerProp = {
    closed: () => void;
    Facture: Facture;
    request: number;
    disable: boolean;
    imputFocus: any
};
const FormFactureManager = ({
    closed,
    Facture,
    request,
    disable,
}: FormFactureManagerProp) => {
    const [save] = useAddFactureMutation();
    const [edit] = useEditFactureMutation();
    const onSubmit =
        request == REQUEST_SAVE ? save : request == REQUEST_EDIT ? edit : undefined;
    const [disabled, setDisabled] = useState(disable);
    const text = "nouveau"
    const text1 = "modifier"
    const imputFocus = useRef(null)
    useEffect(() => {
        /*  @ts-ignore*/
        imputFocus.current.focus()
    }, [])
    return (
        <Section>
            <div className="float-left w-full text-xs">
                {/*  @ts-ignore*/}
                <Form defaultValues={Facture} onSubmit={onSubmit}>
                    {request == REQUEST_SAVE ? <h1 className="mb-2">{text} facture </h1> : <h1 className="mb-2">{text1} facture </h1>}

                    <div className="float-left w-5/6">
                        <div className="float-left w-1/2">
                            {request == REQUEST_EDIT && <Field type="hidden" name="id" />}
                            <Field ref={imputFocus} label="NumFacture" name="NumFacture" disabled={disabled} />
                            <Field
                                label="client"
                                name="client"
                                options={CLIENT}
                                as="select"
                                disabled={disabled}
                            />
                            <Field label="date" name="date" disabled={disabled} />
                            <Field label="tva" name="tva" disabled={disabled} />
                        </div>
                        <div className="float-right w-1/2">
                            <Field
                                label="incoterm"
                                name="incoterm"
                                options={INCOTERM}
                                as="select"
                                disabled={disabled}
                            />
                            <Field
                                label="mode de regelement"
                                name="moderegelement"
                                options={MODEREGELEMENT}
                                as="select"
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="float-left w-full mt-1">
                        {!disabled && (
                            <Bcyan
                                className="float-left"
                                onClick={() => {
                                    setTimeout(() => {
                                        closed();
                                    }, 500);
                                }}
                            >
                                sauvegarder
                            </Bcyan>
                        )}
                        {!disabled && request == REQUEST_SAVE && (
                            <Bcyan className="float-left" type="submit">
                                sauvegarder && nouveau
                            </Bcyan>
                        )}
                    </div>
                </Form>
                <Bred
                    className="float-right"
                    onClick={() => {
                        closed();
                    }}
                >
                    Annuler
                </Bred>
                {disabled && (
                    <Bcyan
                        className="float-right"
                        onClick={() => {
                            setDisabled(false);
                        }}
                    >
                        modifier
                    </Bcyan>
                )}
            </div>
        </Section>
    );
};

export default FormFactureManager;
