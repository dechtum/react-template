
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

export const json_decode = (obj) =>{   
    return (typeof obj === 'string' && obj !== null && obj !== undefined?JSON.parse(obj):obj);
}
export const json_encode = (obj) =>{   
    return (typeof obj === 'object' && obj !== null && obj !== undefined) ?JSON.stringify(obj):obj
}  
