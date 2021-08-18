import {ajax} from 'sit-fetch'
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AsideTableMock from "./AsideTableMock";
import axios from "axios";
import $ from "jquery";

export const AsideS_URL = "api/esss";
let Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3Q1NTU1ZHNmZHMiLCJwYXNzd29yZCI6IjEifQ.783MLtL0Zy8camMbvGk7nciKHQ6XBGAwlT9wZa8F8pw';
let hosts = "http://192.168.1.103:81";
export async function AjaxDataAside(resove = "") {
  new Promise((r, j) => {
    ajax.Post(`${hosts}/shoplist`, Token, {
      "registerId":"1",
      "shopId":[""]
  }, r);
  }).then(data => {
    console.log(data);
    if (data != false) {
      let da = data != "" ? JSON.parse(data) : "";
      const das = Object.entries(da).map(([key, value], i) => {
        const id = parseInt(value.id);
        const active = value.active;

        const newData = {
          id,
          active
        };
        //AsideTableMock.push(newData);
      });
      if (resove != "") {
        resove(AsideTableMock);
      } else {
        return AsideTableMock;
      }
    }
  });
}
export const update = (id, data, userId, r = "") => {
  console.log(data);
  let obj = {
    action: "tb_leave_request",
    id: id == undefined ? "" : id,
    sql: {
      id_application: "",
      active: "1"
    }
  };

  console.log(obj);
  const res = new Promise((r, j) =>
    ajax.Post(`${hosts}/Aside/update`, Token, obj, r)
  );
  res.then(v => {
    console.log(v);
    if (v != false) {
      let obj = {
        id: parseInt(v),
        check_hour: data.check_hour
      };
      if (r != "") {
        r(obj);
      } else {
        return obj;
      }
    } else {
      if (r != "") {
        r(false);
      } else {
        return false;
      }
    }
  });
};
export const updatedbStatus = (id, status, r = "") => {
  let obj = {
    action: "tb_leave_request",
    id: id,
    sql: {
      emreq_active: {
        val: status,
        type: "BOOLEAN"
      }
    }
  };
  const res = new Promise((r, j) =>
    ajax.Post(`${hosts}/Aside/update`, Token, obj, r)
  );
  res.then(v => {
    console.log(v);
    if (v != false) {
      if (r != "") {
        r(true);
      } else {
        return true;
      }
    } else {
      if (r != "") {
        r(false);
      } else {
        return false;
      }
    }
  });
};
export const deletedb = (id, r = "") => {
  let obj = {
    action: "tb_leave_request",
    id: id
  };
  const res = new Promise((r, j) =>
    ajax.Post(`${hosts}/Aside/delete`, Token, obj, r)
  );
  res.then(v => {
    console.log(v);
    if (v != false) {
      if (r != "") {
        r(true);
      } else {
        return true;
      }
    } else {
      if (r != "") {
        r(false);
      } else {
        return false;
      }
    }
  });
};

