import axios from "axios";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import { code0 } from "tools/types";
import { Field, Form } from "widgets";
import Barchive from "widgets/Barchive";
import Bcancel from "widgets/Bcancel";
import Modal from "widgets/Modal";
import { useArchiveAvoirMutation } from "./rtkAvoir";
//signature :abd 27/05-2022 08:57
type ArchiveAvoirProp = {
    id: string;
};
const ArchiveAvoir = ({ id }: ArchiveAvoirProp, ref: Ref<void>) => {
    const [id0, setId0] = useState(id);
    //@ts-ignore
    const { register, handleSubmit } = useForm<string>({
        defaultValues: { id0 },
    });
    const [archive] = useArchiveAvoirMutation();
    const [showModal, setShowModal] = React.useState(false);
    const openModal = (i: string) => {
        setId0(i);
        setShowModal(true);
    };
    const close = () => {
        setShowModal(false);
    };
    useEffect(() => {
        //@ts-ignore
        ref.current = openModal;
    });
    const archiveTemp = () => {
        axios
            .patch(process.env.NEXT_PUBLIC_URL + "/avoirs/" + id0 + "/archive")
            .then(() => { });
    };
    return (
        <>
            <Modal title={"archivage"} show={showModal} format={5} close={close}>
                <h2>archivage du avoir num: {id0}</h2>
                <Form
                    defaultValues={code0}
                    onSubmit={archiveTemp}
                >
                    <Field
                        type="hidden"
                        name="id"
                    />

                    <Barchive
                        type="submit"
                        className="float-right mt-5 b-ajust-r"
                        onClick={() => {
                            setTimeout(() => {
                                close();
                            }, 500);
                        }}
                    />
                </Form>
                <Bcancel
                    className="float-right mt-5 b-ajust"
                    onClick={() => {
                        close();
                    }}
                />
            </Modal>
        </>
    );
};

export default forwardRef(ArchiveAvoir);
