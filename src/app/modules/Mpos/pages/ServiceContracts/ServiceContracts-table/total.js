// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ServiceContracts/ServiceContractsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ServiceContractsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useServiceContractsUIContext } from "../ServiceContractsUIContext";
import { useLang, setLanguage } from "../../../../../../_metronic/i18n";


export function Total() {
  // Results UI Context
  const[lang,setLang]=React.useState(useLang())
 
  return (
    <div className="row">
      <div className="col-md-6">
        
      </div>
      <div className="col-md-6">
        <div className="row mt-2">
          <div className="col-md-6 " style={{textAlign:'right',fontSize:'15pt'}}>
          {lang=='en'?"Total":"ยอดรวม"}
          </div>
          <div className="col-md-6 pr-5" style={{textAlign:'right',fontSize:'15pt'}}>
              1,950.00
          </div>
        </div>
      </div>
    </div>
  );
}
