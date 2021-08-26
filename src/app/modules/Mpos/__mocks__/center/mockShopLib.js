import { host } from "../../../../libs/config";
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ShopTableMock from "./ShopTableMock";
import { ajax } from 'sit-fetch'
import axios from "axios";
import $ from "jquery";


export function Shops(registerId, token, resove = '') {
  new Promise((r, j) => {
    ajax.Post(`${host}/shoplist`, token, {
      "registerId": registerId,
      "shopId":[""]
    }
      , r);
  }).then(data => {
    const res = JSON.parse(data)
    
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        let da = res.data.content;
        ShopTableMock.splice(0, ShopTableMock.length)
        const das = Object.entries(da).map(([key, value], i) => {
          const id = parseInt(value.id);
          ;
         const newData = {
            id: id,
            name: value.name,
            tex: value.tex,
            tel: value.tel,
            address: value.address,
            picture: value.picture,
            pictureContent: value.pictureContent,
            district_id: value.district_id,
            ampher_id: value.ampher_id,
            province_id: value.province_id,
            zipcode_id: value.zipcode_id,
            status: parseInt(value.active)
          };
          ShopTableMock.push(newData);
        });
      }

      if (resove != "") {
        resove(ShopTableMock);
      } else {
        return ShopTableMock;
      }
    }
  });
}

export function Update(id, registerId, token, obj, resove = '') {
  new Promise((r, j) => {
    ajax.Post(`${host}/shop`, token, {
      "action": "update",
      "registerId": registerId,
      "shopId": "",
      "id": id,
      "sql": {
        "name": obj.name,
        "active": obj.active
      }
    }
      , r);
  }).then(data => {
    const res = JSON.parse(data)

    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        let da = res.data.content;

        if (resove != "") {
          resove(da);
        } else {
          return da;
        }
      }
    }
  });
}

export function Delete(id, registerId, token, key, resove = '') {
  new Promise((r, j) => {
    ajax.Post(`${host}/delete`, token,
      {
        "action": "tb_shop",
        "id": [id],
        "method": "=",
        "registerId": registerId,
        "shopId": ""
      }
      , r);
  }).then(data => {
    console.log(data);
    const res = JSON.parse(data)
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        let da = res.data.content;
        if (da) {
          // const out = ShopTableMock.filter(e=>parseInt(e.id)!=parseInt(id));
          ShopTableMock.splice(key, 1)
          if (resove != "") {
            resove(ShopTableMock);
          } else {
            return ShopTableMock;
          }
        } else {
          if (resove != "") {
            resove(false);
          } else {
            return false;
          }
        }
      }
    }
  });
}