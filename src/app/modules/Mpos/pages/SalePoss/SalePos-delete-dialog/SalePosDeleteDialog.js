import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/SalePoss/SalePossActions";
import {useSalePossUIContext} from "../SalePossUIContext";

export function SalePosDeleteDialog({ id, show, onHide }) {
  // SalePoss UI Context
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      setIds: SalePossUIContext.setIds,
      queryParams: SalePossUIContext.queryParams
    };
  }, [SalePossUIContext]);

  // SalePoss Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.SalePoss.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteSalePos = () => {
    // server request for deleting SalePos by id
    dispatch(actions.deleteSalePos(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchSalePoss(SalePossUIProps.queryParams));
      // clear selections list
      SalePossUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          SalePos Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this SalePos?</span>
        )}
        {isLoading && <span>SalePos is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteSalePos}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
