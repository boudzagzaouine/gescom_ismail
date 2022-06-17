import axios from "axios";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { code0 } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bdel from "widgets/Bdel";
import Modal from "widgets/Modal";
import { useDeleteAvoirMutation } from "../rtk/rtkAvoir";
type DeleteAvoirPorp = {
    id: string;
};
const DeleteAvoir = ({ id }: DeleteAvoirPorp, ref: Ref<void>) => {
    const [del] = useDeleteAvoirMutation();
    const [id0, setId0] = useState(id);
    //@ts-ignore
    const { register, handleSubmit } = useForm<string>({
        defaultValues: { id0 },
    });
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
    const [showModal, setShowModal] = React.useState(false);
    const delTemp = () => {
        axios.delete(process.env.NEXT_PUBLIC_URL + "/avoirs/" + id0).then(() => { });
    };
    return (
        <>
            <Modal title={"suppression"} show={showModal} format={5} close={close}>
                <h2>suppression de avoir num: {id0}</h2>
                <Form
                    defaultValues={code0}
                    onSubmit={delTemp}
                >
                    <Field
                        type="hidden"
                        name="id"
                    />

                    <Bdel
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
                /></Modal>
        </>
    );
};

export default forwardRef(DeleteAvoir);
