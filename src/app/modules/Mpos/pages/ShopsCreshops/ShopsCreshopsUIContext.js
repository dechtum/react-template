import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ShopsCreshopsUIHelpers";

const ShopsCreshopsUIContext = createContext();

export function useShopsCreshopsUIContext() {
  return useContext(ShopsCreshopsUIContext);
}

export const ShopsCreshopsUIConsumer = ShopsCreshopsUIContext.Consumer;

export function ShopsCreshopsUIProvider({ShopsCreshopsUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);



  const initShopsCreshop =  {
    id:undefined,
    name:{
        th:'',
        en:'',
    },
    nameth:'',
    tex:'',
    tel:'',
    address:'',
    picture:'',
    district_id:'',
    ampher_id:'',
    province_id:'',
    zipcode_id:'',
    status:'1'
  }; 


  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initShopsCreshop,
    newShopsPageCreshopButtonClick: ShopsCreshopsUIEvents.newShopsPageCreshopButtonClick,
    newShopsCreshopButtonClick: ShopsCreshopsUIEvents.newShopsCreshopButtonClick,
    openEditShopsCreshopDialog: ShopsCreshopsUIEvents.openEditShopsCreshopDialog,
    openDeleteShopsCreshopDialog: ShopsCreshopsUIEvents.openDeleteShopsCreshopDialog,
    openDeleteShopsCreshopsDialog: ShopsCreshopsUIEvents.openDeleteShopsCreshopsDialog,
    openFetchShopsCreshopsDialog: ShopsCreshopsUIEvents.openFetchShopsCreshopsDialog,
    openUpdateShopsCreshopsStatusDialog: ShopsCreshopsUIEvents.openUpdateShopsCreshopsStatusDialog
  };

  return <ShopsCreshopsUIContext.Provider value={value}>{children}</ShopsCreshopsUIContext.Provider>;
}
