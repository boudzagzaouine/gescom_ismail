import axios from "axios";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Modal from "widgets/Modal";
import { useDeleteFactureMutation } from "../rtk/rtkFacture";
type DeleteFacturePorp = {
   
    id: string;
};
const DeleteFacture = ({ id }: DeleteFacturePorp, ref: Ref<void>) => {
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
