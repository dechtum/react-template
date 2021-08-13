// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/SalePoss/SalePossActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../SalePossUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useSalePossUIContext } from "../SalePossUIContext";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { Image } from "react-bootstrap";
import {Item1} from './item1/Item1'
import {Item2} from './item2/Item2'

export function PricePossTable() {
    // SalePoss UI Context
    const SalePossUIContext = useSalePossUIContext();
    const SalePossUIProps = useMemo(() => {
      return {
        ids: SalePossUIContext.ids,
        setIds: SalePossUIContext.setIds,
        queryParams: SalePossUIContext.queryParams,
        setQueryParams: SalePossUIContext.setQueryParams,
        openEditSalePosDialog: SalePossUIContext.openEditSalePosDialog,
        openDeleteSalePosDialog: SalePossUIContext.openDeleteSalePosDialog,
      };
    }, [SalePossUIContext]);
  
    // Getting curret state of SalePoss list from store (Redux)
    const { currentState } = useSelector(
      (state) => ({ currentState: state.SalePoss }),
      shallowEqual
    );
    const { totalCount, entities, listLoading } = currentState;
  
    // SalePoss Redux state
    const dispatch = useDispatch();
    useEffect(() => {
      // clear selections list
      SalePossUIProps.setIds([]);
      // server call by queryParams
      dispatch(actions.fetchSalePoss(SalePossUIProps.queryParams));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SalePossUIProps.queryParams, dispatch]);
   
   
  
    return (
      <>
        <Item2/> 
      </>
    );
  }
  