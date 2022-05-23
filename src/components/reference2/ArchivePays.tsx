import { ArchiveIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import { STYLE_ICON } from "tools/constStyle";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import { useArchivePaysMutation } from "config/rtk";
import Modal from "widgets/Modal";
type ArchivePaysPorp = {
    id: string;
};
const ArchivePays = ({ id }: ArchivePaysPorp, ref: Ref<void>) => {
    const [id0, setId0] = useState(id);
    //@ts-ignore
    const { register, handleSubmit } = useForm<string>({
        defaultValues: { id0 },
    });
    const [archive] = useArchivePaysMutation();
    const [showModal, setShowModal] = React.useState(false);
    const openModal = (i: string) => {
        setId0(i);
        setShowModal(true);
    };
    const close=()=>{
        setShowModal(false);
    }
    useEffect(() => {
        //@ts-ignore
        ref.current = openModal;
    });
    const archiveTemp = () => {
        axios
            .patch("https://gescom-api.frimakers.com//api/v1/pays/" + id0 + "/archive")
            .then(() => { });
    };
    return (
        <>
            <Modal title={"archivage"} show={showModal} format={5} close={close}>
                <div>
                    <h2>archivage du Pays num: {id0}</h2>
                    <form
                        onSubmit={
                            //@ts-ignore
                            handleSubmit(archiveTemp)
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

export default forwardRef(ArchivePays);
