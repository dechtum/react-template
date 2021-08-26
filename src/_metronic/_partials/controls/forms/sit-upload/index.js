import React from 'react'
import { Button, Card, Jumbotron, Modal, ProgressBar, InputGroup, FormControl, Image } from "react-bootstrap";
import { ajax } from 'sit-fetch'
import { host } from './../../../../../app/libs/config'
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

var count = 0;
var inTime;
export function Upload({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    label,
    withFeedbackLabel = true,
    customFeedbackLabel,
    auth,
    id,
    toast,
    type = "text",
    setTempfiel,
    pictureContent,
    setPictureContent,
    ...props
}) {
    let choose;
    const [state, setState] = React.useState({
        fname: '',
        file: '',
        fobj: '',
        now: 0
    })
    const[lang,setLang]=React.useState(useLang())
    function handleClick(e) {
        if (inTime != undefined) {
            clearTimeout(inTime)
            setState({
                ...state,
                fname: state.fname,
                file: state.file,
                fobj: state.fobj,
                now: 0
            })
        }
        choose.click()
    }
    function handleChange(e) {
        const [file] = e.target.files
        if (file == undefined) {

        } else {            
            setState({
                ...state,
                fname: file.name,
                file: file,
                fobj: URL.createObjectURL(file),
                now: 0
            })
        }
    }
    function handleUpload(e) {
    
        if (state.fobj != "") {
            // upload
            count = 10
            setState({
                ...state,
                fname: state.fname,
                file: state.file,
                fobj: state.fobj,
                now: count
            })
            inTime = setInterval(() => {
                setState({
                    ...state,
                    fname: state.fname,
                    file: state.file,
                    fobj: state.fobj,
                    now: count += 20
                })
                setPictureContent(state.fobj);
                if (count > 80) {
                    clearTimeout(inTime)
                }
            }, 1000);
            Ajaxs(inTime);
        }
    }
    const getLastID = (resolve) =>{
        let url = `${host}/lastid`;
        let token = auth.authToken
        let obj = {
            action:"member_shop",
            registerId: auth.user.id,
            shopId:""          
        }
        new Promise((r,j)=>{
            ajax.Post(url, token, obj, r);
        })
        .then((v)=>{           
            let obj = JSON.parse(v)                    
            if(obj.statusCode == 200 && obj.data.type == 'REQUEST_SUCCESS'){
                resolve(parseInt(obj.data.content)+1)
            } 
        })
       
    }
    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

    function Ajaxs(inTime) {
        toDataURL(state.fobj)
        .then(async (dataUrl) => {
            const lastId = await new Promise((r,j)=>getLastID(r))    
              
            let obj = {
                id: id?id:lastId,
                folder: auth.user.id,
                name: state.fname,
                images: [
                    dataUrl
                ]
            }
            let url = `${host}/upload`;
            let token = auth.authToken
       
            new Promise((r, j) => {
             
                ajax.Post(url, token, obj, r)
            })
                .then((v) => {                
                    let obj = JSON.parse(v)                    
                    if(obj.statusCode == 200 && obj.data.type == 'REQUEST_SUCCESS'){
                        setState({
                            ...state,
                            now: 100
                        })
                        clearTimeout(inTime)
                        setTimeout(() => {
                            setState({
                                ...state,
                                now: 0
                            })
                            toast.info(lang=='en'?'Succeed':'สำเร็จ',{
                                autoClose: 1000,
                            });
                            setTempfiel(JSON.stringify(obj.data.content))
                        }, 1000);
                    }                    
                })
        })
    }
 
   React.useEffect(()=>{
    setState({
        ...state,
        fobj:pictureContent
    })
   },[pictureContent])

    return (
        <React.Fragment>
            <Jumbotron style={{ overflowY: state.fobj == "" ? '' : 'scroll', msOverflowStyle: 'none', height: '24em' }}>
                <span style={{ display: 'none' }}>
                    <input  
                        {...field}
                        {...props}
                        onChange={handleChange} ref={input => choose = input} type="file" accept=".png,.jpg,.jpeg" />
                </span>
                {state.fobj == ""
                    ? <span style={{ height: '20em' }}>
                        <h1>{lang=='en'?"illustration":"ภาพประกอบ"}</h1>
                        <p>
                            {lang=='en'?"Select the desired image.":"เลือกรูปภาพที่ต้องการ"} 
                            {lang=='en'?"and press upload":"และกดอัพโหลด"}
                        </p>
                    </span>
                    : <Image src={state.fobj} thumbnail />
                }
            </Jumbotron>
            <InputGroup>
                <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    readOnly={true}
                    value={state.fname}
                />
                <InputGroup.Append>
                    <Button onClick={handleUpload} variant="outline-secondary">{lang=='en'?"Upload":"อ๊ฟโหลด"}</Button>
                    <Button onClick={handleClick} variant="outline-secondary">{lang=='en'?"Select picture":"เลือกรูปภาพ"}</Button>
                </InputGroup.Append>
            </InputGroup>
            <span style={{ display: state.now == 0  ? 'none' : 'block' }}>
                <ProgressBar striped variant="success" now={state.now} />
            </span>
        </React.Fragment>

    )
}