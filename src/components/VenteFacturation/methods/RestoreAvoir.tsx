import axios from "axios";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { code0 } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Brestore from "widgets/Brestore";
import Modal from "widgets/Modal";
import { useRestoreAvoirMutation } from "../rtk/rtkAvoir";
type RestoreAvoirPorp = {
    id: string;
};
const RestoreAvoir = ({ id }: RestoreAvoirPorp, ref: Ref<void>) => {
    const [id0, setId0] = useState(id);
    //@ts-ignore
    const { register, handleSubmit } = useForm<string>({
        defaultValues: { id0 },
    });
    const [restore] = useRestoreAvoirMutation();
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
    const restoreTemp = () => {
        axios
            .patch(process.env.NEXT_PUBLIC_URL + "/avoirs/" + id0 + "/restore")
            .then(() => { });
    };
    return (
        <>
            <Modal title={"restoration"} show={showModal} format={5} close={close}>
                <h2>restoration du avoir num: {id0}</h2>
                <Form
                    defaultValues={code0}
                    onSubmit={restoreTemp}
                >
                    <Field
                        type="hidden"
                        name="id"
                    />

                    <Brestore
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

export default forwardRef(RestoreAvoir);
