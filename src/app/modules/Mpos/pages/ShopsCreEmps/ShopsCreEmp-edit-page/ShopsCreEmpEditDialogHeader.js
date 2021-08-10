import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function ShopsCreEmpEditDialogHeader({ id,onHide }) {
  // ShopsCreEmps Redux state
  const { ShopsCreEmpForEdit, actionsLoading } = useSelector(
    (state) => ({
      ShopsCreEmpForEdit: state.ShopsCreEmps.ShopsCreEmpForEdit,
      actionsLoading: state.ShopsCreEmps.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  let til = useLang()=='en'?"Edit Employee":"เพิ่ม พนักงาน";
  let tilE = useLang()=='en'?"Edit Employee":"แก้ไข พนักงาน";
  // Title couting
  useEffect(() => {
    let _title = id ? "" : `${til}`;
    if (ShopsCreEmpForEdit && id) {
      _title = `${til} '${ShopsCreEmpForEdit.firstName} ${ShopsCreEmpForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ShopsCreEmpForEdit, actionsLoading]);

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
