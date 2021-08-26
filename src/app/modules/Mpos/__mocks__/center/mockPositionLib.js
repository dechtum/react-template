import { host } from "../../../../libs/config";
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PositionTableMock from "./PositionTableMock";
import { ajax } from 'sit-fetch'
import axios from "axios";
import $ from "jquery";


export function Positions(registerId, token, resove = '') {
  new Promise((r, j) => {
    ajax.Post(`${host}/position`, token, {
      "action": "list",
      "registerId": registerId,
      "shopId": "",
      "id": [""]
    }
      , r);
  }).then(data => {
    const res = JSON.parse(data)
    
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        let da = res.data.content;
        PositionTableMock.splice(0, PositionTableMock.length)
        const das = Object.entries(da).map(([key, value], i) => {
          const id = parseInt(value.id);
          ;
          const newData = {
            id: id,
            name: value.name,
            status: parseInt(value.active)
          };
        
          PositionTableMock.push(newData);

        });
      }

      if (resove != "") {
        resove(PositionTableMock);
      } else {
        return PositionTableMock;
      }
    }
  });
}

export function Update(id, registerId, token, obj, resove = '') {
  new Promise((r, j) => {
    ajax.Post(`${host}/position`, token, {
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
        "action": "tb_position",
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
          // const out = PositionTableMock.filter(e=>parseInt(e.id)!=parseInt(id));
          PositionTableMock.splice(key, 1)
          if (resove != "") {
            resove(PositionTableMock);
          } else {
            return PositionTableMock;
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