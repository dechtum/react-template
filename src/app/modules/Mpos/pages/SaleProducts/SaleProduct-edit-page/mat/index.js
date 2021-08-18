
import React  from 'react'
import ReactDOMServer from 'react-dom/server';
import { Formik, Form, Field } from "formik";
import $ from 'jquery'
import {
    Input,
    Select,
    AutoComplete,
    DatePickerField,
    AntSwitchs
} from "../../../../../../../_metronic/_partials/controls";
import { toAbsoluteUrl, checkIsActive } from "../../../../../../../_metronic/_helpers"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './css.css'
import { Table, Tabs, Tab, Card } from 'react-bootstrap';
import {TrItem} from './TrItem'
import {json_decode,json_encode} from './json'

export function Mat({Detail}) {   
    const [state,setState]=React.useState({
        edit:false,
        detail:Detail,
        activate:true,
        keytab:0,
        del:false
    })
    function handleChange(e) {
        let value = e.target.value;
        let id = (e.target.id.split('-'))[1];
        console.log(value);
        const newDetail = json_decode(state.detail).map((val, key) => {            
            return(
               {
                ...val,
                title:id == val.id?value:val.title
               }
            )
        })
        setState({
            ...state,
            detail:json_encode(newDetail)
        }) 
      
    };
    function handelAdd(){
        const obj = json_decode(state.detail);
        if(obj[obj.length-1]['title']!=""){
            obj.push({
                'id': (parseInt(obj[obj.length-1]['id']) +1), 'title': '', 'items': []
            })
            setState({
                ...state,
                detail:json_encode(obj)
            })  
        }        
    }
    function handelAddRow(id){
        const obj = json_decode(state.detail);
        const item = (items) =>{
            console.log(items);
            if(items.length>0){
                items.push({ 'id':  (parseInt(items[items.length-1]['id']) +1), 'name': '', 'number': '', 'unit': '' })
            }else{
                items.push({ 'id':  1, 'name': '', 'number': '', 'unit': '' })
            }
            return items;
        }
        const newObj = obj.map((val,key)=>{
            return(
                {
                    ...val,
                    items:id==val.id?item(val.items):val.items
                }
            )
        })
        
        setState({
            ...state,
            detail:json_encode(newObj)
        })     
    }
    function handelEdit(){        
        setState({
            ...state,
            edit:state.edit?false:true
        })  
    }
    function handleDel(id){
        let tab = state.keytab
        const obj = json_decode(state.detail);
        const item = (items,id) =>{ 
            const obj = items.map((val,key)=>{
                return val.id != id ? val : undefined
            })        
            let _obj = obj.filter(e => e != undefined);
            
            let i = 0;
            const out = _obj.map((val,key)=>{
                return(
                    {
                        ...val,
                        id:(key+1)
                    }
                )
            })
            return out
        }

        const newObj = obj.map((val,key)=>{
            return(
                {
                    ...val,
                    items:tab!=val.id?val.items:item(val.items,id)
                }
            )
        })
        setState({
            ...state,
            detail:json_encode(newObj)
        })
    }
    function handleDelTitle(id){
      
        const obj = json_decode(state.detail);
        const newObj = obj.map((val,key)=>{
            return val.id != id ? val : undefined;
        })
        let _obj = newObj.filter(e => e != undefined);
        console.log(_obj);
        setState({
            ...state,
            detail:json_encode(_obj)
        })
      
    }

    
    let objs =  json_decode(state.detail)||[]; 
    React.useEffect(()=>{
        setState({
            ...state,
            detail:Detail,
            keytab:state.keytab||(typeof objs == 'object' ? objs[0]['id']: 0)
        })  
    },[Detail])
    
    
    return (         
        <div className={"col-md-12 mt-2"}>         
            <Tabs 
            defaultActiveKey={state.keytab||(typeof objs == 'object' ? objs[0]['id']: 0)} 
            transition={false} 
            id="noanim-tab-example"
            onSelect={(k)=>{
                setState({
                    ...state,
                    keytab:k
                }) 
            }}
            >
                {                    
                    json_decode(state.detail).map((val, key) => { 
                        return (
                            <Tab eventKey={val.id || 0} title={<span className="pane-tab"><span  style={{display:state.edit?'none':'block'}}>{val.title}</span><span style={{display:state.edit?'block':'none'}}><input type="text" className="b-line"  id={`mat-${val.id}`} value={val.title} onChange={handleChange}></input><span className="btn-del"><div className="btn text-primary" onClick={()=>handleDelTitle(val.id)}>ลบ</div></span></span></span>} key={key} className={"mt-2 mb-2"}>                                
                                <Table responsive >
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>รายการวัตถุดิบ</th>
                                            <th>จำนวน</th>
                                            <th>หน่วย</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Formik
                                            initialValues={val.items}>
                                            <TrItem items={val.items} onClick={handleDel} />
                                        </Formik>
                                        
                                    </tbody>
                                </Table>
                            </Tab>
                        )
                    })
                }
               <Tab title={<span className="d-flex"><div className="btn btn-light mr-2" onClick={handelAdd} style={{display:state.edit?'block':'none'}}>เพิ่ม</div><div className="btn btn-light" onClick={handelEdit}>{state.edit?`ตกลง`:`แก้ไข`}</div></span>} className={"mt-2 mb-2"} ></Tab>
            </Tabs> 
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                    <div
                       
                        onClick={ () => handelAddRow(state.keytab)}
                        className="btn btn-primary btn-elevate"
                    >
                        เพิ่ม
                    </div>
                    </div>                    
                </div>
            </div>           
        </div>

    )
}


