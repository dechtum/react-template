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
import { useLang, setLanguage } from "./../../../../../../../../_metronic/i18n";
import './css.css';


export function Tables({itemRow}){

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
                                    <div className="col-md-3">
                                        <AutoComplete placeholder="สินค้า" />
                                    </div>
                                    <div className="col-md-3">
                                        <AutoComplete placeholder="จำนวน" />
                                    </div>
                                    <div className="col-md-3">
                                        <AutoComplete placeholder="ราคาต่อหน่อย" />
                                    </div>
                                    <div className="col-md-3">
                                        <AutoComplete placeholder="ราคารวม" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-12">
                        <div className="ml-auto" >
                            <div                               
                                className="btn btn-primary btn-elevate"
                                onClick={handleClick}
                            >
                                {useLang()=='en'?'Add':'เพิ่ม'}
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}