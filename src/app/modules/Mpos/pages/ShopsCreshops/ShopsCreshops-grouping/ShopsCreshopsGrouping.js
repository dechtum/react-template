import React, { useMemo } from "react";
import { useShopsCreshopsUIContext } from "../ShopsCreshopsUIContext";
import SVG from "react-inlinesvg";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";

export function ShopsCreshopsGrouping() {
  // ShopsCreshops UI Context
  const [lang,setLang]=React.useState(useLang())
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      ids: ShopsCreshopsUIContext.ids,
      setIds: ShopsCreshopsUIContext.setIds,
      openDeleteShopsCreshopsDialog: ShopsCreshopsUIContext.openDeleteShopsCreshopsDialog,
      openFetchShopsCreshopsDialog: ShopsCreshopsUIContext.openFetchShopsCreshopsDialog,
      openUpdateShopsCreshopsStatusDialog:
        ShopsCreshopsUIContext.openUpdateShopsCreshopsStatusDialog,
    };
  }, [ShopsCreshopsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                {lang=='en'?'Selected records count':'จำนวนที่เลือก'} : <b>{ShopsCreshopsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={ShopsCreshopsUIProps.openDeleteShopsCreshopsDialog}
              >
                <i className="fa fa-trash"></i>{lang=='en'?'Delete All':'ลบทั้งหมด'} 
              </button>
              &nbsp;
              {/* <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ShopsCreshopsUIProps.openFetchShopsCreshopsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button> */}
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={ShopsCreshopsUIProps.openUpdateShopsCreshopsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> {lang=='en'?'Update Status':'อัพเดทสถานะ'} 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
