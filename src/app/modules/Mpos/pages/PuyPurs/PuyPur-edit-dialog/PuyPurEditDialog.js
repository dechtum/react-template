import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PuyPurs/PuyPursActions";
import { PuyPurEditDialogHeader } from "./PuyPurEditDialogHeader";
import { PuyPurEditForm } from "./PuyPurEditForm";
import { usePuyPursUIContext } from "../PuyPursUIContext";

export function PuyPurEditDialog({ id, show, onHide }) {
  // PuyPurs UI Context
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      initPuyPur: PuyPursUIContext.initPuyPur,
    };
  }, [PuyPursUIContext]);

  // PuyPurs Redux state
  const dispatch = useDispatch();
  const { actionsLoading, PuyPurForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.PuyPurs.actionsLoading,
      PuyPurForEdit: state.PuyPurs.PuyPurForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting PuyPur by id
    dispatch(actions.fetchPuyPur(id));
  }, [id, dispatch]);

  // server request for saving PuyPur
  const savePuyPur = (PuyPur) => {
    if (!id) {
      // server request for creating PuyPur
      dispatch(actions.createPuyPur(PuyPur)).then(() => onHide());
    } else {
      // server request for updating PuyPur
      dispatch(actions.updatePuyPur(PuyPur)).then(() => onHide());
    }
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PuyPurEditDialogHeader id={id} />
      <PuyPurEditForm
        savePuyPur={savePuyPur}
        actionsLoading={actionsLoading}
        PuyPur={PuyPurForEdit || PuyPursUIProps.initPuyPur}
        onHide={onHide}
      />
    </Modal>

  );
}
