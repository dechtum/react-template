
import React from 'react'
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import './css.css'

export function Item2({SalePossUIProps}) {
    const dataLi = [
        {'id': 1, 'title': 'สินค้า', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'กาแฟ' },
        {'id': 2,'title': 'สินค้า', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'ชา' },
        {'id': 3, 'title': 'สินค้า', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'น้ำผลไม้' },        
    ]
    return (
        <ul className="clasi">
         {
             dataLi.map((val, key) => {
                return (
                    <li className="card" key={key} onClick={()=>SalePossUIProps.openEditSalePosDialog(val.id)}>
                        <div className="itme-bast-clasi">
                            <div>{val.title}</div>
                            <div className="header-logo">
                                <img src={toAbsoluteUrl(`${val.img}`)} />
                            </div>
                            <div>{val.detail}</div>
                        </div>
                    </li>
    
                )
            })
         }
        </ul>  
    )
}


