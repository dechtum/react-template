import {createSlice} from "@reduxjs/toolkit";
import {AjaxDataShopsCreshop} from './../../__mocks__/ShopsCreshops/mockShopsCreshopLib'

const initialShopsCreshopsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  ShopsCreshopForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const ShopsCreshopsSlice = createSlice({
  name: "ShopsCreshops",
  initialState: initialShopsCreshopsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getShopsCreshopById
    ShopsCreshopFetched: (state, action) => {
      state.actionsLoading = false;
      state.ShopsCreshopForEdit = action.payload.ShopsCreshopForEdit;
      state.error = null;
    },
    // findShopsCreshops
    ShopsCreshopsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createShopsCreshop
    ShopsCreshopCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.ShopsCreshop);
    },
    // updateShopsCreshop
    ShopsCreshopUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.ShopsCreshop.id) {
          return action.payload.ShopsCreshop;
        }
        return entity;
      });
    },
    // deleteShopsCreshop
    ShopsCreshopDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteShopsCreshops
    ShopsCreshopsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // ShopsCreshopsUpdateState
    ShopsCreshopsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
