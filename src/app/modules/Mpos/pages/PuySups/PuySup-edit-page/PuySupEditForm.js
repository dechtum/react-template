// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import { PuySupEditDialogHeader } from "./PuySupEditDialogHeader";


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
const PuySupEditSchema = Yup.object().shape({
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

export function PuySupEditForm({
  savePuySup,
  PuySup,
  actionsLoading,
  onHide,
  id,
}) {
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
        break;
      case 'unit':
        break;
      case 'scaner':
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={PuySup}
        validationSchema={PuySupEditSchema}
        onSubmit={(values) => {
          savePuySup(values);
        }}
      >
        {({ handleSubmit }) => (
          <div className="contraner row" >
            <Modal.Body className="overlay overlay-block cursor-default pt-0">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right d-flex row ">                
                <Card className="col-md-12 " aria-labelledby="example-modal-sizes-title-lg">
                  <PuySupEditDialogHeader id={id} onHide={onHide} />
                  <div className="form-group row pt-3">
                    {/* First Name */}
                    <div className="col-lg-4">
                      <SITMore name="titlecom"  label={lang=='en'?'more':'???????????????????????????'} onClick={handleClick}/> 
                      <Field
                        name="firstName"
                        component={Select}
                        placeholder="?????????????????????"
                        label="?????????????????????"
                        sublabel="??????????????? ????????????????????????/???????????????????????????  ???????????? ?????????????????????????????????"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="col-lg-8">
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="????????????????????????????????????????????????"
                        label="????????????????????????????????????????????????"
                        sublabel="??????????????????/?????????????????????/??????????????????????????????"
                      />
                    </div>                   
                  </div>
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-6">                      
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="???????????????????????????????????????????????????"
                        label="???????????????????????????????????????????????????"
                        sublabel="?????????????????????????????????????????????????????????????????????????????????????????????"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="col-lg-6">
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="????????????????????????/????????????"
                        label="????????????????????????????????????  ???????????? 0000-1000"
                        sublabel=""
                      />
                    </div>                   
                  </div>
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-12">                      
                      <Field
                        name="firstName"
                        component={Textarea}
                        placeholder=""
                        label="?????????????????????"
                        sublabel=""
                      />
                    </div>                                 
                  </div>
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-12">                      
                      <Field
                        name="firstName"
                        component={Textarea}
                        placeholder=""
                        label="????????????????????????"
                        sublabel=""
                      />
                    </div>                                 
                  </div>
                </Card>
                <div className="d-flex flex-column-fluid" style={{ height: "10px", width: "100%", background: '#EEF0F8' }}></div>
               
                <Card className="col-md-12" aria-labelledby="example-modal-sizes-title-lg">
                  <Modal.Header>
                      <Modal.Title>?????????????????????????????????????????????</Modal.Title>
                  </Modal.Header>
                  <div className="form-group row pt-3">
                    {/* First Name */}
                    <div className="col-lg-4">    
                      <SITMore name="titlename"  label={lang=='en'?'more':'???????????????????????????'} onClick={handleClick}/>                   
                      <Field
                        name="firstName"
                        component={Select}
                        placeholder="????????????????????????"
                        label="????????????????????????"
                        sublabel="??????????????? ????????????????????????"
                      />
                    </div>    
                    <div className="col-lg-8">                      
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="???????????????????????????????????????"
                        label="???????????????????????????"
                        sublabel=""
                      />
                    </div>  
                                                  
                  </div>
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-6">                      
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="?????????"
                        label="?????????"
                        sublabel=""
                      />
                    </div>    
                    <div className="col-lg-6">                      
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="?????????????????????"
                        label="?????????????????????"
                        sublabel=""
                      />
                    </div>    
                                                 
                  </div>
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-12">                      
                      <Field
                        name="firstName"
                        component={Textarea}
                        placeholder=""
                        label="????????????????????????"
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
                   {lang=='en'?'Cancel':'??????????????????'} 
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
                    {lang=='en'?'Save':'??????????????????'} 
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
