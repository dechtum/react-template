// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../_redux/PuyPurs/PuyPursActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../../../PuyPursUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../../../../_metronic/_partials/controls";
import { usePuyPursUIContext } from "../../../../PuyPursUIContext";

export function Tables() {
  // PuyPurs UI Context
  const PuyPursUIContext = usePuyPursUIContext();
  const PuyPursUIProps = useMemo(() => {
    return {
      ids: PuyPursUIContext.ids,
      setIds: PuyPursUIContext.setIds,
      queryParams: PuyPursUIContext.queryParams,
      setQueryParams: PuyPursUIContext.setQueryParams,
      openEditPuyPurDialog: PuyPursUIContext.openEditPuyPurDialog,
      openDeletePuyPurDialog: PuyPursUIContext.openDeletePuyPurDialog,
    };
  }, [PuyPursUIContext]);

  // Getting curret state of PuyPurs list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.PuyPurs }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // // PuyPurs Redux state
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // clear selections list
  //   PuyPursUIProps.setIds([]);
  //   // server call by queryParams
  //   dispatch(actions.fetchPuyPurs(PuyPursUIProps.queryParams));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [PuyPursUIProps.queryParams, dispatch]);
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
    sizePerPage: PuyPursUIProps.queryParams.pageSize,
    page: PuyPursUIProps.queryParams.pageNumber,
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
                  PuyPursUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: PuyPursUIProps.ids,
                //   setIds: PuyPursUIProps.setIds,
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
