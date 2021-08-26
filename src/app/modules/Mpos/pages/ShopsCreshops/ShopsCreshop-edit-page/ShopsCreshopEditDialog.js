import React, { useEffect, useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
import { ShopsCreshopEditDialogHeader } from "./ShopsCreshopEditDialogHeader";
import { ShopsCreshopEditForm } from "./ShopsCreshopEditForm";
import { useShopsCreshopsUIContext } from "../ShopsCreshopsUIContext";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import {update} from './../../../__mocks__/ShopsCreshops/mockShopsCreshopLib'

export function ShopsCreshopEditPage({ id, show, onHide }) {
  // ShopsCreshops UI Context
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      initShopsCreshop: ShopsCreshopsUIContext.initShopsCreshop,
    };
  }, [ShopsCreshopsUIContext]);

  // ShopsCreshops Redux state
  const dispatch = useDispatch();
  const { actionsLoading, ShopsCreshopForEdit ,auth} = useSelector(
    (state) => ({
      actionsLoading: state.ShopsCreshops.actionsLoading,
      ShopsCreshopForEdit: state.ShopsCreshops.ShopsCreshopForEdit,
      auth:state.auth
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ShopsCreshop by id
    
    dispatch(actions.fetchShopsCreshop(id));
 
  }, [id, dispatch]);
 

  // server request for saving ShopsCreshop
  const saveShopsCreshop = (ShopsCreshop,setOnsave) => {
   
    if (!id) {
      // server request for creating ShopsCreshop
      new Promise((r,j)=>{        
        update('',auth.authToken,auth.user.id,ShopsCreshop,r)
      })
      .then((v)=>{
        setOnsave(false)
        dispatch(actions.createShopsCreshop(v)).then(() => onHide());
      })
      
    } else {
      // server request for updating ShopsCreshop
      new Promise((r,j)=>{        
        update(id,auth.authToken,auth.user.id,ShopsCreshop,r)
      })
      .then((v)=>{
        setOnsave(false)
        dispatch(actions.updateShopsCreshop(v)).then(() => onHide());
      })
      
    }
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }}>

      <ShopsCreshopEditForm
        saveShopsCreshop={saveShopsCreshop}
        actionsLoading={actionsLoading}
        ShopsCreshop={ShopsCreshopForEdit || ShopsCreshopsUIProps.initShopsCreshop}
        onHide={onHide}
        id={id}
        useLang={useLang()}
        auth={auth}
      />
    </div>

  );
}
