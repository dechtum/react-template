import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import './css.css'


export function Baccode({setStopStream,getData}) {
    const [data, setData] = React.useState("Scan QRcode or Brcode");
    const [flash, setFlash] = React.useState(false);
    const [stop, setStop] = React.useState(false);
    const onError = (error) => {
        if (error.name === "NotAllowedError") {
            setData(error.message)
          // Handle messaging in our app after the user chooses to not allow the camera permissions
        }
      };
      React.useEffect(()=>{
       // setStop(setStopStream||false)
      },[setStopStream])
   
    function handleClick(e){  
        console.log(e);
        switch (e) {
            case 'flash':
                if(flash){
                    setFlash(false)
                }else{
                    setFlash(true)
                }
                break;
           case 'power':
                if(stop){
                    setStop(false)
                }else{
                    setStop(true)
                }
                break;
        
            default:
                break;
        }      
        
    }
    return (
        <div className="pane">
            
            <div className="masks">
                <div className="maskTL"></div>
                <div className="maskTR"></div>
                <div className="maskBL"></div>
                <div className="maskBR"></div>
                <div className={stop?"":'maskScal'} >
                    <div className={stop?"":"maskScalL"}></div>
                    <div className={stop?"":"maskScalR"}></div>
                </div>
                <BarcodeScannerComponent
                    width={'100%'}
                    height={'100%'}
                    delay={500}
                    torch={flash}
                    stopStream={stop}
                    onError={onError}
                    onUpdate={(err, result) => {
                        if (result){
                            setData(result.text);
                            setStop(true)
                            if(getData!=undefined){
                                getData(result.text);
                            }
                        }else{
                            //setData("Scan QRcode or Brcode");
                        }                       
                    }}
                />                
            </div>           
            <div className="resultFa">
                <PlayCircleFilledWhiteIcon className="resultFa-btn" name="power" style={{ color:stop?'white':'red'}} onClick={(e) => handleClick("power")}/>
                <OfflineBoltIcon className="resultFa-btn" name="flash" style={{ color:flash?'red':'white'}} onClick={(e) => handleClick('flash')}/>
            </div>
            <div className="resultT"><center>MCS Scanner</center></div>
            <div className="resultB"><center>{data}</center></div>
        </div>

    );

}