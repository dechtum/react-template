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
import {Total} from './total'

export function ResultsTable() {
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

  // Getting curret state of Results list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.Results }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Results Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    ResultsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchResults(ResultsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResultsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: lang=='en'?"NO.":"ลำดับ",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: `รายการ\nชื่อสินค้าที่สร้างจากเมนูสินค้า`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "จำนวน",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "หน่วย",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "gender",
      text: "ราคา",
      sort: false,
      sortCaret: sortCaret,
    }
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: ResultsUIProps.queryParams.pageSize,
    page: ResultsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  ResultsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: ResultsUIProps.ids,
                  setIds: ResultsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
              <Total/>
            </>
          );
        }}
      </PaginationProvider>
    </>
  );
}
