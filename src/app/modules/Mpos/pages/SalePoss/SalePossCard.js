import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { SalePossFilter } from "./SalePoss-filter/SalePossFilter";
import { SalePossTable } from "./SalePoss-table/SalePossTable";
import { SaleTable } from "./SalePoss-table/SaleTable";
import { PricePossTable } from "./SalePoss-table/PricePossTable";
import { ClassifiedPossTable } from "./SalePoss-table/ClassifiedPossTable";
import { SalePossGrouping } from "./SalePoss-grouping/SalePossGrouping";
import { useSalePossUIContext } from "./SalePossUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function SalePossCard() {
  const SalePossUIContext = useSalePossUIContext();
  const SalePossUIProps = useMemo(() => {
    return {
      ids: SalePossUIContext.ids,
      newSalePosButtonClick: SalePossUIContext.newSalePosButtonClick,
      newShopsPageCreshopButtonClick: SalePossUIContext.newShopsPageCreshopButtonClick,
    };
  }, [SalePossUIContext]);

  return (
    <Card>
      <CardHeader title={useLang()=='en'?"Best seller":"สินค้าขายดี"}>     
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>       
        {SalePossUIProps.ids.length > 0 && <SalePossGrouping />}
        <SaleTable />
      </CardBody>
      <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
      <CardHeader title={useLang()=='en'?"Classified products":"สินค้าแยกประเภท"}>     
        <CardHeaderToolbar>
          
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody> 
        {SalePossUIProps.ids.length > 0 && <SalePossGrouping />}
        <ClassifiedPossTable />
      </CardBody>     
      <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
      <CardHeader title={useLang()=='en'?"Sale items":"รายการขาย"}>     
        <CardHeaderToolbar>
          
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody> 
        {SalePossUIProps.ids.length > 0 && <SalePossGrouping />}
        <SalePossTable />
      </CardBody>
      <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
      <CardFooter className=" col-12  pl-3 pr-3" >
        <div style={{width:'100%'}} className="p-3">
        <div className="d-flex" style={{width:'100%'}}>
          <div className="ml-auto" >
           
            <> </>
            <button
              type="submit"
              onClick={() => alert()}
              className="btn btn-primary btn-elevate"
            >
              สร้างการขาย
            </button>
          </div>
        </div>
        </div>
      </CardFooter>
      <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
    </Card>
  );
}
