
import { openAdressLivsByIdClient } from 'config/rtk/RtkAdressLiv';
import React, { forwardRef, Ref, useEffect, useState } from 'react';
import { ArticleFacture, Facture } from 'tools/types';
import { Field, Form } from 'widgets';
import Modal from 'widgets/Modal';
type FormArticleFactureProp = {
    article: ArticleFacture
    facture: Facture
    refetchList: () => void
    add: () => void
    edit: () => void
}
const FormArticleFactureFacture = ({ article, add, edit, refetchList, facture }: FormArticleFactureProp, ref: Ref<void>) => {
    const [showModal, setShowModal] = useState(false);
    const [article0, setArticle0] = useState(article);
    const [facture0, setFacture0] = useState(facture)
    const [openCalendar, setOpenCalendar] = useState(false);
    const openModal = (c: ArticleFacture, cl: Facture) => {
        setArticle0(c);
        setFacture0(cl)
        setShowModal(true);
    };
    const save = article0.id == "" ? add : edit;
    const close = () => {
        setShowModal(false);
    };
    useEffect(() => {
        //@ts-ignore
        ref.current = openModal;
    })

    return (
        <Modal close={close} format={5} show={showModal} title={article0.id === "" ? "Nouvelle articlee" : "Mise à jour de la articlee"} >
            <Form defaultValues={article0} >
                <Field label="Client" value={facture0?.design} />
            </Form>
        </Modal>
    )
}

export default forwardRef(FormArticleFactureFacture)