// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ShopsCreshopsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useShopsCreshopsUIContext } from "../ShopsCreshopsUIContext";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import {AjaxDataShopsCreshop} from "./../../../__mocks__/ShopsCreshops/mockShopsCreshopLib";
let start = false;
export function ShopsCreshopsTable() {
  // ShopsCreshops UI Context
  const[ran,setRan]=React.useState('');
  const ShopsCreshopsUIContext = useShopsCreshopsUIContext();
  const ShopsCreshopsUIProps = useMemo(() => {
    return {
      ids: ShopsCreshopsUIContext.ids,
      setIds: ShopsCreshopsUIContext.setIds,
      queryParams: ShopsCreshopsUIContext.queryParams,
      setQueryParams: ShopsCreshopsUIContext.setQueryParams,
      openEditShopsCreshopDialog: ShopsCreshopsUIContext.openEditShopsCreshopDialog,
      openDeleteShopsCreshopDialog: ShopsCreshopsUIContext.openDeleteShopsCreshopDialog,
    };
  }, [ShopsCreshopsUIContext]);

  // Getting curret state of ShopsCreshops list from store (Redux)
  const { currentState,auth } = useSelector(
    (state) => ({ 
      currentState: state.ShopsCreshops,
      auth:state.auth 
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  
  // ShopsCreshops Redux state
  const dispatch = useDispatch();
  useEffect(() => {    
    // clear selections list
    
    // server call by queryParams
    ShopsCreshopsUIProps.setIds([]);
    dispatch(actions.fetchShopsCreshops(ShopsCreshopsUIProps.queryParams)); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreshopsUIProps.queryParams, dispatch]);
  // Table columns
  React.useLayoutEffect(()=>{
    new Promise((r,j)=>{
      AjaxDataShopsCreshop(auth.authToken,{
        "registerId": auth.user.id,
        "shopId": [""]
      },r );
    })
    .then((v)=>{     
      start=true;
      ShopsCreshopsUIProps.setIds([]);
      dispatch(actions.fetchShopsCreshops(ShopsCreshopsUIProps.queryParams)); 
    }) 
  },[start])

  const columns = [
    {
      dataField: "id",
      text:  `${useLang()=='en'?'No.':'????????????????????????'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "nameth",
      text: `${useLang()=='en'?'name':'????????????'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "tel",
      text:  `${useLang()=='en'?'Phone':'????????????????????????'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "address",
      text:  `${useLang()=='en'?'address':'?????????????????????'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "active",
      text: `${useLang()=='en'?'status':'???????????????'}`,
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },   
    {
      dataField: "action",
      text:  `${useLang()=='en'?'action':'????????????????????????'}`,
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditShopsCreshopDialog: ShopsCreshopsUIProps.openEditShopsCreshopDialog,
        openDeleteShopsCreshopDialog: ShopsCreshopsUIProps.openDeleteShopsCreshopDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: ShopsCreshopsUIProps.queryParams.pageSize,
    page: ShopsCreshopsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
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
                  ShopsCreshopsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: ShopsCreshopsUIProps.ids,
                  setIds: ShopsCreshopsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
