import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import { ShopsCreEmpEditDialogHeader } from "./ShopsCreEmpEditDialogHeader";
import { ShopsCreEmpEditForm } from "./ShopsCreEmpEditForm";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import {update} from './../../../__mocks__/ShopsCreshops/mockShopsCreshopLib'

export function ShopsCreEmpEditPage({ id, show, onHide }) {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      initShopsCreEmp: ShopsCreEmpsUIContext.initShopsCreEmp,
    };
  }, [ShopsCreEmpsUIContext]);

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ShopsCreEmpForEdit,auth } = useSelector(
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
  const saveShopsCreEmp = (ShopsCreEmp,setOnsave) => {
   
   
    if (!id) {
      // server request for creating ShopsCreshop
      new Promise((r,j)=>{        
        update('',auth.authToken,auth.user.id,ShopsCreEmp,r)
      })
      .then((v)=>{
        setOnsave(false)
        dispatch(actions.createShopsCreEmp(v)).then(() => onHide());
      })
      
    } else {
      // server request for updating ShopsCreshop
      new Promise((r,j)=>{        
        update(id,auth.authToken,auth.user.id,ShopsCreEmp,r)
      })
      .then((v)=>{
        setOnsave(false)
        dispatch(actions.updateShopsCreEmp(v)).then(() => onHide());
      })
      
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <ShopsCreEmpEditForm
        saveShopsCreEmp={saveShopsCreEmp}
        actionsLoading={actionsLoading}
        ShopsCreEmp={ShopsCreEmpForEdit || ShopsCreEmpsUIProps.initShopsCreEmp}
        onHide={onHide}
        id={id}
        useLang={useLang()}
        auth={auth}
      />
    </div>
   
  );
}
