
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Modal from 'widgets/Modal';
import { useArchiveFactureMutation } from "../rtk/rtkFacture";
type ArchiveFacturePorp = {
    id: string;
};
const ArchiveFacture = ({ id }: ArchiveFacturePorp, ref: Ref<void>) => {
    const [id0, setId0] = useState(id);
    //@ts-ignore
    const { register, handleSubmit } = useForm<string>({
        defaultValues: { id0 },
    });
    const [archive] = useArchiveFactureMutation();
    const [showModal, setShowModal] = React.useState(false);
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

    return (
        <>
            <Modal title={"archivage"} show={showModal} format={5} close={close}  >
                <div>
                    <h2>archivage du Facture num: {id0}</h2>
                    <form
                        onSubmit={
                            //@ts-ignore
                            handleSubmit(archive)
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
                            Archiver
                        </Bcyan>
                    </form>
                    <Bred
                        className="mt-2 float-right"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        Annuler
                    </Bred>
                </div>
            </Modal>
        </>
    );
};

export default forwardRef(ArchiveFacture);
