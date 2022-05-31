import axios from "axios";
import { useArchiveDeviseMutation } from "config/rtk/rtkDevise";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import { Field, Form } from "widgets";
import Barchive from "widgets/Barchive";
import Bcancel from "widgets/Bcancel";
import Modal from "widgets/Modal";
type ArchiveDevisePorp = {
  id: string;
};
const ArchiveDevise = ({ id }: ArchiveDevisePorp, ref: Ref<void>) => {
  const [id0, setId0] = useState(id);
  //@ts-ignore
  const { register, handleSubmit } = useForm<string>({
    defaultValues: { id0 },
  });
  const [archive] = useArchiveDeviseMutation();
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
      .patch(process.env.NEXT_PUBLIC_URL + "/devises/" + id0 + "/archive")
      .then(() => { });
  };

  return (
    <>
      <Modal title={"archivage"} show={showModal} format={5} close={close}>

        <h2>archivage du Devise num: {id0}</h2>
        <Form
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

export default forwardRef(ArchiveDevise);
