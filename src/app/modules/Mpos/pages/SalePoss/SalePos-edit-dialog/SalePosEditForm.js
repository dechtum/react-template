// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
  AntSwitchs
} from "../../../../../../_metronic/_partials/controls";
import {Addon} from './addon'
import {Itemnumber} from './itemnumber'
import {Listitemproduct} from './listitemproduct'
import {Listitemtype} from './listitemtype'
import {Sweetness} from './sweetness'

// Validation schema
const SalePosEditSchema = Yup.object().shape({
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

export function SalePosEditForm({
  saveSalePos,
  SalePos,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={SalePos}
        validationSchema={SalePosEditSchema}
        onSubmit={(values) => {
          saveSalePos(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">                 
                  <div className="col-lg-12">
                    <div className="ml-auto">
                      <div>รายการสิ้นค้า</div>
                      <div><small>รายการที่กำหนดไว้ใน หมวดขาย - รายการสินค้า</small></div>
                    </div>
                    <Listitemproduct/>
                  </div>                  
                </div>
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    <div className="ml-auto">
                      <div>รูปแบบ</div>
                      <div><small>รายการที่กำหนดไว้ใน หมวดขาย - รูปแบบ</small></div>
                    </div>
                    <Listitemtype/>
                  </div>                  
                </div>
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    <div className="ml-auto">
                      <div>จำนวน</div>
                      <div><small>.</small></div>
                    </div>
                    <Itemnumber/>
                  </div>                  
                </div>
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    <div className="ml-auto">
                      <div>เพิ่ม</div>
                      <div><small>ความหวาน</small></div>
                    </div>
                    <Sweetness />
                  </div>
                </div>
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-12">
                    <div className="ml-auto">
                      <div><small></small></div>
                    </div>
                    <Addon />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
