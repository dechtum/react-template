import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import { PositionDialogHeader } from "./PositionDialogHeader";
import { PositionForm } from "./PositionEditForm";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";
import {Update} from '../../../__mocks__/center/mockPositionLib'
import PositionTableMock from './../../../__mocks__/center/PositionTableMock'

export function PositionDialog({ id, show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      initShopsCreEmp: ShopsCreEmpsUIContext.initShopsCreEmp,
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ShopsCreEmpForEdit ,auth} = useSelector(
    (state) => ({
      actionsLoading: state.ShopsCreEmps.actionsLoading,
      ShopsCreEmpForEdit: state.ShopsCreEmps.ShopsCreEmpForEdit,
      auth:state.auth
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ShopsCreEmp by id
    dispatch(actions.fetchShopsCreEmp(id));
  }, [id, dispatch]);

  // server request for saving ShopsCreEmp
  const saveShopsCreEmp = (ShopsCreEmp) => {
    new Promise((r,j)=>{
      Update('',auth.user.id,auth.authToken,ShopsCreEmp, r );
    })
    .then((v)=>{
      console.log(v);   
      if(v!=false){
        PositionTableMock.push({
          ...ShopsCreEmp,
          id:v
        });
        onHide();
      }
      
    })
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-Position-lg"
    >
      <PositionDialogHeader id={id} />
      <PositionForm
        saveShopsCreEmp={saveShopsCreEmp}
        actionsLoading={actionsLoading}
        ShopsCreEmp={ShopsCreEmpForEdit || ShopsCreEmpsUIProps.initShopsCreEmp}
        onHide={onHide}
      />
    </Modal>

  );
}
