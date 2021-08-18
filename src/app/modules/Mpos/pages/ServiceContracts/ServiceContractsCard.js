import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ServiceContractsFilter } from "./ServiceContracts-filter/ServiceContractsFilter";
import { ServiceContractsTable } from "./ServiceContracts-table/ServiceContractsTable";
import { ServiceContractsGrouping } from "./ServiceContracts-grouping/ServiceContractsGrouping";
import { useServiceContractsUIContext } from "./ServiceContractsUIContext";
import { Payment } from "./Payment/Payment";
import { Address } from "./Address/Address";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function ServiceContractsCard() {
  const [lang,setLang]=React.useState(useLang())
  const ServiceContractsUIContext = useServiceContractsUIContext();
  const ServiceContractsUIProps = useMemo(() => {
    return {
      ids: ServiceContractsUIContext.ids,
      newServiceContractButtonClick: ServiceContractsUIContext.newServiceContractButtonClick,
      newShopsPageCreshopButtonClick: ServiceContractsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [ServiceContractsUIContext]);

  return (
    <div className="row">
      <div className="col-md-6">
        <Card>
          <CardHeader title={lang=='en'?'Payment method':'ช่องทางการชำระเงิน'}>            

          </CardHeader>
          <CardBody>
            {ServiceContractsUIProps.ids.length > 0 && <ServiceContractsGrouping />}
            <Payment />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6">
        <Card>
          <CardHeader title={lang=='en'?'Receipt/Tax Invoice Address':'ที่อยู่ใบเสร็จ/ใบกำกับภาษี'}>
          </CardHeader>
          <CardBody>
            {ServiceContractsUIProps.ids.length > 0 && <ServiceContractsGrouping />}
            <Address />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-12">
        <Card>
          <CardHeader title={lang=='en'?'History':'ประวัติ'}>

          </CardHeader>
          <CardBody>
            {/* <ServiceContractsFilter  name="New"/> */}
            {ServiceContractsUIProps.ids.length > 0 && <ServiceContractsGrouping />}
            <ServiceContractsTable />
          </CardBody>
        </Card>
      </div>
    </div>

  );
}
