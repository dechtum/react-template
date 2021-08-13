// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../_redux/StockCounts/StockCountsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../../StockCountsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../../../_metronic/_partials/controls";
import { useStockCountsUIContext } from "../../../StockCountsUIContext";

export function Tables() {
  // StockCounts UI Context
  const StockCountsUIContext = useStockCountsUIContext();
  const StockCountsUIProps = useMemo(() => {
    return {
      ids: StockCountsUIContext.ids,
      setIds: StockCountsUIContext.setIds,
      queryParams: StockCountsUIContext.queryParams,
      setQueryParams: StockCountsUIContext.setQueryParams,
      openEditStockCountDialog: StockCountsUIContext.openEditStockCountDialog,
      openDeleteStockCountDialog: StockCountsUIContext.openDeleteStockCountDialog,
    };
  }, [StockCountsUIContext]);

  // Getting curret state of StockCounts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.StockCounts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // // StockCounts Redux state
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // clear selections list
  //   StockCountsUIProps.setIds([]);
  //   // server call by queryParams
  //   dispatch(actions.fetchStockCounts(StockCountsUIProps.queryParams));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [StockCountsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "firstName",
      text: "ใบสำคัญจ่าย",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "ใบรับสินค้า",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName1",
      text: "วันที่จ่าย",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName2",
      text: "สินค้า",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName3",
      text: "จำนวน",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
    }
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: StockCountsUIProps.queryParams.pageSize,
    page: StockCountsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
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
                  StockCountsUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: StockCountsUIProps.ids,
                //   setIds: StockCountsUIProps.setIds,
                // })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
          );
        }}
      </PaginationProvider>
    </>
  );
}
