// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Results/ResultsActions";
import { useLang, setLanguage } from "../../../../../../_metronic/i18n";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ResultsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useResultsUIContext } from "../ResultsUIContext";

export function Total() {
  // Results UI Context
  const[lang,setLang]=React.useState(useLang())
  const ResultsUIContext = useResultsUIContext();
  const ResultsUIProps = useMemo(() => {
    return {
      ids: ResultsUIContext.ids,
      setIds: ResultsUIContext.setIds,
      queryParams: ResultsUIContext.queryParams,
      setQueryParams: ResultsUIContext.setQueryParams,
      openEditResultDialog: ResultsUIContext.openEditResultDialog,
      openDeleteResultDialog: ResultsUIContext.openDeleteResultDialog,
    };
  }, [ResultsUIContext]);

  return (
    <div className="row">
      <div className="col-md-6">
        
      </div>
      <div className="col-md-6">
        <div className="row mt-2">
          <div className="col-md-6 " style={{textAlign:'right'}}>
          {lang=='en'?"Total":"ยอดรวม"}
          </div>
          <div className="col-md-6 pr-5" style={{textAlign:'right'}}>
              90,000.00
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6 " style={{textAlign:'right'}}>
          {lang=='en'?"VAT 7%":"ภาษีมูลค่าเพิ่ม 7%"}
          </div>
          <div className="col-md-6 pr-5" style={{textAlign:'right'}}>
              90,000.00
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6 " style={{textAlign:'right'}}>
          {lang=='en'?"Total net":"ยอดเงินสุทธิ"}
          </div>
          <div className="col-md-6 pr-5" style={{textAlign:'right'}}>
              90,000.00
          </div>
        </div>
      </div>
    </div>
  );
}
