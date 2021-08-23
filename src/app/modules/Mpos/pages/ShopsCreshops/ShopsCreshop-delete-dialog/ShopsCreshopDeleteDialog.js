import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
import {useShopsCreshopsUIContext} from "../ShopsCreshopsUIContext";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function ShopsCreshopDeleteDialog({ id, show, onHide }) {
  const [lang,setLang]=React.useState(useLang())
  // ShopsCreshops UI Context
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      setIds: ShopsCreshopsUIContext.setIds,
      queryParams: ShopsCreshopsUIContext.queryParams
    };
  }, [ShopsCreshopsUIContext]);

  // ShopsCreshops Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ShopsCreshops.actionsLoading }),
    shallowEqual
  );
  useEffect(() => {
    if (!id) {
      onHide();
    }
  }, [id]);

  useEffect(() => {}, [isLoading, dispatch]);
  const deleteShopsCreshop = () => {
   
    dispatch(actions.deleteShopsCreshop(id)).then(() => {
      dispatch(actions.fetchShopsCreshops(ShopsCreshopsUIProps.queryParams));
      ShopsCreshopsUIProps.setIds([]);
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
            onClick={deleteShopsCreshop}
            className="btn btn-primary btn-elevate"
          >
            {lang=='en'?'Delete':'ลบ'}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
