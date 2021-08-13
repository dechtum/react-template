import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function PuySupEditDialogHeader({ id,onHide }) {
  // PuySups Redux state
  const { PuySupForEdit, actionsLoading } = useSelector(
    (state) => ({
      PuySupForEdit: state.PuySups.PuySupForEdit,
      actionsLoading: state.PuySups.actionsLoading,
    }),
    shallowEqual
  );

  let til = useLang()=='en'?"New supplier":"เพิ่ม ซัพพลายเออร์";
  let tilE = useLang()=='en'?"Edit supplier":"แก้ไข ซัพพลายเออร์";
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" :til;
    if (PuySupForEdit && id) {
      _title = `${tilE} '${PuySupForEdit.firstName} ${PuySupForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [PuySupForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      {/* closeButton */}
      <Modal.Header >
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
        <a className="hover" onClick={onHide}>{useLang()=='en'?"back":"ย้อนกลับ"}</a>
      </Modal.Header>
    </>
  );
}
