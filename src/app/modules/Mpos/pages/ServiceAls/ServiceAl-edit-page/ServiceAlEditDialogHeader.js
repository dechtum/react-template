import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function ServiceAlEditDialogHeader({ id,onHide }) {
  // ServiceAls Redux state
  const { ServiceAlForEdit, actionsLoading } = useSelector(
    (state) => ({
      ServiceAlForEdit: state.ServiceAls.ServiceAlForEdit,
      actionsLoading: state.ServiceAls.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  let _title = useLang()=='en'?'Report a problem':'แจังปัญหา';
  // Title couting
  useEffect(() => {    
    if (ServiceAlForEdit && id) {
      _title = `ServiceAl '${ServiceAlForEdit.firstName} ${ServiceAlForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ServiceAlForEdit, actionsLoading]);

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
