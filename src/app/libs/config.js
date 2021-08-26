import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
export const host = "http://172.168.2.4:81";
export const Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3Q1NTU1ZHNmZHMiLCJwYXNzd29yZCI6IjEifQ.783MLtL0Zy8camMbvGk7nciKHQ6XBGAwlT9wZa8F8pw';///window.localStorage.getItem('TOKEN');  //'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3Q1NTU1ZHNmZHMiLCJwYXNzd29yZCI6IjEifQ.783MLtL0Zy8camMbvGk7nciKHQ6XBGAwlT9wZa8F8pw';

export function Auth(){
    const { auth} = useSelector(
        (state) => ({ 
          auth:state.auth
         }),
        shallowEqual
      );
    return auth;
}