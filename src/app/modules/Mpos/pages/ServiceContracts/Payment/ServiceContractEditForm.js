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
} from "../../../../../../_metronic/_partials/controls";
import { Banks } from './banks'
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
            <Form className="form "  style={{height:'28vh'}}>
              <div className="row">
                <div className="col-4">
                  <Image src="/media/svg/icons/Tools/Compass.svg" alt="" thumbnail style={{ width: '100%', height: '10em'}} />
                </div>
                <div className="col-7">
                  <div className="row">
                  <h5>โอนเงินผ่าน </h5>&nbsp;<h5>ธ.กสิกรไทย</h5>                    
                  </div>
                  <div className="row">
                  <h5>ชื่อบัญชี </h5>&nbsp;<h5>บริษัทซอฟต์ บ้านๆๆ</h5>                      
                  </div>
                  <div className="row">
                    <h5>เลขที่บัญช๊ 1-1111-11-1111</h5>                    
                  </div>
                </div>
              </div>
              <div className="form-group row pt-6">
                <div className="col-12">
                  <h3>โอนครั้งต่อไปวันที่ 01-06-2022</h3>
                </div>
                <div className="col-12">
                  <h6 style={{color:'red'}}>แจ้งการโอนเงิน 02-200-0000</h6>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
