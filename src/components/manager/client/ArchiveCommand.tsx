import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import { STYLE_ICON } from "tools/constStyle";
import Bcancel from "widgets/Bcancel";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Modal from "widgets/Modal";
import { Field, Form } from "widgets";
import { code0 } from "tools/types";
import Barchive from "widgets/Barchive";
import { useArchiveCommandeMutation } from "config/rtk/RtkCommande";
//signature :abd 27/05-2022 08:57
type ArchiveCommandPorp = {
  id: string;
};
const ArchiveCommand = ({ id }: ArchiveCommandPorp, ref: Ref<void>) => {
  const [id0, setId0] = useState(id);
  //@ts-ignore
  const { register, handleSubmit } = useForm<string>({
    defaultValues: { id0 },
  });
  const [archive] = useArchiveCommandeMutation();
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
      .patch(process.env.NEXT_PUBLIC_URL+"/commandes/" + id0 + "/archive")
      .then(() => {});
  };
  return (
    <>
      <Modal title={"archivage"} show={showModal} format={5} close={close}>
         <h2>archivage du command num: {id0}</h2>
          <Form
            defaultValues={code0}
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

export default forwardRef(ArchiveCommand);
