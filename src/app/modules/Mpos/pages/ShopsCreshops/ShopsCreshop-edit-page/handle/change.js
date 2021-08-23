import React from "react";
import {store} from './../../Store'
import zipcodeTableMock from './../../../../__mocks__/ShopsCreshops/zipcodeTableMock'
import DistrictsTableMock from './../../../../__mocks__/ShopsCreshops/DistrictsTableMock'
import AmphuresTableMock from './../../../../__mocks__/ShopsCreshops/AmphuresTableMock'
import ProviceTableMock from './../../../../__mocks__/ShopsCreshops/ProviceTableMock'



export const handleChanges = async (e,state, setState) =>{
    let name = e.target.name;
    let value = e.target.value;

    switch (name) {
      case 'zipcode_id':
     
        if(value.length <6){
          setState({
            ...state,
            [name]:value
          })  
          if(value==''){
            setState({
              ...state,
              [name]:value,
              district_id:'',
              ampher_id:'',
              province_id:'',
            })  
          }               
        }
        if(value.length== 5 || value.length==6){   
                 
            const zcode = await zipcodeTableMock.filter(e=>e.zipcode == value);     
       
            if(zcode && zcode.length > 0){
                let arrDIS = [];
                zcode.forEach(element => {
                    const obj = DistrictsTableMock.filter(e => e.DISTRICT_CODE == element.district_code)                 
                    arrDIS.push(obj[0])
                });
                const arrAMPHUR = AmphuresTableMock.filter(e => e.AMPHUR_ID == arrDIS[0].AMPHUR_ID)   
                const arrPROVI = ProviceTableMock.filter(e => e.PROVINCE_ID == arrAMPHUR[0].PROVINCE_ID)   
                setState({
                    ...state,
                    [name]:value,
                    district_id:JSON.stringify(arrDIS),
                    ampher_id:JSON.stringify(arrAMPHUR),
                    province_id:JSON.stringify(arrPROVI),
                  })
            }
            //district_code  AMPHUR_ID
        } 
       
        break;    
      default:
  
        // setState({
        //   ...state,
        //   [name]:value
        // })
        break;
    }
}


