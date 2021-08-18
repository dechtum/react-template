// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React,{useMemo} from "react";
import { Card, Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { SaleProductEditDialogHeader } from "./SaleProductEditDialogHeader";
import { useLang, setLanguage } from "./../../../../../../_metronic/i18n";
import { useSaleProductsUIContext } from "../SaleProductsUIContext";
import {Mat} from './mat'
import {AddOn} from './addOn'


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
const SaleProductEditSchema = Yup.object().shape({
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

export function SaleProductEditForm({
  saveSaleProduct,
  SaleProduct,
  actionsLoading,
  onHide,
  id,
}) {
   // SaleProducts UI Context
   const SaleProductsUIContext = useSaleProductsUIContext();
   const SaleProductsUIProps = useMemo(() => {
     return {
       ids: SaleProductsUIContext.ids,
       setIds: SaleProductsUIContext.setIds,
       queryParams: SaleProductsUIContext.queryParams,
       setQueryParams: SaleProductsUIContext.setQueryParams,
       openEditSaleProductDialog: SaleProductsUIContext.openEditSaleProductDialog,
       openUnitSaleProductDialog: SaleProductsUIContext.openUnitSaleProductDialog,
     };
   }, [SaleProductsUIContext]);
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
        SaleProductsUIProps.openEditSaleProductDialog(e.target.name);
        break;
      case 'unit':
        SaleProductsUIProps.openUnitSaleProductDialog(e.target.name)
        break;
      default:
        break;
    }
  }
  let Detail = [
    {
        'id': 1, 'title': 'ร้อน', 'items': [
            { 'id': 1, 'name': '1', 'number': '20', 'unit': 'ชิ้น' },
            { 'id': 2, 'name': '1', 'number': '20', 'unit': 'ใบ' },
            { 'id': 3, 'name': '1', 'number': '20', 'unit': 'กรัม' },
        ]
    },
    {
        'id': 2, 'title': 'เย็น', 'items': [
            { 'id': 1, 'name': '1', 'number': '20', 'unit': '3' },
            { 'id': 2, 'name': '1', 'number': '20', 'unit': '3' },
            { 'id': 3, 'name': '1', 'number': '20', 'unit': '3' },
        ]
    },
    {
        'id': 3, 'title': 'ปั่น', 'items': [
            { 'id': 1, 'name': '1', 'number': '20', 'unit': '3' },
            { 'id': 2, 'name': '1', 'number': '20', 'unit': '3' },
            { 'id': 3, 'name': '1', 'number': '20', 'unit': '3' },
        ]
    },
]
let Detail1 = [
  {
      'id': 1, 'title': 'หยานน้อย', 'items': [
          { 'id': 1, 'name': '1', 'number': '50', 'unit': '' },
          { 'id': 2, 'name': '1', 'number': '50', 'unit': '' },
          { 'id': 3, 'name': '1', 'number': '50', 'unit': '' },
      ]
  },
  {
      'id': 2, 'title': 'หวานปกติ', 'items': [
          { 'id': 1, 'name': '1', 'number': '100', 'unit': '' },
          { 'id': 2, 'name': '1', 'number': '100', 'unit': '' },
          { 'id': 3, 'name': '1', 'number': '100', 'unit': '' },
      ]
  },
  {
      'id': 3, 'title': 'หวานมาก', 'items': [
          { 'id': 1, 'name': '1', 'number': '150', 'unit': '' },
          { 'id': 2, 'name': '1', 'number': '150', 'unit': '' },
          { 'id': 3, 'name': '1', 'number': '150', 'unit': '' },
      ]
  }
]
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={SaleProduct}
        validationSchema={SaleProductEditSchema}
        onSubmit={(values) => {
          saveSaleProduct(values);
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
                <Card className="col-md-4 pt-3 pb-3" style={{ height: "43vh" }}>   
                  <Field
                        name="pic"
                        component={Upload}
                        tempfile={setTempfiel}
                      />  
                </Card>
                <Card className="col-md-8" aria-labelledby="example-modal-sizes-title-lg">
                  <SaleProductEditDialogHeader id={id} onHide={onHide} />
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-6">
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="ตั้งชื่อสินค้าที่ต้องการ  (Auto Complete)"
                        label="ชื่อสินค้า"
                      />
                    </div>  
                    <div className="col-lg-6">
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="ราคาขาย"
                        label="ราคา"
                      />
                    </div>                   
                  </div>    
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-6">
                    <SITMore name="group"  label={lang=='en'?'more':'เพิ่มเติม'} onClick={handleClick}/> 
                      <Field
                        name="firstName"
                        component={Select}
                        placeholder="เลือกกลุ่มสินค้า"
                        label="กลุ่ม"
                        sublabel="กลุ่มสินค้า"
                      />
                    </div>  
                    <div className="col-lg-6">
                    <SITMore name="unit"  label={lang=='en'?'more':'เพิ่มเติม'} onClick={handleClick}/> 
                      <Field
                        name="firstName"
                        component={Select}
                        placeholder="เลือกหน่วยนับ"
                        label="หน่วย"
                        sublabel="หน่วยนับสินค้า"
                      />
                    </div> 
                    <div className="col-lg-12">
                      <Field
                        name="firstName"
                        component={Textarea}
                        placeholder="รายละเอียด"
                        label="รายละเอียด"
                        sublabel=""
                      />
                    </div>                  
                  </div>   
                         
                </Card>
               
                <div  className="col-md-12 mt-1 card">
                  <Card.Header>
                   <h3>วัตถุดิบ</h3>
                  </Card.Header>
                  <div className="row">
                    <Mat Detail={JSON.stringify(Detail)}/>
                  </div> 
                </div>
                <div  className="col-md-12 mt-1 card">
                  <Card.Header>
                  <h3>เพิ่ม-ลด ส่วนผสม</h3>
                  </Card.Header>
                  <div className="row">
                    <AddOn Detail={JSON.stringify(Detail1)}/>
                  </div> 
                </div>
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
