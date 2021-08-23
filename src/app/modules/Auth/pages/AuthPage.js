/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { useLang, setLanguage } from './../../../../_metronic/i18n' 

export function AuthPage() {
  const [lang,setLang]=React.useState(useLang())
  function handleClick(name){
    setLanguage(name)
    setLang(name)
  }
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-1.jpg")})`,
            }}
          > 
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  {lang=='en'?'Welcome to MPOS Service':'ยินดีต้อนรับสู่บริการ MPOS'}
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  {lang=='en'?'Service to help manage sales work for you.':'บริการช่วยจัดการงานขายเพื่อคุณ'}
                  
                 
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  &copy; 2021 {lang=='en'?'Soft In Tech':'ซอฟต์ อิน เทค'}
                </div>
                <div className="d-flex">
                  <Link to="/terms" className="text-white">
                   {lang=='en'?'Privacy':'ความเป็นส่วนตัว'}
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    {lang=='en'?'Contact':'ติดต่อ'}
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              <span className="mr-6">
                <a onClick={()=>handleClick('th')}>TH</a>
                <label className="mr-1 ml-1">|</label>
                <a onClick={()=>handleClick('en')}>EN</a>
              </span>
              <span className="font-weight-bold text-dark-50">
                 {lang=='en'?"Don't have an account yet ?":'ไม่มีบัญชี ?'}
              </span>
              <Link
                to="/auth/registration"
                className="font-weight-bold ml-2"
                id="kt_login_signup"
              >
                {lang=='en'?"Sign Up!":'สร้างบัญชี ?'}
              </Link>
            </div>
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2021 {lang=='en'?'Soft In Tech':'ซอฟต์ อิน เทค'}
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
              <Link to="/terms" className="text-white">
                   {lang=='en'?'Privacy':'ความเป็นส่วนตัว'}
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    {lang=='en'?'Contact':'ติดต่อ'}
                  </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
