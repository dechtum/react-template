// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Button, Card, Jumbotron, Modal, ProgressBar, InputGroup, FormControl, Image, Spinner } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ShopsCreshopEditDialogHeader } from "./ShopsCreshopEditDialogHeader";
import ProviceTableMock from './../../../__mocks__/ShopsCreshops/ProviceTableMock'
import AmphuresTableMock from './../../../__mocks__/ShopsCreshops/AmphuresTableMock'
import DistrictsTableMock from '../../../__mocks__/ShopsCreshops/DistrictsTableMock'
import * as actions from "../../../_redux/ShopsCreshops/ShopsCreshopsActions";
import { handleChanges } from './handle'
import { store } from './../Store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  Input,
  Select,
  Switch,
  Upload,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ShopsCreshopEditSchema = Yup.object().shape({
  nameth: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(200, "Maximum 50 symbols")
    .required("กรุณากรอกชื่อร้าน"),
  address: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(200, "Maximum 50 symbols")
    .required("กรุณากรอกที่อยู่"),
  zipcode_id: Yup.string()
    .min(5, "Minimum 5 symbols")
    .max(10, "Maximum 5 symbols")
    .required("กรุณากรอกรหัสไปรษณีย์"),
});

export function ShopsCreshopEditForm({
  saveShopsCreshop,
  ShopsCreshop,
  actionsLoading,
  onHide,
  id,
  useLang,
  auth
}) {
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
    active: true
  })
  const [tempfile, setTempfiel] = React.useState('');
  const [pictureContent, setPictureContent] = React.useState('');
  const [onsave, setOnsave] = React.useState(false);
  // const dispatch = useDispatch();

  const handleChange = (e, name) => {
    switch (name) {
      case 'district_id_setID':
        setState({ ...state, [name]: e.target.value });
        break;
      default:
        setState({ ...state, [name]: e.target.checked });
        break;
    }
  }

  React.useEffect(() => {
    setState({
      ...state,
      active: ShopsCreshop.status,
      zipcode_id: ShopsCreshop.zipcode_id,
      district_id_setID: ShopsCreshop.district_id,
      ampher_id_setID: ShopsCreshop.ampher_id,
      province_id_setID: ShopsCreshop.province_id,
    });
    setTempfiel(ShopsCreshop.picture)
    setPictureContent(ShopsCreshop.pictureContent)
  }, [ShopsCreshop])

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

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ShopsCreshop}
        //  validationSchema={ShopsCreshopEditSchema}
        onSubmit={(values) => {
          setOnsave(true)
          const newDate = {
            ...values,
            picture: tempfile,
            pictureContent: pictureContent,
            zipcode_id: state.zipcode_id,
            district_id: state.district_id_setID,
            ampher_id: (state.ampher_id == '' ? values.ampher_id : JSON.parse(state.ampher_id)[0].AMPHUR_ID),
            province_id: (state.province_id == '' ? values.province_id : JSON.parse(state.province_id)[0].PROVINCE_ID),
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

          saveShopsCreshop(newDate, setOnsave);

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
              <Form className="form form-label-right d-flex row">
                <Card className="col-md-4 pt-3 pb-3" style={{ height: "38vh" }}>
                  <Field
                    name="pictures"
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
                <Card className="col-md-8" aria-labelledby="example-modal-sizes-title-lg ">
                  <ShopsCreshopEditDialogHeader id={id} onHide={onHide} />
                  <div className="form-group row mt-5">
                    {/* First Name */}
                    <div className="col-lg-6">
                      <Field
                        type="text"
                        name="nameth"
                        component={Input}
                        placeholder={useLang=='en'?"Name your store":"ตั้งชื่อร้านค้าของคุณ"}
                        label={useLang=='en'?"Shop name":"ชื่อร้าน"}
                        sublabel={useLang=='en'?"Up to 200 characters in length":"ความยาวไม่เกิน 200 ตัวอักษร"}
                      />
                    </div>
                    {/* Last Name */}
                    <div className="col-lg-6">
                      <Field
                        type="text"
                        name="tex"
                        component={Input}
                        placeholder={useLang=='en'?"Tax Identification Number (if any)":"เลขประจำตัวผู้เสียภาษี (ถ้ามี)"}
                        label={useLang=='en'?"Taxpayer number":"เลขที่ผู้เสียภาษี"}
                        sublabel={useLang=='en'?"The number issued by the Department of Business Development":"หมายเลขที่กรมพัฒนาธุรกิจออกให้"}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="form-group row ">
                    <div className="col-lg-12">
                      <Field
                        type="text"
                        name="address"
                        component={Input}
                        placeholder={useLang=='en'?"House number, alley, village":"บ้านเลขที่ ซอย หมู่บ้าน"}
                        label={useLang=='en'?"Address":"ที่อยู่"}
                        sublabel={useLang=='en'?"Up to 200 characters in length":"ความยาวไม่เกิน 200 ตัวอักษร"}
                      />
                    </div>
                  </div>
                  <div className="form-group row ">

                    {/* Login */}
                    <div className="col-lg-6">
                      <Field
                        type="number"
                        name="zipcode_id"
                        component={Input}
                        placeholder={useLang=='en'?"ZIP code":"รหัสไปรษณีย์"}
                        label={useLang=='en'?"ZIP code":"รหัสไปรษณีย์"}
                        value={state.zipcode_id}
                        onChange={(e) => handleChanges(e, state, setState)}
                        sublabel=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="province_id"
                        component={Select}
                        placeholder={useLang=='en'?"Province":"จังหวัด"}
                        label={useLang=='en'?"Province":"จังหวัด"}
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
                        placeholder={useLang=='en'?"Aumpher":"อำเภอ"}
                        label={useLang=='en'?"Aumpher":"อำเภอ"}
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
                        onChange={(e) => handleChange(e, 'district_id_setID')}
                        value={state.district_id_setID}
                        placeholder={useLang=='en'?"District":"ตำบล"}
                        label={useLang=='en'?"District":"ตำบล"}
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
                        name="tel"
                        type="text"
                        component={Input}
                        placeholder={useLang=='en'?"Phone":"โทรศัพท์"}
                        label={useLang=='en'?"Phone":"โทรศัพท์"}
                        customFeedbackLabel={useLang=='en'?"Phone number":"หมายเลขโทรศัพท์"}
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
                    <Switch onChange={(e) => handleChange(e, 'active')} lng={useLang} checked={state.active} />
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
                      disabled={onsave}
                      type="submit"
                      onClick={() => handleSubmit()}
                      className="btn btn-primary btn-elevate"
                    >
                      <div className="d-flex">
                        <div className="ml-auto mr-2" style={{ display: onsave ? 'block' : 'none' }}>
                          <Spinner                            
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          {useLang == 'en' ? 'Save' : 'บันทึก'}
                        </div>
                      </div>
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
