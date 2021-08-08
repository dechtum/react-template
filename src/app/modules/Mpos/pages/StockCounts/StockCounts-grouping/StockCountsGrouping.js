import React, { useMemo } from "react";
import { useStockCountsUIContext } from "../StockCountsUIContext";

export function StockCountsGrouping() {
  // StockCounts UI Context
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      ids: StockCountsUIContext.ids,
      setIds: StockCountsUIContext.setIds,
      openDeleteStockCountsDialog: StockCountsUIContext.openDeleteStockCountsDialog,
      openFetchStockCountsDialog: StockCountsUIContext.openFetchStockCountsDialog,
      openUpdateStockCountsStatusDialog:
        StockCountsUIContext.openUpdateStockCountsStatusDialog,
    };
  }, [StockCountsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{StockCountsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={StockCountsUIProps.openDeleteStockCountsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={StockCountsUIProps.openFetchStockCountsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={StockCountsUIProps.openUpdateStockCountsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
