
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
    {'id':1, 'title': 'ยอดรวม', 'value': '19000' },
    {'id':2, 'title': 'ภาษีมูลค่าเพิม (7%)', 'value': '19000' },
    {'id':3, 'title': 'ยอดเงินสุทธิ', 'value': '19000' },    
]

export function Sumtotal() {   
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
        <>
        <div className="col-md-6"></div>
        <div className="col-md-6">
         {
             Detail.map((val, key) => {
                return (
                    <div className="row pt-2" key={key}>
                        <div className="col-md-6 text-right">
                            {val.title}
                        </div>
                        <div className="col-md-6 text-center">
                            {val.value}
                        </div>
                    </div>    
                )
            })
         }
        </div>    
        </> 
        
    )
}


