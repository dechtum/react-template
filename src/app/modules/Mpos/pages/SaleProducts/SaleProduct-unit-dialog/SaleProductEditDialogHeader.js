import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function SaleProductEditDialogHeader({ id }) {
  // SaleProducts Redux state
  const { SaleProductForEdit, actionsLoading } = useSelector(
    (state) => ({
      SaleProductForEdit: state.SaleProducts.SaleProductForEdit,
      actionsLoading: state.SaleProducts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting

  let _title = useLang()=='en'?"Add Unit":"เพิ่ม หน่วยนับ";
  useEffect(() => {
    // if (SaleProductForEdit && id) {
    //   _title = `เพิ่ม กลุ่ม`;
    // }

    setTitle(_title);
    // eslint-disable-next-line
  }, [SaleProductForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
