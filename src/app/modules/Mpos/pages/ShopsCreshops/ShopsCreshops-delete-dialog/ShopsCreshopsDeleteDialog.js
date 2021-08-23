import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
import { useShopsCreshopsUIContext } from "../ShopsCreshopsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import {deletedb} from './../../../__mocks__/ShopsCreshops/mockShopsCreshopLib'

export function ShopsCreshopsDeleteDialog({ show, onHide }) {
  const [lang,setLang]=React.useState(useLang())
  // ShopsCreshops UI Context
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      ids: ShopsCreshopsUIContext.ids,
      setIds: ShopsCreshopsUIContext.setIds,
      queryParams: ShopsCreshopsUIContext.queryParams,
    };
  }, [ShopsCreshopsUIContext]);

  // ShopsCreshops Redux state
  const dispatch = useDispatch();
  const { isLoading,auth } = useSelector(
    (state) => ({ 
      isLoading: state.ShopsCreshops.actionsLoading,
      auth:state.auth
     }),
    shallowEqual
  );

  // if ShopsCreshops weren't selected we should close modal
  useEffect(() => {
    if (!ShopsCreshopsUIProps.ids || ShopsCreshopsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreshopsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteShopsCreshops = () => {
 
   new Promise((r,j)=>{
    deletedb(ShopsCreshopsUIProps.ids, auth.authToken, auth.user.id,r);
   })
   .then((v)=>{
     if(v){
        // server request for deleting ShopsCreshop by selected ids
        dispatch(actions.deleteShopsCreshops(ShopsCreshopsUIProps.ids)).then(() => {
          // refresh list after deletion
          dispatch(actions.fetchShopsCreshops(ShopsCreshopsUIProps.queryParams)).then(
            () => {
              // clear selections list
              ShopsCreshopsUIProps.setIds([]);
              // closing delete modal
              onHide();
            }
          );
        });
     }      
   })
    
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
        {lang=='en'?'Delete':'ลบ'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>{lang=='en'?'Are you sure to permanently delete this Shops ?':'คุณแน่ใจหรือว่าลบร้านค้านี้อย่างถาวร ?'}</span>
        )}
        {isLoading && <span>{lang=='en'?'Shops is deleting...':'กำลังลบร้านค้า...'}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
             {lang=='en'?'Cancel':'ยกเลิก'}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteShopsCreshops}
            className="btn btn-primary btn-elevate"
          >
            {lang=='en'?'Delete':'ลบ'}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
