// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React ,{ useMemo } from "react";
import { Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ShopsCreEmpEditDialogHeader } from "./ShopsCreEmpEditDialogHeader";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import { useShopsCreEmpsUIContext } from "./../ShopsCreEmpsUIContext";


import {
  Input,
  Select,
  Switch,
  Upload,
  SITMore,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ShopsCreEmpEditSchema = Yup.object().shape({
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

export function ShopsCreEmpEditForm({
  saveShopsCreEmp,
  ShopsCreEmp,
  actionsLoading,
  onHide,
  id,
}) {
  const [tempfile,setTempfiel] = React.useState('');
  const [lang,setLang] = React.useState(useLang());
  const [state, setState] = React.useState({
    active: false
  })
  const ShopsCreEmpsUIContext = useShopsCreEmpsUIContext();
  const ShopsCreEmpsUIProps = useMemo(() => {
    return {
      ids: ShopsCreEmpsUIContext.ids,
      newTitleEmpButtonClick: ShopsCreEmpsUIContext.newTitleEmpButtonClick,
      newPositionEmpButtonClick: ShopsCreEmpsUIContext.newPositionEmpButtonClick,
    };
  }, [ShopsCreEmpsUIContext]);
  const handleChange = (e, name) => {
    console.log(e.target.checked);
    setState({ ...state, [name]: e.target.checked });
  }

  function handleClick(e){
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
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ShopsCreEmp}
        validationSchema={ShopsCreEmpEditSchema}
        onSubmit={(values) => {
          saveShopsCreEmp(values);
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
                <> </>
                <Card className="col-md-8" aria-labelledby="example-modal-sizes-title-lg">
                  <ShopsCreEmpEditDialogHeader id={id} onHide={onHide} />
                  <div className="form-group row pt-5">
                    {/* First Name */}
                    <div className="col-lg-6">
                     <SITMore name="emtitle"  label={lang=='en'?'more':'เพิ่มเติม'} onClick={handleClick}/>                 
                      <Field
                        name="firstName"
                        component={Select}
                        placeholder="คำนำหน้าชื่อ"
                        label="คำนำหน้า"
                        sublabel="เลือกคำนำหน้าชื่อ"
                      />
                    </div>
                    
                  </div>
                  <div className="form-group row">                    
                    <div className="col-lg-6">
                          
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="ชื่อ"
                        label="ชื่อ"
                        sublabel="ความยาวไม่เกิน 200 ตัวอักษร"
                      />
                     
                      
                    </div>
                    {/* Login */}
                    <div className="col-lg-6">
                      <Field
                        name="userName"
                        component={Input}
                        placeholder="นามสกุล"
                        label="นามสกุล"
                        sublabel="ความยาวไม่เกิน 200 ตัวอักษร"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                    <SITMore name="empos"  label={lang=='en'?'more':'เพิ่มเติม'} onClick={handleClick}/>        
                      <Field
                        name="firstName"
                        component={Select}
                        placeholder="ตำแหน่ง"
                        label="ตำแหน่ง"
                        sublabel="เลือกคำนำหน้าชื่อ"
                      />
                    </div>
                    
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="ลักษณะงาน"
                        label=""
                      />
                    </div>                    
                  </div>
                  <div className="form-group row ">
                    <div className="col-lg-12">
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="ที่อยู่"
                        label="ความยาวไม่เกิน 200 ตัวอักษร"
                      />
                    </div>                    
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Input}
                        placeholder="โทรศัพท์"
                        label="โทรศัพท์"
                        customFeedbackLabel="หมายเลขโทรศัพท์"
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Select}
                        placeholder="สังกัด"
                        label="สังกัด"
                        customFeedbackLabel="พนักงานประจำร้าน"
                      />
                    </div>
                  </div>
                  <div className="form-group row ">
                    
                    {/* Login */}
                    <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Input}
                        placeholder="รหัสไปรษณีย์"
                        label="รหัสไปรษณีย์"
                        sublabel=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Select}
                        placeholder="จังหวัด"
                        label="จังหวัด"
                        sublabel=""
                      />
                    </div>                   
                    
                  </div>
                 
                  <div className="form-group row ">
                    <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Select}
                        placeholder="อำเภอ"
                        label="อำเภอ"
                        sublabel=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Select}
                        placeholder="ตำบล"
                        label="ตำบล"
                        customFeedbackLabel=""
                      />
                    </div>
                  </div>
                  <hr/>
                  <div className="form-group row">
                   {/* Login */}
                   <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Input}
                        placeholder="ชื่อผู้ใช้"
                        label="ชื่อผู้ใช้"
                        sublabel=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <Field
                        name="ipAddress"
                        component={Input}
                        type="password"
                        placeholder="รหัสผ่าน"
                        label="รหัสผ่าน"
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
