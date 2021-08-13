import { Card, Modal, Container, Row, Col, Table } from 'react-bootstrap'
import React, { useMemo } from 'react'
import { Formik, Form, Field } from "formik";
import { useLang, setLanguage } from "./../../../../../../../_metronic/i18n";
import { usePuyPursUIContext } from "./../../PuyPursUIContext";
import { Tables1 } from './tab2/tables1'
import { Tables2 } from './tab2/tables2'

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



export function Tab2() {

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
                        <Tables1 itemRow={[]} />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
            <div className="col-12">
                <div className="row">
                    <div className="col-md-12">
                        <Modal.Header>
                        <Modal.Title>รับแล้ว</Modal.Title>
                        <div className="d-flex">
                            <div className="mr-auto"></div>
                            <div>
                            <button
                                type="button"
                                className="btn btn-sm btn-primary btn-elevate"
                            >
                                ปริ้นบาร์โค้ด
                            </button>
                            <> </>
                            <button
                                type="button"
                                className="btn btn-sm btn-primary btn-elevate"
                            >
                                ปริ้นคิวอาร์โค้ด
                            </button>
                            <> </>
                            <button
                                onClick={handleClick}
                                type="button"
                                className="btn btn-sm btn-primary btn-elevate"
                            >
                                สร้างใบรับสินค้า
                            </button>
                            </div>
                        </div>
                       
                        </Modal.Header>
                    </div>                    
                </div>
            </div>
            <div className="col-md-12 pt-3 pb-3" >
                <div className="row">
                    <div className="col-md-12">
                        <Tables2 itemRow={[]} />
                    </div>
                </div>
            </div>

        </>

    )

}