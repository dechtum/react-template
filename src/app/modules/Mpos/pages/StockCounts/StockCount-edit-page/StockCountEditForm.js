// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Card, Modal, Tabs, Tab } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { StockCountEditDialogHeader } from "./StockCountEditDialogHeader";
import { Tables } from './matlist/table/table'
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";


import {
  Input,
  Select,
  Switch,
  Scaner,
  Baccode,
  DatePickerField,
  Textarea,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const StockCountEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  ipAddress: Yup.string().required("IP Address is required"),
});

export function StockCountEditForm({
  saveStockCount,
  StockCount,
  actionsLoading,
  onHide,
  id,
}) {
  const [lang, setLang] = React.useState(useLang());
  const [doc, setDoc] = React.useState(false);
  const [state, setState] = React.useState({
    scanner: false,
    active: false
  })
  const handleChange = (e, name) => {
    console.log(e.target.checked);
    setState({ ...state, [name]: e.target.checked });
  }
  const handleOpenScan = () =>{
   
    setState({
      ...state,
      scanner: (state.scanner?false:true)
    })
  }
  const handleClick = (e, name) => {
  
    console.log(e.target.name);
    setState({
      ...state,
      scanner: e.target.name
    })
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={StockCount}
        // validationSchema={StockCountEditSchema}
        onSubmit={(values) => {
          saveStockCount(values);
        }}
      >
        {({ handleSubmit }) => (
          <div className="row" >
            <Modal.Body className="overlay overlay-block cursor-default col-12">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="row" style={{ display: state.scanner? 'block' : 'none' }}>
                  <Card className="col-md-4 pt-3 pb-3">
                    <div className="row">
                      <div className="col-12">
                        <Scaner />
                      </div>                      
                    </div>
                  </Card>

                </div>
                <div className="row">
                  <Card className="col-md-12">
                    <StockCountEditDialogHeader id={id} onHide={onHide} />
                    <div className="row pt-3 d-flex">
                      {/* First Name */}
                      <div className="form-group  col-lg-1">
                        <input type="rext" name="f1" className="form-control" readOnly={true} placeholder="คีย์" />
                      </div>
                      <div className="form-group  col-lg-3">
                        <input type="rext" name="f2" className="form-control" placeholder="รหัสวัตถุดิบ" />
                      </div>
                      <div className="form-group  col-lg-3">
                        <input type="rext" name="f3" className="form-control" placeholder="ชื่อวัตถุดิบ" />
                      </div>
                      <div className="form-group  col-lg-3">
                        <input type="rext" name="f4" className="form-control" placeholder="จำนวน" />
                      </div>
                      <div className="form-group col-xl-2 d-flex justify-content-end mr-auto">
                        <div>
                          <div type="button" className="btn btn-light btn-elevate" name="qrcode" onClick={() => handleOpenScan()}>
                            <i className="fas fa-qrcode"></i>
                          </div>
                        </div>

                        <> </>
                        <div className="mr-auto">
                          <button
                            type="submit"
                            onClick={() => handleSubmit()}
                            className="btn btn-primary btn-elevate "
                          >
                            เพิ่มรายการ
                          </button>
                        </div>

                      </div>
                    </div>
                  </Card>
                </div>
                <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
                <div className="row">
                  <Card className="col-md-12">
                    <Modal.Header >
                      <Modal.Title id="example-modal-sizes-title-lg">รายการวัตถุดิบ</Modal.Title>
                      <div
                        type="submit"
                        className="btn btn-hover"
                        onClick={() => {
                          if(doc){
                            setDoc(false);
                          }else{
                            setDoc(true)
                          }
                        }}
                        className="btn btn-primary btn-elevate"
                      >
                        สร้างเอกสาร
                      </div>
                    </Modal.Header>
                    <Tables />
                  </Card>
                </div>
                <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
                <div className="row" style={{display:doc?'block':'none'}}>
                  <Card className="col-md-12" style={{ height: "100%" }}>
                    <Modal.Header >
                      <Modal.Title id="example-modal-sizes-title-lg">สร้างเอกสาร</Modal.Title>
                    </Modal.Header>
                    <div>

                    </div>

                    <div className="form-group row">
                      {/* First Name */}
                      <div className="col-lg-6">
                        <Field
                          name="firstName"
                          component={Input}

                          placeholder="เลขเอกสาร"
                          label="เลขเอกสาร"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <Field
                          name="firstName"
                          component={Input}

                          placeholder="แสดงวันที่ปัจจุบัน"
                          label="วันที่"
                        />
                      </div>
                      <div className="col-lg-6">
                        <Field
                          name="firstName"
                          component={Input}

                          placeholder="ผู้นับ"
                          label="แสดงรายชื่อผู้ Login"
                        />
                      </div>

                    </div>
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <Field
                          name="firstName"
                          component={Input}

                          placeholder="แสดงเวลาเริ่มนับ (เมื่อเปิดมาหน้านี้)"
                          label="เวลาเริ่ม"
                        />
                      </div>
                      <div className="col-lg-6">
                        <Field
                          name="firstName"
                          component={Input}

                          placeholder="แสดงเวลาสิ้นสุด (เมื่อกดปุ่มบันทึก"
                          label="เวลาสิ่นสุด"
                        />
                      </div>

                    </div>
                    <div className="form-group row">
                      <div className="col-lg-12">
                        <Field
                          name="firstName"
                          component={Textarea}

                          placeholder="หมายเหตุ"
                          label="หมายเหตุ"
                        />
                      </div>
                    </div>
                  </Card>
                </div>


              </Form>
            </Modal.Body>
            <Modal.Footer className=" col-12  pl-3 pr-3"  style={{display:doc?'block':'none'}}>
              <Card style={{ width: '100%' }} className="p-3">
                <div className="d-flex" style={{ width: '100%' }}>
                  <div
                    className="mr-auto "
                  >
                    <Switch onChange={(e) => handleChange(e, 'active')} checked={state.active} />
                  </div>
                  <div className="ml-auto" >
                    <button
                      type="button"
                      onClick={onHide}
                      className="btn btn-light btn-elevate"
                    >
                      Cancel
                    </button>
                    <> </>
                    <button
                      type="submit"
                      onClick={() => handleSubmit()}
                      className="btn btn-primary btn-elevate"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Card>

            </Modal.Footer>
          </div>
        )}
      </Formik>
    </>
  );
}
