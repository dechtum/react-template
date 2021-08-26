// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ShopsCreEmpsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useShopsCreEmpsUIContext } from "../ShopsCreEmpsUIContext";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import {AjaxData} from './../../../__mocks__/ShopsCreEmps/mockShopsCreEmpLib'
import {TitleList} from '../../../__mocks__/center/mockTitlenameLib'
import {Positions} from '../../../__mocks__/center/mockPositionLib'
import {Shops} from '../../../__mocks__/center/mockShopLib'

let start = false;
export function ShopsCreEmpsTable() {
  // ShopsCreEmps UI Context
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      setIds: ShopsCreEmpsUIContext.setIds,
      queryParams: ShopsCreEmpsUIContext.queryParams,
      setQueryParams: ShopsCreEmpsUIContext.setQueryParams,
      openEditShopsCreEmpDialog: ShopsCreEmpsUIContext.openEditShopsCreEmpDialog,
      openDeleteShopsCreEmpDialog: ShopsCreEmpsUIContext.openDeleteShopsCreEmpDialog,
    };
  }, [ShopsCreEmpsUIContext]);

  // Getting curret state of ShopsCreEmps list from store (Redux)
  const { currentState ,auth} = useSelector(
    (state) => ({ 
      currentState: state.ShopsCreEmps,
      auth:state.auth
     }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // ShopsCreEmps Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    ShopsCreEmpsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchShopsCreEmps(ShopsCreEmpsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShopsCreEmpsUIProps.queryParams, dispatch]);
 
  React.useLayoutEffect(()=>{
    new Promise(async (r,j)=>{
     const a= await Positions(auth.user.id,auth.authToken);
     const b= await TitleList(auth.user.id,auth.authToken);
     const c= await Shops(auth.user.id,auth.authToken);
     const z= await AjaxData(auth.authToken,{
        "action":"list",
        "registerId": auth.user.id,
        "shopId": [""]
      },r );
    })
    .then((v)=>{     
      start=true;
      // clear selections list
      ShopsCreEmpsUIProps.setIds([]);
      // server call by queryParams
      dispatch(actions.fetchShopsCreEmps(ShopsCreEmpsUIProps.queryParams));
    }) 
    
  },[start])
 
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: `${useLang()=='en'?'No.':'ลำดับที่'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "name",
      text: `${useLang()=='en'?'Name':'ชื่อ'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "surname",
      text:`${useLang()=='en'?'Surname':'นามสกุล'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "position",
      text: `${useLang()=='en'?'Position':'ตำแหน่ง'}`,
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "shop_id",
      text: `${useLang()=='en'?'Shop':'ร้าน'}`,
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditShopsCreEmpDialog: ShopsCreEmpsUIProps.openEditShopsCreEmpDialog,
        openDeleteShopsCreEmpDialog: ShopsCreEmpsUIProps.openDeleteShopsCreEmpDialog,
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
    sizePerPage: ShopsCreEmpsUIProps.queryParams.pageSize,
    page: ShopsCreEmpsUIProps.queryParams.pageNumber,
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
                  ShopsCreEmpsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: ShopsCreEmpsUIProps.ids,
                  setIds: ShopsCreEmpsUIProps.setIds,
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
