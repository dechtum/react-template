import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PuyMats/PuyMatsActions";
import { PuyMatEditDialogHeader } from "./PuyMatEditDialogHeader";
import { PuyMatEditForm } from "./PuyMatEditForm";
import { usePuyMatsUIContext } from "../PuyMatsUIContext";

export function ScanDialog({ id, show, onHide }) {
  // PuyMats UI Context
  const PuyMatsUIContext = usePuyMatsUIContext();
  const PuyMatsUIProps = useMemo(() => {
    return {
      initPuyMat: PuyMatsUIContext.initPuyMat,
    };
  }, [PuyMatsUIContext]);

  // PuyMats Redux state
  const dispatch = useDispatch();
  const { actionsLoading, PuyMatForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.PuyMats.actionsLoading,
      PuyMatForEdit: state.PuyMats.PuyMatForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting PuyMat by id
    dispatch(actions.fetchPuyMat(id));
  }, [id, dispatch]);

  // server request for saving PuyMat
  const savePuyMat = (PuyMat) => {
    if (!id) {
      // server request for creating PuyMat
      dispatch(actions.createPuyMat(PuyMat)).then(() => onHide());
    } else {
      // server request for updating PuyMat
      dispatch(actions.updatePuyMat(PuyMat)).then(() => onHide());
    }
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PuyMatEditDialogHeader id={id} />
      <PuyMatEditForm
        savePuyMat={savePuyMat}
        actionsLoading={actionsLoading}
        PuyMat={PuyMatForEdit || PuyMatsUIProps.initPuyMat}
        onHide={onHide}
      />
    </Modal>

  );
}
