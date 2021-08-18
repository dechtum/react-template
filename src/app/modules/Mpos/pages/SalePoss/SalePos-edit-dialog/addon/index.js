
import React from 'react'
import {
    Input,
    Select,
    DatePickerField,
    AntSwitchs
  } from "../../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import './css.css'

let Detail = [
    {'id':1, 'title': 'ไซรัปคาราเมล', 'checked': false, 'detail': 'เอสเพรสโซ้หวานปกติ' },
    {'id':2, 'title': 'ไซรัปวานิลา', 'checked': false, 'detail': 'เอสเพรสโซ้หวานปกติ' },
    {'id':3, 'title': 'ไซรัปฮาเวลนัท', 'checked': false, 'detail': 'เอสเพรสโซ้หวานปกติ' },    
]

export function Addon() {   
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
      });
    function handleChange (name , value){
        console.log(name);
        Detail = Detail.map((val,key)=>{
            return(
                {
                    ...val,
                    checked:val.id==name?value:val.checked
                }
            )
        })
        console.log(Detail);
       // setState({ ...state, [name]: event.target.checked });
    };
    
    return (
        <div className="col-md-12">
         {
             Detail.map((val, key) => {
                return (
                    <div className="row" key={key}>
                        <div className="col-md-12 mb-3">
                        <AntSwitchs name={`${val.id}`} label={val.title} checked={val.checked} onChange={handleChange}/>
                        </div>
                        
                    </div>    
                )
            })
         }
        </div>     
        
    )
}


