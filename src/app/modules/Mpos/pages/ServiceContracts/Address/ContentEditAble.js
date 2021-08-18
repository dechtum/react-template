import React from "react";
import { Modal, Image } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import './css.css'
import {
  Input,
  Select,
  SITImage,
} from "../../../../../../_metronic/_partials/controls";
export default function ContentEditAble({lable,handleChange,name,state,edit,component }) {
   
    //   เลขที่ผู้เสียภาษี
    return (
        <div className="col-md-12 ">
            <div>
                <h5>{lable} :</h5> 
            </div>
            <div >
                {
                    component
                    ?
                    <textarea type="text" className={edit?"border-none":"form-control"} onChange={handleChange}/>
                    : 
                    <input type="text"  className={edit?"border-none":"form-control"} onChange={handleChange}/>
                }
               
            </div>
        </div>

    );
}
