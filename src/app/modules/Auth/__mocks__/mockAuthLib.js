import {ajax} from 'sit-fetch'
import {Token,host} from './../../../libs/config'
import React from 'react'
import userTableMock from "./userTableMock";
import {AjaxDataShopsCreshop} from './../../Mpos/__mocks__/ShopsCreshops/mockShopsCreshopLib'

export function SetDataLogin(usersname,password,reslove){
    new Promise((r,j)=>{
        let url = `${host}/login/admin` 

        ajax.Login(url,usersname,password,r)     
       
      })
      .then((v)=>{       
        if(v.statusCode==200){          
          if(v.data.type == "REQUEST_SUCCESS"){          
            const user = {
              id:parseInt(v.data.content.id),
              email:v.data.content.email,
              titlename:v.data.content.title_id,
              firstname:v.data.content.name,
              lasttname:v.data.content.surname,
              fullname:v.data.content.name +" "+ v.data.content.surname,
              username:usersname,
              password:password,
              roles: [parseInt(v.data.content.roles)], // Manager,
              phone:v.data.content.tel,
              accessToken: v.data.content.token,
              refreshToken: "access-token-"  + v.data.content.token,
              language: "th",
              pic: process.env.PUBLIC_URL + "/media/users/default.jpg"
            };    
            window.localStorage.setItem('TOKEN', v.data.content.token);
            userTableMock.push(user);    
            reslove(user)              
          }else{
            return false;
          }
        }else{
          return false;
        }
      })
      .catch((err)=>{
        return false;
      })
}

export function Forget(email,reslove){
  new Promise((r,j)=>{
      let url = "http://192.168.1.103:81/forgot"    
      let obj = {
        email:email
      }    
      ajax.Post(url,'',obj,r)     
    })
    .then((v)=>{  
      let obj = JSON.parse(v);
      if(obj.statusCode==200){          
        if(obj.data.type == "REQUEST_SUCCESS"){      
          reslove(obj.data.content)              
        }else{
          return false;
        }
      }else{
        return false;
      }
    })
    .catch((err)=>{
      return false;
    })
}