import React from 'react'
import {
    Input,
    Select,
    Textarea,
    Switch,
    Upload,
    SITMore,
    DatePickerField,
    AutoComplete,
} from "../../../../../../../../_metronic/_partials/controls";
import { useLang, setLanguage } from "../../../../../../../../_metronic/i18n";
import './css.css';


export function Tables2({itemRow}){

    function handleClick(e){
        alert()
    }
    return(
        <React.Fragment>
            <div className="row">
                    <div className="col-md-12">
                        <ul className="sit-list">
                            <li>
                                <div className="row" >
                                    <div className="col-md-2">
                                       ลำดับ 
                                    </div>
                                    <div className="col-md-3">
                                    สินค้า
                                    </div>
                                    <div className="col-md-3">
                                    จำนวน
                                    </div>
                                    <div className="col-md-2">
                                    ได้รับแล้ว
                                    </div>
                                    <div className="col-md-2">
                                    มูลค่า
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="row" >
                                    <div className="col-md-2">
                                        1
                                    </div>
                                    <div className="col-md-3">
                                    .
                                    </div>
                                    <div className="col-md-3">
                                    .
                                    </div>
                                    <div className="col-md-2">
                                    .
                                    </div>
                                    <div className="col-md-2">
                                    .
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>                    
                </div>
        </React.Fragment>
    )
}