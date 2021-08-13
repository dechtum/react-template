
import React from 'react'
import {
    Input,
    Select,
    DatePickerField,
    AntSwitchs
  } from "../../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import './css.css'

export function Addon() {
    const dataLi = [
        { 'title': 'ไซรัปคาราเมล', 'checked': false, 'detail': 'เอสเพรสโซ้หวานปกติ' },
        { 'title': 'ไซรัปวานิลา', 'checked': true, 'detail': 'เอสเพรสโซ้หวานปกติ' },
        { 'title': 'ไซรัปฮาเวลนัท', 'checked': false, 'detail': 'เอสเพรสโซ้หวานปกติ' },    
    ]
    return (
        <div className="col-md-12">
         {
             dataLi.map((val, key) => {
                return (
                    <div className="row" key={key}>
                        <AntSwitchs label={val.title} checked={val.checked}/>
                    </div>    
                )
            })
         }
        </div>     
        
    )
}


