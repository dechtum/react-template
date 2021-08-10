import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function TitleDialogHeader({ id }) {
  // ShopsCreEmps Redux state
  const { ShopsCreEmpForEdit, actionsLoading } = useSelector(
    (state) => ({
      ShopsCreEmpForEdit: state.ShopsCreEmps.ShopsCreEmpForEdit,
      actionsLoading: state.ShopsCreEmps.actionsLoading,
    }),
    shallowEqual
  );

  let til = useLang()=='en'?"Edit Prefix":"เพิ่ม คำนำหน้า";
  let tilE = useLang()=='en'?"Edit Prefix":"แก้ไข คำนำหน้า";
  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : til;
    if (ShopsCreEmpForEdit && id) {
      _title = `${tilE} '${ShopsCreEmpForEdit.firstName} ${ShopsCreEmpForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ShopsCreEmpForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
