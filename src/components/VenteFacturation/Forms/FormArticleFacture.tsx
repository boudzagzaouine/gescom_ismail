import React, { forwardRef, Ref, useEffect, useState } from 'react';
import { ArticleFacture, Facture } from 'tools/types';
import { Field, Form } from 'widgets';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';
import Bupdate from 'widgets/Bupdate';
import Modal from 'widgets/Modal';
import Required from 'widgets/Required';

type FormArticleFactureProp = {
    article: ArticleFacture
    facture: Facture

    refetchList: () => void
    add: () => void
    edit: () => void
    disabled: boolean
}
const FormArticleFacture = ({ article, add, edit, refetchList, facture, disabled }: FormArticleFactureProp, ref: Ref<void>) => {
    const [showModal, setShowModal] = useState(false);
    const [article0, setArticle0] = useState(article);
    const [facture0, setFacture0] = useState(facture)
    const [disabled0, setDisabled0] = useState(disabled)
    const openModal = (c: ArticleFacture, cl: Facture, disabled: boolean) => {
        setArticle0(c);
        setFacture0(cl)
        setShowModal(true);
        setDisabled0(disabled)
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
        <Modal close={close} format={5} show={showModal} title={article0.id == "" ? "Novelle article facture" : "article facture :" + facture0.NumFacture}  >

            <Form defaultValues={article0} onSubmit={save} >


                <div >

                    <Field disabled={true} label={<Required msg="Facture" />} value={facture0?.id} />
                    <Field label={<Required msg="designation" />} name="designation" disabled={disabled} />
                    <Field label={<Required msg="quantité" />} name="quantité" disabled={disabled} />
                    <Field label={<Required msg="prix unitaire" />} name="prixUnitaire" disabled={disabled} />
                </div>

                <div className="float-left w-full mt-1">
                    {!disabled0 && (
                        <Bsave
                            className="float-right b-ajust-r"
                            onClick={() => {
                                setTimeout(() => {
                                    refetchList();
                                    close();
                                }, 500);
                            }}
                        />
                    )}
                </div>
            </Form>
            {!disabled0 && (
                <Bcancel
                    className={
                        "float-right b-ajust " + (article0.id == "" && "b-ajustf")
                    }
                    onClick={() => {
                        if (article0.id != "")
                            setDisabled0(true);
                        else close()
                    }}
                />
            )}

            {disabled0 && (
                <Bupdate
                    className="float-right"
                    onClick={() => {
                        setDisabled0(false);
                    }}
                />
            )}

        </Modal>
    )
}

export default forwardRef(FormArticleFacture)