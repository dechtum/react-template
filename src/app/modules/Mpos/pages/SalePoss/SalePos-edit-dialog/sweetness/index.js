
import React from 'react'
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import './css.css'
import {ButtonGroup,Button} from 'react-bootstrap'
import $ from 'jquery'

export function Sweetness() {
    let dataLi = [
        {'id': 1, 'title': 'ไม่หวาน', 'img': "/media/stock-600x400/img-4.jpg" },
        {'id': 2, 'title': 'หวานน้อย', 'img': "/media/stock-600x400/img-4.jpg" },
        {'id': 3, 'title': 'หวานมาก', 'img': "/media/stock-600x400/img-4.jpg" },
        {'id': 4, 'title': 'หวานสุดๆ', 'img': "/media/stock-600x400/img-4.jpg" },        
    ]
    function handleClick(e){
        console.log(e.target.id); 
        $('.btn-sweet').css('background','')
        $('.btn-sweet').css('color','')
        const el = document.querySelector(`#${e.target.id}`);
        el.style.backgroundColor = "blue"
        el.style.color = "white"
    }
    return (
        <div className="col-md-12">
            <div className="row">
            {
                dataLi.map((val, key) => {
                    return (
                        <div className="btn btn-light btn-elevate btn-sweet" key={key} id={`sweet-${val.id}`} onClick={handleClick}>
                            {val.title}
                        </div>   
                         
                    )
                })
            }
                
            </div>
         
        </div>     
        
    )
}


