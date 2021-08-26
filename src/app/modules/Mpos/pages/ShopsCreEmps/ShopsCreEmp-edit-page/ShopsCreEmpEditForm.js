// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ShopsCreEmpEditDialogHeader } from "./ShopsCreEmpEditDialogHeader";
// import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import TitleTableMock from './../../../__mocks__/center/TitleTableMock'
import PositionTableMock from './../../../__mocks__/center/PositionTableMock'
import ShopTableMock from './../../../__mocks__/center/ShopTableMock'
import * as actions from "../../../_redux/ShopsCreEmps/ShopsCreEmpsActions";
import { useShopsCreEmpsUIContext } from "./../ShopsCreEmpsUIContext";
import { ToastContainer, toast } from 'react-toastify';
import { Delete } from '../../../__mocks__/center/mockTitlenameLib'
import { Delete as pDelete } from '../../../__mocks__/center/mockPositionLib'
import 'react-toastify/dist/ReactToastify.css';
import { handleChanges } from './handle'
import ProviceTableMock from './../../../__mocks__/ShopsCreshops/ProviceTableMock'
import AmphuresTableMock from './../../../__mocks__/ShopsCreshops/AmphuresTableMock'
import DistrictsTableMock from '../../../__mocks__/ShopsCreshops/DistrictsTableMock'


import {
  Input,
  Select,
  Switch,
  Upload,
  SITMore,
  SITSelect,
  DatePickerField,
  Textarea,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ShopsCreEmpEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(200, "Maximum 200 symbols")
    .required("Firstname is required"),
  surname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(200, "Maximum 200 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),

});

export function ShopsCreEmpEditForm({
  saveShopsCreEmp,
  ShopsCreEmp,
  actionsLoading,
  onHide,
  id,
  useLang,
  auth
}) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    zipcode_id: '',
    district_id: '',
    district_id_setID: '',
    district_id_setNAME: '',
    ampher_id: '',
    ampher_id_setID: '',
    ampher_id_setNAME: '',
    province_id: '',
    province_id_setID: '',
    province_id_setNAME: '',
    active: true,
    checkDel: false
  })
  const [tempfile, setTempfiel] = React.useState('');
  const [pictureContent, setPictureContent] = React.useState('');
  const [onsave, setOnsave] = React.useState(false);


  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      newTitleEmpButtonClick: ShopsCreEmpsUIContext.newTitleEmpButtonClick,
      newPositionEmpButtonClick: ShopsCreEmpsUIContext.newPositionEmpButtonClick,
    };
  }, [ShopsCreEmpsUIContext]);

  React.useEffect(() => {
    setState({
      ...state,      
      active: ShopsCreEmp.status,
      zipcode_id: ShopsCreEmp.zipcode_id,
      district_id_setID: ShopsCreEmp.district_id,
      ampher_id_setID: ShopsCreEmp.ampher_id,
      province_id_setID: ShopsCreEmp.province_id,
    });
    setTempfiel(ShopsCreEmp.picture)
    setPictureContent(ShopsCreEmp.pictureContent)
  }, [ShopsCreEmp])

  const aN = AmphuresTableMock.filter(e => e.AMPHUR_ID == state.ampher_id_setID);
  const pN = ProviceTableMock.filter(e => e.PROVINCE_ID == state.province_id_setID);
  const dN = DistrictsTableMock.filter(e => e.DISTRICT_ID == state.district_id_setID);

  React.useLayoutEffect(() => {
    setState({
      ...state,
      ampher_id_setNAME: aN.length == 0 ? '' : aN[0].AMPHUR_NAME,
      province_id_setNAME: pN.length == 0 ? '' : pN[0].PROVINCE_NAME,
      district_id_setNAME: dN.length == 0 ? '' : dN[0].DISTRICT_NAME
    });
  }, [aN.length != 0, pN.length != 0, dN.length != 0])

  const handleChange = (e, name,setFieldValue) => {
    switch (name) {
      case 'district_id_setID':
        setState({ ...state, [name]: e.target.value });
        setFieldValue(name,e.target.value[0].DISTRICT_ID) 
        break;
      default:
        setState({ ...state, [name]: e.target.checked });
        setFieldValue(name,e.target.checked ?1:0) 
        break;
    }
  }

  function handleClick(e) {
    console.log(e.target.name);
    switch (e.target.name) {
      case 'emtitle':
        ShopsCreEmpsUIProps.newTitleEmpButtonClick(e.target.name);
        break;
      case 'empos':
        ShopsCreEmpsUIProps.newPositionEmpButtonClick(e.target.name);
        break;
      default:
        break;
    }
  }

  function handelOptinDel(id, key, val, fname) {
    switch (fname) {
      case 'title_id':
        if (window.confirm(useLang == 'en' ? `Do you want to delete '${val}' ?` : `คุณต้องการจะลบ '${val}' ?`)) {
          new Promise((r, j) => {
            Delete(id, auth.user.id, auth.authToken, key, r)
          })
            .then((v) => {
              console.log(v);
              if (v != false) {
                setState({
                  ...state,
                  checkDel: state.checkDel ? false : true
                })
              }
            })
        }
        break;
      case 'position':
        if (window.confirm(useLang == 'en' ? `Do you want to delete '${val}' ?` : `คุณต้องการจะลบ '${val}' ?`)) {
          new Promise((r, j) => {
            pDelete(id, auth.user.id, auth.authToken, key, r)
          })
            .then((v) => {
              console.log(v);
              if (v != false) {
                setState({
                  ...state,
                  checkDel: state.checkDel ? false : true
                })
              }
            })
        }
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ShopsCreEmp}
        // validationSchema={ShopsCreEmpEditSchema}
        onSubmit={(values) => {
          
          setOnsave(true)
          const newDate = {
            ...values,
            picture: tempfile,
            pictureContent: pictureContent,
            status: state.active
          }

          setState({
            ...state,
            zipcode_id: '',
            district_id: '',
            district_id_setID: '',
            ampher_id: '',
            ampher_id_setID: '',
            province_id: '',
            province_id_setID: '',
            active: true
          });
        
          saveShopsCreEmp(newDate,setOnsave);
        }}
      >
        {({setFieldValue, handleSubmit }) => (
          <div className="row" >
            <Modal.Body className="overlay overlay-block cursor-default col-12">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right d-flex row">
                <Card className="col-md-4 pt-3 pb-3" style={{ height: "38vh" }}>
                  <Field
                    name="picture"
                    component={Upload}
                    setTempfiel={setTempfiel}
                    toast={toast}
                    auth={auth}
                    id={id}
                    pictureContent={pictureContent}
                    setPictureContent={setPictureContent}
                  />
                </Card>
                <> </>
                <Card className="col-md-8" aria-labelledby="example-modal-sizes-title-lg">
                  <ShopsCreEmpEditDialogHeader id={id} onHide={onHide} />
                  <div className="form-group row pt-5">
                    {/* First Name */}
                    <div className="col-lg-6">
                      <SITMore name="emtitle" label={useLang == 'en' ? 'more' : 'เพิ่มเติม'} onClick={handleClick} />
                      <Field
                        name="title_id"
                        component={SITSelect}
                        placeholder={useLang == 'en' ? "Name prefix" : "คำนำหน้าชื่อ"}
                        label={useLang == 'en' ? "Name prefix" : "คำนำหน้าชื่อ"}
                        sublabel={useLang == 'en' ? "Choose a name prefix" : "เลือกคำนำหน้าชื่อ"}
                        data={TitleTableMock}
                        handelDelete={handelOptinDel}
                        setFieldValue={setFieldValue}
                      >
                      </Field>
                    </div>

                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">

                      <Field
                        name="name"
                        component={Input}
                        placeholder={useLang == 'en' ? "" : "ชื่อ"}
                        label={useLang == 'en' ? "" : "ชื่อ"}
                        sublabel={useLang == 'en' ? "" : "ความยาวไม่เกิน 200 ตัวอักษร"}
                      />


                    </div>
                    {/* Login */}
                    <div className="col-lg-6">
                      <Field
                        name="surname"
                        component={Input}
                        placeholder={useLang == 'en' ? "" : "นามสกุล"}
                        label={useLang == 'en' ? "" : "นามสกุล"}
                        sublabel={useLang == 'en' ? "" : "ความยาวไม่เกิน 200 ตัวอักษร"}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="email"
                        type="email"
                        component={Input}
                        placeholder={useLang == 'en' ? "example@yourdomain.com" : "example@yourdomain.com"}
                        label={useLang == 'en' ? "Email" : "อีเมล"}
                      ></Field>
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="hire"
                        type="date"
                        component={Input}
                        placeholder={useLang == 'en' ? "mm/dd/yyyy" : "ด/ว/ป"}
                        label={useLang == 'en' ? "Hire Date" : "วันเริ่มงาน"}
                      ></Field>
                    </div>
                  </div>
                  <div className="form-group row">                    
                    <div className="col-lg-12">
                      <SITMore name="empos" label={useLang == 'en' ? 'more' : 'เพิ่มเติม'} onClick={handleClick} />
                      <Field
                        name="position"
                        component={SITSelect}
                        placeholder={useLang == 'en' ? "Position" : "ตำแหน่ง"}
                        label={useLang == 'en' ? "Position" : "ตำแหน่ง"}
                        sublabel={useLang == 'en' ? "Choose a position" : "เลือกตำแหน่ง"}
                        data={PositionTableMock}
                        handelDelete={handelOptinDel}
                        setFieldValue={setFieldValue}
                      ></Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="jd"
                        component={Input}
                        placeholder={useLang == 'en' ? "" : "ลักษณะงาน"}
                        label={useLang == 'en' ? "" : "ลักษณะงาน"}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="form-group row ">
                    <div className="col-lg-12">
                      <Field
                        name="address"
                        component={Input}
                        placeholder={useLang == 'en' ? "" : "ที่อยู่"}
                        label={useLang == 'en' ? "" : "ที่อยู่"}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="tel"
                        component={Input}
                        placeholder={useLang == 'en' ? "" : "โทรศัพท์"}
                        label={useLang == 'en' ? "" : "โทรศัพท์"}
                        customFeedbackLabel={useLang == 'en' ? "" : "หมายเลขโทรศัพท์"}
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="shop_id"
                        component={Select}
                        placeholder={useLang == 'en' ? "" : "สังกัด"}
                        label={useLang == 'en' ? "" : "สังกัด"}
                        customFeedbackLabel={useLang == 'en' ? "" : "พนักงานประจำร้าน"}
                      >
                        {
                          ShopTableMock.length > 0
                            ?
                            ShopTableMock.map((val, key) => {
                              return (
                                <option key={key}>{val.name}</option>
                              )
                            })
                            : ''
                        }
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row ">

                    {/* Login */}
                    <div className="col-lg-6">
                      <Field
                        type="number"
                        name="zipcode_id"
                        component={Input}
                        placeholder={useLang == 'en' ? "ZIP code" : "รหัสไปรษณีย์"}
                        label={useLang == 'en' ? "ZIP code" : "รหัสไปรษณีย์"}
                        value={state.zipcode_id}
                        onChange={(e) => handleChanges(e, state, setState,setFieldValue)}
                        sublabel=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="province_id"
                        component={Select}
                        placeholder={useLang == 'en' ? "Province" : "จังหวัด"}
                        label={useLang == 'en' ? "Province" : "จังหวัด"}
                        sublabel=""
                        disabled
                      >

                        {
                          state.province_id != ""
                            ?
                            (JSON.parse(state.province_id)).map((val, key) => {
                              return (
                                (state.province_id != ""
                                  ? <option value={val.PROVINCE_ID} key={key}>{val.PROVINCE_NAME}</option>
                                  : ''
                                )

                              )
                            })
                            : <option>{state.province_id_setNAME}</option>
                        }
                      </Field>
                    </div>


                  </div>
                  <div className="form-group row ">
                    <div className="col-lg-6">
                      <Field
                        name="ampher_id"
                        component={Select}
                        placeholder={useLang == 'en' ? "Aumpher" : "อำเภอ"}
                        label={useLang == 'en' ? "Aumpher" : "อำเภอ"}
                        sublabel=""
                        disabled
                        
                      >
                        {
                          state.ampher_id != ""
                            ?
                            (JSON.parse(state.ampher_id)).map((val, key) => {
                              return (
                                <option value={val.AMPHUR_ID} key={key} >{val.AMPHUR_NAME}</option>
                              )
                            })
                            : <option>{state.ampher_id_setNAME}</option>
                        }
                      </Field>
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="district_id"
                        component={Select}
                        onChange={(e) => handleChange(e, 'district_id_setID',setFieldValue)}
                        value={state.district_id_setID}
                        placeholder={useLang == 'en' ? "District" : "ตำบล"}
                        label={useLang == 'en' ? "District" : "ตำบล"}
                        customFeedbackLabel=""
                      >
                        {
                          state.district_id != ""
                            ?
                            (JSON.parse(state.district_id)).map((val, key) => {
                              return (
                                (val.DISTRICT_ID == state.district_id_setID
                                  ? <option value={val.DISTRICT_ID} key={key}>{val.DISTRICT_NAME}</option>
                                  : <option value={val.DISTRICT_ID} key={key} >{val.DISTRICT_NAME}</option>
                                )

                              )
                            })
                            : <option>{state.district_id_setNAME}</option>
                        }
                      </Field>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="username"
                        component={Input}
                        placeholder={useLang == 'en' ? "" : "ชื่อผู้ใช้"}
                        label={useLang == 'en' ? "" : "ชื่อผู้ใช้"}
                        sublabel=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="password"
                        component={Input}
                        type="password"
                        placeholder={useLang == 'en' ? "" : "รหัสผ่าน"}
                        label={useLang == 'en' ? "" : "รหัสผ่าน"}
                        sublabel=""
                      />
                    </div>
                  </div>
                  <hr />
                  <div className=" row">
                    <div className="col-lg-12 d-flex flex-row-reverse">
                      <div><a className="text-primary">ข้อมูลส่วนตัว</a></div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="idcard"
                        component={Input}
                        placeholder={useLang == 'en' ? "" : "หมายเลขบัตรประจำตัวประชาชน"}
                        label={useLang == 'en' ? "" : "หมายเลขบัตร"}
                        sublabel=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="birthdate"
                        type="date"
                        component={Input}
                        placeholder="ด/ว/ป"
                        label={useLang == 'en' ? "" : "วันเดือนปีเกิด"}
                        sublabel=""
                      />
                    </div>

                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="remark"
                        component={Textarea}
                        placeholder={useLang == 'en' ? "" : "ข้อมูลเพิ่มเติม"}
                        label={useLang == 'en' ? "" : "ข้อมูลเพิ่มเติม"}
                        sublabel=""
                      />
                    </div>
                  </div>
                </Card>

              </Form>
            </Modal.Body>
            <Modal.Footer className=" col-12  pl-3 pr-3" >
              <Card style={{ width: '100%' }} className="p-3">
                <div className="d-flex" style={{ width: '100%' }}>
                  <div
                    className="mr-auto "
                  >
                    <Switch onChange={(e) => handleChange(e, 'active',setFieldValue)} checked={state.active} />
                  </div>
                  <div className="ml-auto" >
                    <button
                      type="button"
                      onClick={onHide}
                      className="btn btn-light btn-elevate"
                    >
                      {useLang == 'en' ? 'Cancel' : 'ยกเลิก'}
                    </button>
                    <> </>
                    <button
                      type="submit"
                      onClick={() => handleSubmit()}
                      className="btn btn-primary btn-elevate"
                    >
                      {useLang == 'en' ? 'Save' : 'บันทึก'}
                    </button>
                  </div>
                </div>
              </Card>

            </Modal.Footer>
          </div>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}
