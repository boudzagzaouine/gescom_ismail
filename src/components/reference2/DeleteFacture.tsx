import { TrashIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useDeleteFactureMutation } from "config/rtk/rtkFacture";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { STYLE_ICON } from "tools/constStyle";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Modal from "widgets/Modal";
type DeleteFacturePorp = {
    refetch: () => void
    id: string;
};
const DeleteFacture = ({ id, refetch }: DeleteFacturePorp, ref: Ref<void>) => {
    const [del] = useDeleteFactureMutation();
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
    }
    useEffect(() => {
        //@ts-ignore
        ref.current = openModal;
    });
    const [showModal, setShowModal] = React.useState(false);
    const delTemp = () => {
        axios.delete("http://localhost:1000/api/v1/factures/" + id0).then(() => { });
    };
    return (
        <>
            <Modal title={"suppression"} show={showModal} format={5} close={close}>
                <div>
                    <h2>suppression de document num: {id0}</h2>
                    <form
                        onSubmit={
                            //@ts-ignore
                            handleSubmit(delTemp)
                        }
                    >
                        {" "}
                        <input type="hidden" {...register("id")} />
                        <Bcyan
                            type="submit"
                            className="mt-2 float-right"
                            onClick={() => {

                                setTimeout(() => {
                                    refetch()
                                    setShowModal(false);
                                }, 500);
                            }}
                        >
                            Supprimer
                        </Bcyan>
                        <Bred
                            className="mt-2 float-right"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Annuler
                        </Bred>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default forwardRef(DeleteFacture);
