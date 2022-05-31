import axios from "axios";
import { useDeletePaysMutation } from "config/rtk/rtkPays";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bdel from "widgets/Bdel";
import Modal from "widgets/Modal";
type DeletePaysPorp = {
  refetch: () => void;
  id: string;
};
const DeletePays = ({ id, refetch }: DeletePaysPorp, ref: Ref<void>) => {
  const [del] = useDeletePaysMutation();
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
    axios.delete(process.env.NEXT_PUBLIC_URL + "/pays/" + id0).then(() => { });
  };
  return (
    <>
      <Modal title={"suppression"} show={showModal} format={5} close={close}>

        <h2>suppression de document num: {id0}</h2>
        <Form
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
        />
      </Modal>
    </>
  );
};

export default forwardRef(DeletePays);
