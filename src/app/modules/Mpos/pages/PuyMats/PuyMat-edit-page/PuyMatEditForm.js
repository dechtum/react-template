// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React ,{ useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PuyMatEditDialogHeader } from "./PuyMatEditDialogHeader";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import { usePuyMatsUIContext } from "./../PuyMatsUIContext";


import {
  Input,
  Select,
  Switch,
  Upload,
  SITMore,
  DatePickerField,
  Scaner,
  Textarea,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const PuyMatEditSchema = Yup.object().shape({
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

export function PuyMatEditForm({
  savePuyMat,
  PuyMat,
  actionsLoading,
  onHide,
  id,
}) {
  const usePuyMatsUIContexts = usePuyMatsUIContext();
  const usePuyMatsUIProps = useMemo(() => {
    return {
      ids: usePuyMatsUIContexts.ids,
      openGroupDialog: usePuyMatsUIContexts.openGroupDialog,
      openUnitDialog: usePuyMatsUIContexts.openUnitDialog,
      openScanDialog: usePuyMatsUIContexts.openScanDialog,
    };
  }, [usePuyMatsUIContexts]);
  const [tempfile,setTempfiel] = React.useState('');
  const [lang,setLang] = React.useState(useLang());
  const [state, setState] = React.useState({
    active: false
  })
  const handleChange = (e, name) => {
    console.log(e.target.checked);
    setState({ ...state, [name]: e.target.checked });
  }
  function handleClick(e){
    console.log(e.target.name);
    switch (e.target.name) {
      case 'group':
        usePuyMatsUIProps.openGroupDialog(e.target.name);
        break;
      case 'unit':
        usePuyMatsUIProps.openUnitDialog(e.target.name);
        break;
      case 'scaner':
        usePuyMatsUIProps.openScanDialog(e.target.name);
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={PuyMat}
        validationSchema={PuyMatEditSchema}
        onSubmit={(values) => {
          savePuyMat(values);
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
                        name="pic"
                        component={Upload}
                        tempfile={setTempfiel}
                      />  
                </Card>
                <Card className="col-md-8" aria-labelledby="example-modal-sizes-title-lg">
                  <PuyMatEditDialogHeader id={id} onHide={onHide} />
                  <div  className=" row pt-3">
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-end">
                            <div className="form-group">
                              <div className="text-right">
                                <a className="text-primary" >ค้นหาจากรหัสสินค้า</a>
                              </div>
                            </div>
                            <>  </>
                            <div className="form-group">
                              <div className="text-right">
                                <a className="text-primary" name="scaner" onClick={handleClick}>แสกนคิวอาร์โค้ด</a>
                              </div>
                              <div className="text-right"><small>กรณีสังจากมิสเตอร์คอฟฟี</small></div>                              
                            </div>             
                        </div>                                  
                      </div>   
                  </div>
                  <div className=" row">                    
                    <div className="col-lg-6">                     
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="รหัสสินค้า"
                        label="รหัสสินค้า"
                        sublabel=""
                      />
                     
                      
                    </div>
                    {/* Login */}
                    <div className="col-lg-6">
                    <SITMore name="group"  label={lang=='en'?'more':'เพิ่มเติม'} onClick={handleClick}/> 
                      <Field
                        name="userName"
                        component={Select}
                        placeholder="กลุ่มสินค้า"
                        label="กลุ่มสินค้า"
                        sublabel="เลือกกลุ่มสินค้า"
                      />
                    </div>
                  </div>
                  <div className=" row">                    
                    <div className="col-lg-6">
                          
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="กรอกชือสินค้า"
                        label="วัตถุดิบ"
                        sublabel=""
                      />                     
                      
                    </div>
                    {/* Login */}
                    <div className="col-lg-6">
                      <SITMore name="unit"  label={lang=='en'?'more':'เพิ่มเติม'} onClick={handleClick}/>  
                      <Field
                        name="userName"
                        component={Select}
                        placeholder="หน่วย"
                        label="หน่วย"
                        sublabel="เลือกหน่วย"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                    <Field
                          name="lastName"
                          component={Textarea}
                          placeholder="รายละเอียด"
                          label="รายละเอียด"
                          sublabel=""
                        />
                    </div>
                  </div>
                </Card>
              </Form>
            </Modal.Body>
            <Modal.Footer className=" col-12  pl-3 pr-3" >
              <Card style={{width:'100%'}} className="p-3">
              <div className="d-flex" style={{width:'100%'}}>
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
                   {lang=='en'?'Cancel':'ยกเลิก'} 
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
                    {lang=='en'?'Save':'บันทึก'} 
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
