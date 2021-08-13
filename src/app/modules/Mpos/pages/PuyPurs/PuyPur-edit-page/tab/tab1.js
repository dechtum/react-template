import { Card, Modal, Container, Row, Col, Table } from 'react-bootstrap'
import React from 'react'
import { Formik, Form, Field } from "formik";
import { useLang, setLanguage } from "./../../../../../../../_metronic/i18n";
import { Tables } from './tab1/tables'

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



export function Tab1() {
    return (
        <>
            <div className="col-md-12 pt-3 pb-3" >
                <div className="row">
                    <div className="col-md-4">
                        <Field
                            name="firstName"
                            component={Select}
                            placeholder="วันที่สั่ง"
                            label="วันที่สั่ง"
                            sublabel=""
                        />
                    </div>
                    <div className="col-md-4">
                        <Field
                            name="firstName"
                            component={Select}
                            placeholder="วันที่ส่งสินค้า"
                            label="วันที่ส่งสินค้า"
                            sublabel=""
                        />
                    </div>
                    <div className="col-md-4">
                        <Field
                            name="firstName"
                            component={Select}
                            placeholder="ภาษี"
                            label="ภาษี"
                            sublabel=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Field
                            name="firstName"
                            component={Input}
                            placeholder="ผู้สั่ง"
                            label="ผู้สั่ง"
                            sublabel=""
                        />
                    </div>
                    <div className="col-md-4">
                        <Field
                            name="firstName"
                            component={Input}
                            placeholder="โทรศัพท์"
                            label="โทรศัพท์"
                            sublabel=""
                        />
                    </div>
                    <div className="col-md-4">
                        <Field
                            name="firstName"
                            component={Input}
                            placeholder="สถานที่ส่ง"
                            label="สถานที่ส่ง"
                            sublabel=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        <Field
                            name="firstName"
                            cols="5"
                            component={Textarea}
                            type="textarea"
                            placeholder="แสดงที่อยู่ในการจัดส่ง"
                            label="แสดงที่อยู่ในการจัดส่ง"
                            sublabel=""
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Field
                            name="firstName"
                            cols="5"
                            component={Textarea}
                            type="textarea"
                            placeholder="หมายเหตุ"
                            label="หมายเหตุ"
                            sublabel=""
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
            <div className="col-12">
                <Modal.Header>
                    <Modal.Title>ข้อมูลซัพพลายเออร์</Modal.Title>
                </Modal.Header>
            </div>

            <div className="col-md-12 pt-3 pb-3" >
                <div className="row">
                    <div className="col-md-6">
                        <SITMore name="emtitle" label={useLang() == 'en' ? 'more' : 'เพิ่มเติม'} />
                        <Field
                            name="firstName"
                            component={Input}
                            placeholder="ค้นหน้ารายชื่อ  (Auto Complete)"
                            label="บริษัท/ร้านค้า"
                            sublabel="กรอกชื่อบริษัทหรือชื่อร้านค้า"
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="firstName"
                            component={Input}
                            placeholder="ผู้ติดต่อ"
                            label="ผู้ติดต่อ"
                            sublabel=""
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Field
                            name="firstName"
                            component={Textarea}
                            placeholder="แสดงที่อยู่ บริษัท"
                            label="แสดงที่อยู่ บริษัท"
                            sublabel=""
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            name="firstName"
                            component={Textarea}
                            placeholder="แสดงข้อมูลผู้ติดต่อ"
                            label="แสดงข้อมูลผู้ติดต่อ"
                            sublabel=""
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
            <div className="col-12">
                <Modal.Header>
                    <Modal.Title>รายการ</Modal.Title>
                </Modal.Header>
            </div>

            <div className="col-md-12 pt-3 pb-3" >
                <Tables itemRow={[]} />
            </div>


        </>

    )
}