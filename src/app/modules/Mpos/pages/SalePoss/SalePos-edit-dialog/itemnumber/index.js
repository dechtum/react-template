
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
                <div className="col-2 d-flex">
                    
                </div>
                <div className="col-8 d-flex flex-row">
                    <div className="btn btn-primary mr-auto"> ลด </div>
                    <> </>
                    <input type="text" className="form-control text-center" />
                    <> </>
                    <div className="btn btn-primary">เพิ่ม</div>
                </div>
                <div className="col-2">
                    
                </div>
            </div>
        </div>   
        
    )
}


