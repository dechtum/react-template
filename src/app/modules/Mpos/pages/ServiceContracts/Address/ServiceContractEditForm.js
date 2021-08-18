// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal, Image } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  SITImage,
  Textarea,
} from "../../../../../../_metronic/_partials/controls";
import './css.css'
import ContentEditAble from './ContentEditAble'
// Validation schema
const ServiceContractEditSchema = Yup.object().shape({
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

export function ServiceContractEditForm({
  saveServiceContract,
  ServiceContract,
  actionsLoading,
  onHide,
}) {
  const [edit, setEdit] = React.useState(true)
  const [state, setState] = React.useState({
    texno: ''
  })
  function handleChange(e) {
    let val = e.target.value;
    let name = e.target.name
    console.log(name);
    switch (name) {
      case 'texno':
        setState({
          ...state,
          texno: val
        })
        break;
      case 'shop':
        setState({
          ...state,
          shop: val
        })
        break;
      case 'addr':
        setState({
          ...state,
          addr: val
        })
        break;

      default:
        break;
    }
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ServiceContract}
        validationSchema={ServiceContractEditSchema}
        onSubmit={(values) => {
          saveServiceContract(values);

        }}
      >
        {({ handleSubmit }) => (
          <>

            <Form className="form " >
              <span className="btn-edit">
                <a style={{ display: edit ? 'none' : 'block' }} className=" text-primary" onClick={() => setEdit(true)}>บันทึก</a>
                <a style={{ display: edit ? 'block' : 'none' }} className=" text-primary" onClick={() => setEdit(false)}>แก้ไข</a>
              </span>
              <div className="form-group row">
                <ContentEditAble
                  lable="เลขที่ผู้เสียภาษี"
                  handleChange={handleChange}
                  name="texno"
                  state={state}
                  edit={edit} />
              </div>
              <div className="form-group row">
                <ContentEditAble
                  lable="ร้าน"
                  handleChange={handleChange}
                  name="shop"
                  state={state}
                  edit={edit} />
              </div>
              <div className="form-group row">
                <ContentEditAble
                  lable="ที่อยู่"
                  handleChange={handleChange}
                  component={Textarea}
                  name="addr"
                  state={state}
                  edit={edit} />
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
