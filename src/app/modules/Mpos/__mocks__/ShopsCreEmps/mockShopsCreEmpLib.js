import { host } from "./../../../../libs/config";
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ShopsCreEmpTableMock from "./ShopsCreEmpTableMock";
import TitleTableMock from "../center/TitleTableMock";
import { ajax } from 'sit-fetch'
import axios from "axios";
import $ from "jquery";

export function AjaxData(token,obj, resove = '') {

  new Promise((r, j) => {
    ajax.Post(`${host}/employee`, token, obj, r);
  }).then(data => {
    const res = JSON.parse(data)
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS"){
        let da = res.data.content;
        ShopsCreEmpTableMock.splice(0, ShopsCreEmpTableMock.length)
        const das = Object.entries(da).map(([key, value], i) => {
          const id = parseInt(value.id);
          const newData = {
            id: id,
            shop_id: value.shop_id,
            title_id: value.title_id,
            name: value.name,
            surname: value.surname,
            tel: value.tel,
            email: value.email,
            position: value.position,
            jd: value.jd,
            username: value.username,
            password: value.password,
            address: value.address,
            picture: value.picture,
            pictureContent: value.pictureContent,
            district_id: value.district_id,
            ampher_id: value.ampher_id,
            province_id: value.province_id,
            zipcode_id: value.zipcode_id,
            status: parseInt(value.active)
          };
          ShopsCreEmpTableMock.push(newData);
        });
      }

      if (resove != "") {
        resove(ShopsCreEmpTableMock);
      } else {
        return ShopsCreEmpTableMock;
      }
    }
  });
}

export const update = (id, token, registerId, data, resove = '') => {
  const obj = {
    "action": "update",
    "id":id,
    "registerId": registerId,
    "sql": {
      "name": data.nameth,
      "tel": data.tel,
      "tex": data.tex,
      "address": data.address,
      "picture": data.picture,
      "district_id": data.district_id,
      "ampher_id": data.ampher_id,
      "province_id": data.province_id,
      "zipcode_id": data.zipcode_id,
      "active": data.status ? '1' : '0'
    }
  }


  new Promise((r, j) => {
    ajax.Post(`${host}/shop`, token, obj, r);
  }).then(async (v) => {
    console.log(v);
    const res = JSON.parse(v)
    let arr = [];
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        let da = res.data.content;
        const [obj] = da.map((val, key) => {
          return {
            id: parseInt(val.id),
            name: {
              th: val.name,
              en: val.name,
            },
            nameth: val.name,
            tex: val.tex,
            tel: val.tel,
            address: val.address,
            picture: val.picture,
            pictureContent: data.pictureContent,
            district_id: val.district_id,
            ampher_id: val.ampher_id,
            province_id: val.province_id,
            zipcode_id: val.zipcode_id,
            status: parseInt(val.active)
          }
        })        
        if (resove != "") {
          resove(obj);
        } else {
          return obj;
        }
      }
    }
  });
};

export const updatedbStatus = (id,token, registerId, active,resove = '') => { 
  const obj = {
    action:"member_shop",
    registerId:registerId,
    shopId:"",
    id:id,
    active:active
}

  new Promise((r, j) => {
    ajax.Post(`${host}/updatestatus`, token, obj, r);
  }).then(async (v) => {
 
    const res = JSON.parse(v)
    let arr = [];
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        if (resove != "") {
          resove(true);
        } else {
          return true;
        }
      }else{
        if (resove != "") {
          resove(false);
        } else {
          return false;
        }
      }
    }
  });
};

export const deletedb = (id=[], token, registerId, resove = '') => {
  const obj = {
    action:"member_shop",
    id:id,
    method:"=",
    registerId:registerId,
    shopId:""
  } 

  new Promise((r, j) => {
    ajax.Post(`${host}/delete`, token, obj, r);
  }).then(async (v) => {
 
    const res = JSON.parse(v)
    let arr = [];
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        if (resove != "") {
          resove(true);
        } else {
          return true;
        }
      }else{
        if (resove != "") {
          resove(false);
        } else {
          return false;
        }
      }
    }
  });
};

////////////////
