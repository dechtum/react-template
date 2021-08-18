import React, {useMemo} from "react";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import { useLang, setLanguage } from "../../../i18n";

export function Footer() {
  const [lang,setLang]=React.useState(useLang());
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true)
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">{today.toString()}</span> &copy;{" "}
          <a
            href="https://softintech.co.th"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-75 text-hover-primary"
          >
            {lang=='en'?'Soft In Tech':"ซอฟต์ อิน เทค"}
          </a>
        </div>
        <div className="nav nav-dark order-1 order-md-2">
          <a
            href="https://softintech.co.th"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link pr-3 pl-0"
          >
            {lang=='en'?'About':"เกี่ยวกับ"}
          </a>
          <a
            href="https://softintech.co.th"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-3"
          >
            {lang=='en'?'Team':"ทีม"}
          </a>
          <a
            href="https://softintech.co.th"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link pl-3 pr-0"
          >
           {lang=='en'?'Contact':"ติดต่อ"} 
          </a>
        </div>
      </div>
    </div>
  );
}
