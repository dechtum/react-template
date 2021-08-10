import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function PositionDialogHeader({ id }) {

  // ShopsCreEmps Redux state
  const { ShopsCreEmpForEdit, actionsLoading } = useSelector(
    (state) => ({
      ShopsCreEmpForEdit: state.ShopsCreEmps.ShopsCreEmpForEdit,
      actionsLoading: state.ShopsCreEmps.actionsLoading,
    }),
    shallowEqual
  );

  let til = useLang()=='en'?"Edit Position":"เพิ่ม ตำแหน่งงาน";
  let tilE = useLang()=='en'?"Edit Position":"แก้ไข ตำแหน่งงาน";
  const [Position, setPosition] = useState("");
  // Position couting
  useEffect(() => {
    let _Position = id ? "" : til;
    if (ShopsCreEmpForEdit && id) {
      _Position = `${tilE} '${ShopsCreEmpForEdit.firstName}'`;
    }

    setPosition(_Position);
    // eslint-disable-next-line
  }, [ShopsCreEmpForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-Position-lg">{Position}</Modal.Title>
      </Modal.Header>
    </>
  );
}
