import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function PuyMatEditDialogHeader({ id }) {
  // PuyMats Redux state
  const { PuyMatForEdit, actionsLoading } = useSelector(
    (state) => ({
      PuyMatForEdit: state.PuyMats.PuyMatForEdit,
      actionsLoading: state.PuyMats.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  let til = useLang()=='en'?'Unit':'หน่วยนับ';
  // Title couting
  useEffect(() => {
    let _title = id ? "" :til;
    if (PuyMatForEdit && id) {
      _title = `${til} '${PuyMatForEdit.firstName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [PuyMatForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
