
import React from 'react'
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import './css.css'

export function Listitemtype() {
    const dataLi = [
        {'id': 1, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },
        {'id': 2, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },
        {'id': 3, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },
        {'id': 4, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },        
    ]
    return (
        <ul className="pos">
         {
             dataLi.map((val, key) => {
                return (
                    <li className="card" key={key}>
                        <div className="itme-bast-sale">
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


