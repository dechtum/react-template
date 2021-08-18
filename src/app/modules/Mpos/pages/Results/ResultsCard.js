import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ResultsFilter } from "./Results-filter/ResultsFilter";
import { ResultsTable } from "./Results-table/ResultsTable";
import { ResultsTableMat } from "./Results-table-mat/ResultsTableMat";
import { ResultsGrouping } from "./Results-grouping/ResultsGrouping";
import { useResultsUIContext } from "./ResultsUIContext";
import { Link } from "react-router-dom";
import { useLang, setLanguage } from "./../../../../../_metronic/i18n";

export function ResultsCard() {
  const ResultsUIContext = useResultsUIContext();
  const ResultsUIProps = useMemo(() => {
    return {
      ids: ResultsUIContext.ids,
      newResultButtonClick: ResultsUIContext.newResultButtonClick,
      newShopsPageCreshopButtonClick: ResultsUIContext.newShopsPageCreshopButtonClick,
    };
  }, [ResultsUIContext]);

  return (
    <React.Fragment>
    <Card>
      <CardHeader title={useLang()=='en'?"Summary of sales today":"สรุปยอดขายวันนี้"}>
        <CardHeaderToolbar>
          <Link to="/dashboard">
          {useLang()=='en'?"back":"ย้อนกลับ"}
          </Link>

        </CardHeaderToolbar>

      </CardHeader>
      <CardBody>
        {/* <ResultsFilter  name="New"/> */}
        {ResultsUIProps.ids.length > 0 && <ResultsGrouping />}
        <ResultsTable />     
      </CardBody>
    </Card>
    <> </>
    <Card>
      <CardHeader title={useLang()=='en'?"Summary of raw materials used today":"สรุปวัตถุดิบที่ใช้วันนี้"}>
      </CardHeader>
      <CardBody>
        {/* <ResultsFilter  name="New"/> */}
        {ResultsUIProps.ids.length > 0 && <ResultsGrouping />}     
        <ResultsTableMat/>
      </CardBody>
    </Card>
    </React.Fragment>
    
  );
}
