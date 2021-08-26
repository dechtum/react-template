import { host } from "../../../../libs/config";
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import TitleTableMock from "./TitleTableMock";
import PositionTableMock from "./PositionTableMock";
import { ajax } from 'sit-fetch'
import axios from "axios";
import $ from "jquery";

export function TitleList(registerId, token, resove = '') {
  new Promise((r, j) => {
    ajax.Post(`${host}/titlename`, token, {
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
        TitleTableMock.splice(0, TitleTableMock.length)
        const das = Object.entries(da).map(([key, value], i) => {
          const id = parseInt(value.id);
          ;
          const newData = {
            id: id,
            name: value.name,
            status: parseInt(value.active)
          };

          TitleTableMock.push(newData);

        });
      }

      if (resove != "") {
        resove(TitleTableMock);
      } else {
        return TitleTableMock;
      }
    }
  });
}


export function Update(id, registerId, token, obj, resove = '') {
  new Promise((r, j) => {
    ajax.Post(`${host}/titlename`, token, {
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
        "action": "tb_titlename",
        "id": [id],
        "method": "=",
        "registerId": registerId,
        "shopId": ""
      }
      , r);
  }).then(data => {
    const res = JSON.parse(data)
    if (res.statusCode == 200) {
      if (res.data.type == "REQUEST_SUCCESS") {
        let da = res.data.content;
        if (da) {
          // const out = TitleTableMock.filter(e=>parseInt(e.id)!=parseInt(id));
          TitleTableMock.splice(key, 1)
          if (resove != "") {
            resove(TitleTableMock);
          } else {
            return TitleTableMock;
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