import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function ReciveEditDialogHeader({ id }) {
  // PuyPurs Redux state
  const { PuyPurForEdit, actionsLoading } = useSelector(
    (state) => ({
      PuyPurForEdit: state.PuyPurs.PuyPurForEdit,
      actionsLoading: state.PuyPurs.actionsLoading,
    }),
    shallowEqual
  );


  let til = useLang()=='en'?"Edit Recive":"สร้างใบรับสินค้า";
  let tilE = useLang()=='en'?"Edit Recive":"แก้ไขใบรับสินค้า";
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : til;
    if (PuyPurForEdit && id) {
      _title = `${tilE} '${PuyPurForEdit.firstName} ${PuyPurForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [PuyPurForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
