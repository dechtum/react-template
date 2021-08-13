import { Card, Modal, Container, Row, Col, Table } from 'react-bootstrap'
import React, { useMemo } from 'react'
import { Formik, Form, Field } from "formik";
import { useLang, setLanguage } from "./../../../../../../../_metronic/i18n";
import { usePuyPursUIContext } from "./../../PuyPursUIContext";
import { Tables } from './tab3/table/table'

import {
    Input,
    Select,
    Textarea,
    Switch,
    Upload,
    SITMore,
    DatePickerField,
    AutoComplete,
} from "../../../../../../../_metronic/_partials/controls";



export function Tab3() {

    const PuyPursUIContext = usePuyPursUIContext();
    const PuyPursUIProps = useMemo(() => {
        return {
            ids: PuyPursUIContext.ids,
            openReciveButtonClick: PuyPursUIContext.openReciveButtonClick,
            newShopsPageCreshopButtonClick: PuyPursUIContext.newShopsPageCreshopButtonClick,
        };
    }, [PuyPursUIContext]);

    function handleClick(e) {
        PuyPursUIProps.openReciveButtonClick('i');
    }
    return (
        <>

            <div className="col-md-12 pt-3 pb-3" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex">
                            <div className="mr-auto"></div>
                            <div>
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className="btn btn-sm btn-primary btn-elevate"
                                >
                                    สร้างใบสำคัญจ่าย
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="col-md-12 pt-3 pb-3" >
                <div className="row">
                    <div className="col-md-12">
                        <Tables itemRow={[]} />
                    </div>
                </div>
            </div>


        </>

    )
}