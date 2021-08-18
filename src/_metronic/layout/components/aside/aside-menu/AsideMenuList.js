/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "./../_redux/AsidesActions";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { useLang, setLanguage } from './../../../../i18n'
import { Items } from './itemmenu/item'
import Admin from '../__mocks__/AdminTable'
import Saler from '../__mocks__/SalerTable'
import AsideTableMock from '../__mocks__/AsideTableMock'


import {
  Input,
  Select,
  AutoComplete,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";
import './css.css'

const AsideUIContext = createContext();

export function useAsidesUIContext() {
    return useContext(AsideUIContext);
}

export function AsideMenuList({ layoutProps }) {
  const[id,setId]=React.useState(undefined);
  const [lang, setLang] = React.useState(useLang())
  const location = useLocation();

  const initAside = {
    id: undefined,
    name: "",
    tel: "",
    address: "",
    picture: "",
    district_id: "",
    province_id: "",
    zipcode_id: "",
    active: ""
  };
  const AsidesUIContext = useAsidesUIContext();

  // Asides Redux state
  const dispatch = useDispatch();
  const { actionsLoading, AsideForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.Asides.actionsLoading,
      AsideForEdit: state.Asides.AsideForEdit,
    }),
    shallowEqual
  );
  
  useEffect(() => {
    // server call for getting Aside by id
   // dispatch(actions.fetchAsides(AsideTableMock));
   
    dispatch(actions.fetchAsides(AsideTableMock)).then();
  }, [id, dispatch]);

  // server request for saving Aside
  const saveAside = (Aside) => {
    if (!id) {
      // server request for creating Aside
      dispatch(actions.createAside(Aside)).then();
    } else {
      // server request for updating Aside
      dispatch(actions.updateAside(Aside)).then();
    }
  };

  
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
      "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };


  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/เลือกบริษัท", false)}`}
          aria-haspopup="true"
        >
          <div className="form-group pl-2 pr-2">
            <select className="form-control form-control-solid theme-select">
              <option value="0">{lang == 'en' ? 'Select Company/Store' : 'เลือกบริษัท/ร้านค้า'}</option>
              {
                AsideTableMock.map((val, key) => {
                  
                  return (
                    <option key={key} value={val.id}>{val.name[lang]}</option>
                  )
                })
              }
            </select>
          </div>

        </li>

        {/* .......................................... */}
        <li className="menu-section ">
          <h4 className="menu-text">{lang == 'en' ? 'Admin' : 'ผู้ดูแล'}</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {/* .......................................... */}
        {
          <Items item={Admin} layoutProps={layoutProps} />
        }
        {/*  .....................................................................................................  */}
        <li className="menu-section ">
          <h4 className="menu-text">{lang == 'en' ? 'Saler' : 'ผู้ขาย'}</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {
          <Items item={Saler} layoutProps={layoutProps} />
        }


      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
