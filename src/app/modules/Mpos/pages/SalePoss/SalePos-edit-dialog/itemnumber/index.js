
import React from 'react'
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import './css.css'

export function Itemnumber() {
    const dataLi = [
        {'id': 1, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },
        {'id': 2, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },
        {'id': 3, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },
        {'id': 4, 'title': 'กาแฟ', 'img': "/media/stock-600x400/img-4.jpg", 'detail': 'เอสเพรสโซ้หวานปกติ' },        
    ]
    return (
        <div className="col-12">
            <div className="row">                
                <div className="col-2 d-flex flex-row">
                    <div className="btn btn-primary mr-auto" style={{borderRadius:'0px'}}>ลด </div>
                    <> </>
                    <input type="text" className="form-control text-center" style={{width:'10em'}}/>
                    <> </>
                    <div className="btn btn-primary" style={{borderRadius:'0px'}}>เพิ่ม</div>
                </div>
                
            </div>
        </div>   
        
    )
}


