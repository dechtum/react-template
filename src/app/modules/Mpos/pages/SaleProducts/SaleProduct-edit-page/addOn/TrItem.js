
import React  from 'react'
import ReactDOMServer from 'react-dom/server';
import { Formik, Form, Field } from "formik";
import $ from 'jquery'
import {
    Input,
    Select,
    AutoComplete,
    DatePickerField,
    AntSwitchs
} from "../../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import './css.css'
import { Table, Tabs, Tab, Card } from 'react-bootstrap';



export function TrItem({ items,onClick }) {
    return (
        items.map((vals, keys) => {
            return (
                <tr key={keys}>
                    <td width="10%"><div className="btn">{vals.id}</div></td>
                    <td width="50%" style={{minWidth:'250px'}}><Field
                        name={`mat_id-${vals.id}`}
                        component={Select}
                        placeholder="เลือกวัตถุดิบ"
                        value={vals.name}
                        
                      /></td>
                    <td width="15%" style={{minWidth:'100px'}}><Field
                        name={`mat_number-${vals.id}`}
                        className="text-center form-control"
                        component={Input}
                        placeholder="กรอกจำนวน เพิ่มลด เป็น เปอร์เชนต์"
                        defaultValue={vals.number}
                      /></td>
                    <td width="15%" style={{minWidth:'100px'}}><Field
                        name={`mat_unit-${vals.id}`}
                        className="text-center form-control"
                        disabled
                        component={Input}
                        placeholder="เปอร์เซนต์"                        
                        value={vals.unit}
                      /></td>
                    <td width="10%"><div className="btn text-primary" onClick={()=>onClick(vals.id)}>ลบ</div></td>
                </tr>
            )
        })
    )
}