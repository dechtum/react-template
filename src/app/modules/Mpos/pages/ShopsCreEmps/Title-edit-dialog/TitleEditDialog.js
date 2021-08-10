import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import { TitleDialogHeader } from "./TitleDialogHeader";
import { TitleForm } from "./TitleEditForm";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";

export function TitleDialog({ id, show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      initShopsCreEmp: ShopsCreEmpsUIContext.initShopsCreEmp,
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ShopsCreEmpForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ShopsCreEmps.actionsLoading,
      ShopsCreEmpForEdit: state.ShopsCreEmps.ShopsCreEmpForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ShopsCreEmp by id
    dispatch(actions.fetchShopsCreEmp(id));
  }, [id, dispatch]);

  // server request for saving ShopsCreEmp
  const saveShopsCreEmp = (ShopsCreEmp) => {
    if (!id) {
      // server request for creating ShopsCreEmp
      dispatch(actions.createShopsCreEmp(ShopsCreEmp)).then(() => onHide());
    } else {
      // server request for updating ShopsCreEmp
      dispatch(actions.updateShopsCreEmp(ShopsCreEmp)).then(() => onHide());
    }
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <TitleDialogHeader id={id} />
      <TitleForm
        saveShopsCreEmp={saveShopsCreEmp}
        actionsLoading={actionsLoading}
        ShopsCreEmp={ShopsCreEmpForEdit || ShopsCreEmpsUIProps.initShopsCreEmp}
        onHide={onHide}
      />
    </Modal>

  );
}
