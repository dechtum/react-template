import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function PuyMatEditDialogHeader({ id,onHide }) {
  // PuyMats Redux state
  const { PuyMatForEdit, actionsLoading } = useSelector(
    (state) => ({
      PuyMatForEdit: state.PuyMats.PuyMatForEdit,
      actionsLoading: state.PuyMats.actionsLoading,
    }),
    shallowEqual
  );

  let til = useLang()=='en'?"New Material":"เพิ่ม วัตถุดิบ";
  let tilE = useLang()=='en'?"Edit Material":"แก้ไข วัตถุดิบ";
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" :til;
    if (PuyMatForEdit && id) {
      _title = `${tilE} '${PuyMatForEdit.firstName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [PuyMatForEdit, actionsLoading]);

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
